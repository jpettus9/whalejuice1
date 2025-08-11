'use client';
import { useEffect, useState } from 'react';
import OddsGameRow from '../../../components/OddsGameRow';
import OddsFormatToggle from '../../../components/OddsFormatToggle';
import BookFilter from '../../../components/BookFilter';
import BetSlip from '../../../components/BetSlip';
import SportsbookProvider from '../../../components/SportsbookProvider';

export default function League(){
  return (
    <SportsbookProvider>
      <LeagueInner />
    </SportsbookProvider>
  );
}

function LeagueInner(){
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const run = async () => {
      try {
        const r = await fetch('/api/odds/nba', { cache: 'no-store' });
        const json = await r.json();
        if (!r.ok) throw new Error(json?.error || 'fetch failed');
        setRows(json.events);
        const setB = new Set();
        json.events?.forEach(g => (g.books||[]).forEach(b => setB.add(b)));
        setBooks([...setB]);
      } catch (e) { setErr(String(e)); }
    };
    run();
  }, []);

  if (err) return <div className="p-6 text-sm text-red-400">Error: {err}</div>;
  if (!rows) return <div className="p-6 text-sm text-white/60">Loading live prices…</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-3xl font-extrabold">Basketball (Live & Upcoming)</h1>
        <div className="flex items-center gap-3">
          <BookFilter books={books} />
          <OddsFormatToggle />
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid gap-3">
          {rows.map((g) => <OddsGameRow key={g.id} g={g} />)}
        </div>
        <div><BetSlip /></div>
      </div>
    </div>
  );
}
