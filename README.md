# WhaleJuice — Promotions + Search + Quick Parlay Patch

This patch adds three "big-league" homepage features and global add-to-slip flows:

- **Promotions/Boosts** grid (demo via `/api/promos`)
- **Global Search** overlay: search teams/markets across sports, add results to slip
- **Quick Parlay (Multi-sport)** builder: pick a sport → grabs top event ML as a leg → push to slip

## Files
- `app/api/promos/route.js`
- `app/api/search/route.js`
- `components/Promotions.jsx`
- `components/GlobalSearch.jsx`
- `components/QuickParlayMulti.jsx`
- `app/page.js` (updated to include new blocks)

## Install
1) Merge into your repo (same paths). Requires prior odds routes to be present.
2) Vercel env must include `ODDS_API_KEY`.
3) Deploy. Visit `/` to try search, boosts, and multi-sport parlay.

Generated 2025-08-11T04:10:52.215962Z
