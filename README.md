# WhaleJuice — Sportsbook FULL (Odds API + Essentials + Event)

This single bundle wires **The Odds API** into the sportsbook (NFL/NBA/MLB/NHL),
adds full sportsbook UX (odds format toggle, book filter, bet slip, favorites),
and powers a **single-game Event page** with live Moneyline/Spread/Total.

## What you get
- `app/api/odds/[sport]/route.js` — odds fetcher (cached 60s)
- `lib/odds.js` — helpers + sport map
- `components/` — provider, format toggle, book filter, bet slip, game row
- `app/sports/*/page.js` — league pages wired to live odds
- `app/event/page.js` — single-game page (`/event?sport=<key|slug>&id=<eventId>`)
- `.env.example`

## Setup (Vercel)
1) In **Vercel → Project → Settings → Environment Variables** add:
   - `ODDS_API_KEY` = your key from The Odds API
2) Commit & redeploy via GitHub.

## Local dev
```bash
cp .env.example .env.local
# add your real ODDS_API_KEY to .env.local
npm run dev
```

## Usage
- Visit `/sports` → go to a league → click **All markets →** to view an event.
- League pages: pick a **Book** and toggle **odds format**.
- Add selections to the **Bet Slip** (parlay math included).

Generated on 2025-08-11T03:45:43.691469Z
