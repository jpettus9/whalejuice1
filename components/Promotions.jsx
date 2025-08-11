'use client';
import { useEffect, useState } from 'react';

export default function Promotions(){
  const [promos, setPromos] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(()=>{
    fetch('/api/promos', { cache:'no-store' })
      .then(r=>r.json().then(j=>({ok:r.ok,j})))
      .then(({ok,j})=>{ if(!ok) throw new Error(j?.error||'fetch failed'); setPromos(j.promos||[]); })
      .catch(e=>setErr(String(e)));
  },[]);

  if (err) return <div className="text-sm text-red-400">Error: {err}</div>;
  if (!promos) return <div className="text-sm text-white/60">Loading…</div>;

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {promos.map(p=>(
        <div key={p.id} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-cyan-500/10 p-5">
          <div className="text-xs text-white/60">Boost</div>
          <div className="mt-1 font-semibold">{p.title}</div>
          <div className="text-sm text-white/70">{p.desc}</div>
          <div className="mt-2 text-cyan-300 font-bold">{p.boost}</div>
          <button className="mt-3 px-3 py-2 rounded-xl bg-cyan-500 text-black text-sm font-semibold">{p.cta}</button>
        </div>
      ))}
    </div>
  );
}
