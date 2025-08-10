'use client';
import Link from 'next/link';

export default function LeaguePage(){
  const games = [
    { id: 1, home: 'Home A', away: 'Away A', time: 'Today 7:00 PM', live: true },
    { id: 2, home: 'Home B', away: 'Away B', time: 'Today 9:30 PM', live: false },
    { id: 3, home: 'Home C', away: 'Away C', time: 'Tomorrow 8:00 PM', live: false },
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold">Baseball</h1>
      <div className="mt-6 grid gap-3">
        {games.map(g => (
          <div key={g.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">{g.away} @ {g.home}</div>
              <div className="text-xs text-white/60">{g.time}</div>
            </div>
            <div className="flex items-center gap-2">
              {g.live && <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded">LIVE</span>}
              <Link href="/event" className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm">Markets</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
