'use client';
import { useEffect, useState } from 'react';
import SportsbookProvider from '../../../components/SportsbookProvider';
import OddsFormatToggle from '../../../components/OddsFormatToggle';
import BookFilter from '../../../components/BookFilter';
import BetSlip from '../../../components/BetSlip';
import OddsGameRow from '../../../components/OddsGameRow';

export default function AnyLeague({ params }){
  return (
    <SportsbookProvider>
      <LeagueInner sportKey={decodeURIComponent(params.sport)} />
    </SportsbookProvider>
  );
}

function LeagueInner({ sportKey }){
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`/api/odds/${encodeURIComponent(sportKey)}`, { cache: 'no-store' })
      .then(r => r.json().then(j => ({ ok: r.ok, j })))
      .then(({ ok, j }) => {
        if (!ok) throw new Error(j?.error||'fetch failed');
        setRows(j.events);
        const setB = new Set();
        j.events?.forEach(g => (g.books||[]).forEach(b => setB.add(b)));
        setBooks([...setB]);
      })
      .catch(e => setErr(String(e)));
  }, [sportKey]);

  if (err) return <div className="p-6 text-sm text-red-400">Error: {err}</div>;
  if (!rows) return <div className="p-6 text-sm text-white/60">Loading live prices…</div>;

  const title = sportKey.replace(/_/g,' ').toUpperCase();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h1 className="text-3xl font-extrabold">{title}</h1>
        <div className="flex items-center gap-3">
          <BookFilter books={books} />
          <OddsFormatToggle />
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid gap-3">
          {rows.map(g => <OddsGameRow key={g.id} g={g} />)}
        </div>
        <div><BetSlip /></div>
      </div>
    </div>
  );
}
