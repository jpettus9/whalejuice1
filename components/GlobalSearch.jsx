'use client';
import { useEffect, useMemo, useState } from 'react';
import { useBetSlipAdder } from './BetSlip';
import { useSportsbook } from './SportsbookProvider';

export default function GlobalSearch(){
  const [open,setOpen] = useState(false);
  const [q,setQ] = useState('');
  const [items,setItems] = useState(null);
  const [err,setErr] = useState(null);
  const add = useBetSlipAdder();
  const { oddsFormat } = useSportsbook(); // not used here, but for potential display

  useEffect(()=>{
    if (!open) return;
    fetch('/api/search', { cache:'no-store' })
      .then(r=>r.json().then(j=>({ok:r.ok,j})))
      .then(({ok,j})=>{ if(!ok) throw new Error(j?.error||'fetch failed'); setItems(j.items||[]); })
      .catch(e=>setErr(String(e)));
  },[open]);

  const res = useMemo(()=>{
    if(!q) return items||[];
    const needle = q.toLowerCase();
    return (items||[]).filter(x=>
      x.gameLabel.toLowerCase().includes(needle) ||
      x.sport.toLowerCase().includes(needle) ||
      x.market.toLowerCase().includes(needle) ||
      x.outcome.toLowerCase().includes(needle)
    );
  },[q,items]);

  return (
    <>
      <div className="relative">
        <input
          onFocus={()=>setOpen(true)}
          value={q} onChange={e=>setQ(e.target.value)}
          placeholder="Search teams, markets, players…"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm"
        />
        <div className="absolute right-3 top-2.5 text-xs text-white/60">Search</div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setOpen(false)} />
          <div className="absolute left-1/2 -translate-x-1/2 top-16 w-[92vw] max-w-3xl bg-[#0b0f13] rounded-2xl border border-white/10 p-4">
            <div className="flex items-center gap-2">
              <input autoFocus value={q} onChange={e=>setQ(e.target.value)}
                placeholder="Search teams, markets, players…"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm" />
              <button className="px-3 py-2 rounded-xl bg-white/10" onClick={()=>setOpen(false)}>Close</button>
            </div>

            <div className="mt-3 max-h-[60vh] overflow-auto grid gap-2">
              {err && <div className="text-sm text-red-400">{err}</div>}
              {!items && !err && <div className="text-sm text-white/60">Loading index…</div>}
              {items && res.slice(0,60).map(it=>(
                <button key={it.id}
                  onClick={()=>add({ id: it.id, label: `${it.gameLabel} • ${it.market} ${it.outcome}`, price: it.price })}
                  className="text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10">
                  <div className="text-sm">{it.gameLabel}</div>
                  <div className="text-xs text-white/60">{it.sport} • {it.market} • {it.outcome}</div>
                </button>
              ))}
              {items && !res.length && <div className="text-sm text-white/60">No results.</div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
