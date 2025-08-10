'use client';
import { useState } from 'react';
export default function QuickParlay(){
  const [legs,setLegs]=useState([]);
  const seeds=[
    { label:'Home ML', odds:-110 },
    { label:'Over 44.5', odds:+105 },
    { label:'QB 250+ yards', odds:+130 },
    { label:'RB Anytime TD', odds:+140 },
    { label:'WR 60+ yards', odds:+120 },
  ];
  function add(l){ if(!legs.find(x=>x.label===l.label)) setLegs([...legs,l]); }
  function remove(i){ setLegs(legs.filter((_,idx)=>idx!==i)); }
  function americanToDecimal(a){ const n=parseInt(String(a)); return n>0?1+n/100:1+100/Math.abs(n); }
  const decimal = legs.reduce((acc, l)=>acc*americanToDecimal(l.odds),1);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="font-semibold mb-2">Quick Parlay</div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {seeds.map((s,i)=>(
          <button key={i} onClick={()=>add(s)} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-between">
            <span>{s.label}</span><span className="font-semibold">{s.odds>0?`+${s.odds}`:s.odds}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 text-xs text-white/60">Tap to add legs. Tap a leg below to remove.</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {legs.map((l,i)=>(<button key={i} onClick={()=>remove(i)} className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs">{l.label}</button>))}
      </div>
      <div className="mt-3 text-sm"><span className="text-white/60">Parlay Price:</span> <span className="font-semibold">x{decimal.toFixed(2)}</span></div>
      <button className="mt-3 w-full px-4 py-2 rounded-xl bg-cyan-500 text-black font-semibold">Add to Slip</button>
    </div>
  );
}
