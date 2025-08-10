'use client';
import { useMemo } from 'react';

export default function StatSheet(){
  const stats = useMemo(()=> ({
    bets: 124,
    winRate: 0.47,
    avgOdds: +118,
    net: -132,
    bestSport: 'Basketball (+410)',
    worstSport: 'Baseball (-320)'
  }), []);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold">My Stat Sheet</h1>
      <p className="text-white/70 mt-2 text-sm">Personal performance dashboard to keep you informed.</p>
      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="text-sm text-white/60">Bets</div><div className="text-3xl font-black">{stats.bets}</div></div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="text-sm text-white/60">Win Rate</div><div className="text-3xl font-black">{Math.round(stats.winRate*100)}%</div></div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="text-sm text-white/60">Avg Odds</div><div className="text-3xl font-black">{stats.avgOdds>0?`+${stats.avgOdds}`:stats.avgOdds}</div></div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="text-sm text-white/60">Net</div><div className="text-3xl font-black ${stats.net>=0?'text-cyan-300':''}">${stats.net}</div></div>
      </div>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="text-sm text-white/60">Highlights</div>
        <div className="mt-2 text-sm">Best: {stats.bestSport}</div>
        <div className="text-sm">Needs Work: {stats.worstSport}</div>
      </div>
    </div>
  );
}
