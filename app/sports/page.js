'use client';
import { useEffect, useState } from 'react';

export default function SportsIndex(){
  const [sports, setSports] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch('/api/odds/sports', { cache: 'no-store' })
      .then(r => r.json().then(j => ({ ok: r.ok, j })))
      .then(({ ok, j }) => { if (!ok) throw new Error(j?.error||'fetch failed'); setSports(j.sports); })
      .catch(e => setErr(String(e)));
  }, []);

  if (err) return <div className="p-6 text-sm text-red-400">Error: {err}</div>;
  if (!sports) return <div className="p-6 text-sm text-white/60">Loading sports…</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold">Sportsbook</h1>
      <p className="text-white/70 mt-2 text-sm">Powered by The Odds API. Showing all active sports.</p>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sports.map(s => (
          <a key={s.key} href={`/sports/${encodeURIComponent(s.key)}`}
             className="rounded-2xl border border-white/10 bg-white/5 p-5 block hover:-translate-y-1 transition">
            <div className="font-semibold">{s.title}</div>
            <div className="text-xs text-white/60">{s.group}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
