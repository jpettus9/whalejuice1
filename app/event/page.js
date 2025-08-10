'use client';
import { useEffect, useMemo, useState } from 'react';
import { Zap, Clock, Plus } from 'lucide-react';

function americanToDecimal(a){ const n=parseInt(String(a)); return n>0?1+n/100:1+100/Math.abs(n); }

export default function Event(){
  const [bankroll,setBankroll]=useState(10000);
  const [bets,setBets]=useState([]);
  const [tick,setTick]=useState(0);
  useEffect(()=>{const t=setInterval(()=>setTick(n=>n+1),3500);return()=>clearInterval(t);},[]);

  const markets = useMemo(()=>{
    const ml = [Math.round(Math.random()*200-100), Math.round(Math.random()*200-100)];
    const total = (44 + Math.random()*6-3).toFixed(1);
    return {
      moneyline: [
        { id:'ml-h-'+tick, label:'TMC Moneyline', odds: ml[0] >= 0? `+${ml[0]}` : `${ml[0]}` },
        { id:'ml-a-'+tick, label:'TBY Moneyline', odds: ml[1] >= 0? `+${ml[1]}` : `${ml[1]}` },
      ],
      total: [
        { id:'tot-o-'+tick, label:`Over ${total}`, odds: '+110' },
        { id:'tot-u-'+tick, label:`Under ${total}`, odds: '-105' },
      ]
    };
  },[tick]);

  function add(sel){ setBets(b=> b.find(x=>x.id===sel.id)? b : [...b, {...sel, stake:25}] ); }
  function cash(i){ const b=bets[i]; const win = Math.random()>0.5; const payout = win? Math.round(b.stake*americanToDecimal(b.odds)):0; setBankroll(v=>v-b.stake+payout); setBets(s=>s.filter((_,idx)=>idx!==i)); }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-white/60">Football • Live</div>
          <div className="text-2xl font-black">Thunder Bay @ Tempest City</div>
        </div>
        <div className="text-sm"><span className="text-white/60">Bankroll:</span> <span className="font-semibold">${bankroll.toLocaleString()}</span></div>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between text-sm text-white/60"><span>Q3 06:24</span><span className="flex items-center gap-2"><Clock className="w-4 h-4"/>Prices refresh</span></div>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            {[...markets.moneyline, ...markets.total].map(it=>(
              <div key={it.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-sm">{it.label}</div>
                <button onClick={()=>add(it)} className="mt-2 w-full px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold">{it.odds}</button>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="font-semibold">Bet Slip</div>
          <div className="mt-3 space-y-3">
            {bets.map((b,i)=>(
              <div key={b.id} className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="text-sm font-semibold">{b.label}</div>
                <div className="text-xs text-white/60">Odds {b.odds}</div>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={()=>cash(i)} className="flex-1 px-3 py-2 rounded-lg bg-cyan-500 text-black font-semibold flex items-center justify-center gap-2"><Zap className="w-4 h-4"/> Cash Out</button>
                </div>
              </div>
            ))}
            {!bets.length && <div className="text-sm text-white/60">Tap a price to add to slip.</div>}
          </div>
        </div>
      </div>
      <div className="mt-8 text-xs text-white/50">Demo only. No real money.</div>
    </div>
  );
}
