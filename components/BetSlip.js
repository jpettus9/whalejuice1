'use client';
import { useEffect, useMemo, useState } from 'react';
import { useSportsbook } from './SportsbookProvider';
import { toDecimal, formatOdds } from '../lib/odds';

export default function BetSlip(){
  const [selections, setSelections] = useState([]);
  const [stake, setStake] = useState(25);
  const { oddsFormat } = useSportsbook();

  useEffect(()=>{
    try {
      const raw = JSON.parse(localStorage.getItem('wj:slip')||'[]');
      setSelections(raw);
    } catch {}
  },[]);
  useEffect(()=>{
    try { localStorage.setItem('wj:slip', JSON.stringify(selections)); } catch {}
  },[selections]);

  function remove(id){ setSelections(list => list.filter(x=>x.id!==id)); }
  function clear(){ setSelections([]); }

  const multiplier = useMemo(()=> selections.reduce((acc, s)=>acc * (toDecimal(s.price)||1), 1), [selections]);
  const potential = Math.round(stake * multiplier);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Bet Slip</div>
        <button className="text-xs text-white/60" onClick={clear}>Clear</button>
      </div>

      <div className="mt-3 space-y-3">
        {selections.map(s => (
          <div key={s.id} className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="text-sm font-semibold">{s.label}</div>
            <div className="text-xs text-white/60">Odds {formatOdds(s.price, oddsFormat)}</div>
            <button className="mt-2 text-xs text-white/60 underline" onClick={()=>remove(s.id)}>Remove</button>
          </div>
        ))}
        {!selections.length && <div className="text-sm text-white/60">Tap a price to add to slip.</div>}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="text-white/60">Stake</div>
        <input type="number" value={stake} onChange={e=>setStake(Math.max(0, Number(e.target.value)||0))}
          className="w-24 bg-transparent border border-white/10 rounded-lg px-2 py-1.5 text-right" />
      </div>

      <div className="mt-2 flex items-center justify-between text-sm">
        <div className="text-white/60">Parlay Multiplier</div>
        <div className="font-semibold">x{multiplier.toFixed(2)}</div>
      </div>

      <div className="mt-2 flex items-center justify-between text-sm">
        <div className="text-white/60">Potential Payout</div>
        <div className="font-semibold">${potential.toLocaleString()}</div>
      </div>

      <button className="mt-4 w-full px-4 py-2 rounded-xl bg-cyan-500 text-black font-semibold">Place (demo)</button>
    </div>
  );
}

export function useBetSlipAdder(){
  const [_, setTick] = useState(0);
  function add(sel){
    const key = 'wj:slip';
    let list = [];
    try { list = JSON.parse(localStorage.getItem(key) || '[]'); } catch {}
    if (!list.find(x=>x.id===sel.id)){
      list.push(sel);
      localStorage.setItem(key, JSON.stringify(list));
      setTick(t=>t+1);
    }
  }
  return add;
}
