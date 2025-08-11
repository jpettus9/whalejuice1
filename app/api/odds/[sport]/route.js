export const revalidate = 60; // cache 60s (ISR)

const HOST = "https://api.the-odds-api.com";
const API_KEY = process.env.ODDS_API_KEY;

// common slugs
const SPORT_KEYS = {
  nfl: "americanfootball_nfl",
  nba: "basketball_nba",
  mlb: "baseball_mlb",
  nhl: "icehockey_nhl",
};

function toImpliedProb(american) {
  const a = Number(american);
  if (Number.isNaN(a)) return null;
  return a > 0 ? (100 / (a + 100)) : (-a / (-a + 100));
}

function pickFirstMarket(bookmakers, key) {
  for (const bk of bookmakers || []) {
    const m = (bk.markets || []).find(m => m.key === key);
    if (m) return { book: bk.title, outcomes: m.outcomes };
  }
  return null;
}

function collectBooks(bookmakers) {
  const set = new Set();
  for (const bk of bookmakers || []) set.add(bk.title);
  return [...set];
}

export async function GET(req, { params }) {
  const league = (params.sport || "").toLowerCase();
  const sportKey = SPORT_KEYS[league] || league; // allow full keys

  if (!API_KEY) return Response.json({ error: "Missing ODDS_API_KEY" }, { status: 500 });
  if (!sportKey) return Response.json({ error: "Unknown sport" }, { status: 400 });

  const u = new URL(`/v4/sports/${sportKey}/odds`, HOST);
  u.searchParams.set("regions", "us");
  u.searchParams.set("markets", "h2h,spreads,totals,outrights");
  u.searchParams.set("oddsFormat", "american");
  u.searchParams.set("dateFormat", "iso");
  u.searchParams.set("apiKey", API_KEY);

  const r = await fetch(u.toString(), { next: { revalidate: 60 } });
  if (!r.ok) {
    const text = await r.text();
    return Response.json({ error: "Upstream error", detail: text }, { status: 502 });
  }
  const data = await r.json();

  const events = (data || []).map((game) => {
    const h2h = pickFirstMarket(game.bookmakers, "h2h");
    const spreads = pickFirstMarket(game.bookmakers, "spreads");
    const totals = pickFirstMarket(game.bookmakers, "totals");
    const outrights = pickFirstMarket(game.bookmakers, "outrights");
    return {
      id: game.id,
      sport: sportKey,
      commence_time: game.commence_time,
      home_team: game.home_team,
      away_team: game.away_team,
      books: collectBooks(game.bookmakers),
      bookmakers: game.bookmakers, // keep raw for client-side book filter
      h2h: h2h ? {
        book: h2h.book,
        outcomes: h2h.outcomes.map(o => ({ name: o.name, price: o.price, implied: toImpliedProb(o.price) }))
      } : null,
      spreads: spreads ? { book: spreads.book, outcomes: spreads.outcomes } : null,
      totals: totals ? { book: totals.book, outcomes: totals.outcomes } : null,
      outrights: outrights ? { book: outrights.book, outcomes: outrights.outcomes } : null,
    };
  });

  return Response.json({ sport: sportKey, events, ts: new Date().toISOString() });
}
