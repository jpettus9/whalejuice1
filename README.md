# WhaleJuice — Dynamic Sports + Outrights Patch

This patch makes your Sportsbook auto-discover **all active sports** from The Odds API,
adds **outrights/futures** markets (great for Golf), and provides dynamic routes.

## Added/Updated
- `app/api/odds/sports/route.js` — lists all sports (cached 5m)
- `app/api/odds/[sport]/route.js` — now includes `outrights` market
- `app/sports/page.js` — dynamic index that shows every active sport
- `app/sports/[sport]/page.js` — one page for ANY sport key
- `app/event/page.js` — shows an **Outrights** section when present

## Install
1) Merge these files into your repo (same paths).
2) Ensure `ODDS_API_KEY` is set in Vercel → Environment Variables.
3) Deploy. Visit `/sports` → choose any sport (e.g., golf key) → open a game → see outrights.

Generated 2025-08-11T04:02:20.426815Z
