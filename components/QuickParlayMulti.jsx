'use client';
import { useEffect, useMemo, useState } from 'react';
import { useBetSlipAdder } from './BetSlip';

export default function QuickParlayMulti(){
  const [sports, setSports] = useState(null);
  const [legs, setLegs] = useState([]);
  const add = useBetSlipAdder();

  useEffect(()=>{
    fetch('/api/odds/sports', { cache:'no-store' })
      .then(r=>r.json().then(j=>({ok:r.ok,j})))
      .then(({ok,j})=>{ if(!ok) throw new Error(j?.error||'fetch failed'); setSports(j.sports||[]); })
      .catch(()=>{});
  },[]);

  async function addLegFromSport(key){
    const r = await fetch(`/api/odds/${encodeURIComponent(key)}`, { cache:'no-store' });
    const j = await r.json();
    const g = (j.events||[])[0];
    if (!g?.h2h?.outcomes?.length) return;
    const o = g.h2h.outcomes[0];
    const leg = { id: `${g.id}-h2h-0`, label: `${g.away_team} @ ${g.home_team} • ML`, price: o.price };
    setLegs(ls => ls.find(x=>x.id===leg.id) ? ls : [...ls, leg]);
  }

  function pushToSlip(){
    legs.forEach(add);
    setLegs([]);
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="font-semibold">Quick Parlay (Multi-sport)</div>
      <div className="text-xs text-white/60">Pick a sport to add one leg (moneyline) from the top event.</div>

      <div className="mt-3 flex flex-wrap gap-2">
        {(sports||[]).slice(0,10).map(s=>(
          <button key={s.key} onClick={()=>addLegFromSport(s.key)}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sm">
            {s.title}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {legs.map(l=>(<span key={l.id} className="px-2 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs">{l.label}</span>))}
        {!legs.length && <div className="text-sm text-white/60">No legs yet.</div>}
      </div>

      <button onClick={pushToSlip} className="mt-3 w-full px-4 py-2 rounded-xl bg-cyan-500 text-black font-semibold">
        Add {legs.length||0} to Bet Slip
      </button>
    </div>
  );
}
