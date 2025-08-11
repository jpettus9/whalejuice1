export const revalidate = 300; // cache 5m
const HOST = "https://api.the-odds-api.com";
const API_KEY = process.env.ODDS_API_KEY;

export async function GET() {
  if (!API_KEY) return Response.json({ error: "Missing ODDS_API_KEY" }, { status: 500 });
  const url = new URL("/v4/sports", HOST);
  url.searchParams.set("all", "true");
  url.searchParams.set("apiKey", API_KEY);

  const r = await fetch(url.toString(), { next: { revalidate: 300 } });
  if (!r.ok) return Response.json({ error: "Upstream error" }, { status: 502 });
  const list = await r.json();
  return Response.json({ sports: (list || []).filter(s => s.active) });
}
