# WhaleJuice — Home Hub + Global Bet Slip Patch

This patch gives you a sportsbook-style home page and lets users add selections
to the bet slip from **Home**, **Sports**, or **Event** pages.

## Adds
- `app/page.js` — sportsbook hub (Hero, **Live Now** rail, **Popular Today**, demo **Featured Parlays**).
- `components/OddsTile.jsx` — compact odds card with **Add to Slip**.
- `components/GlobalSlip.jsx` — floating **Bet Slip** button (mobile drawer) + desktop sidebar.
- `styles/no-scrollbar.css` — optional utility for smooth rails.

## Notes
- Home calls `/api/odds/sports` then fetches a handful of sport keys to populate sections.
- Uses existing `/api/odds/[sport]` endpoints; respects your live odds & caching.
- Requires your prior patches (Odds API + Dynamic Sports) to be present.

Generated 2025-08-11T04:06:50.957401Z
