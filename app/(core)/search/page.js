'use client';
import { useMemo, useState } from 'react';
const DATA=['Tempest City Moneyline','Thunder Bay Spread','Over 44.5 Total','QB Passing 250+','Anytime TD'];
export default function Search(){
  const [q,setQ]=useState('');
  const res = useMemo(()=> DATA.filter(x=>x.toLowerCase().includes(q.toLowerCase())),[q]);
  return (<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
    <h1 className="text-3xl font-extrabold">Search</h1>
    <input placeholder="Search teams, markets, props…" value={q} onChange={e=>setQ(e.target.value)} className="mt-4 w-full bg-transparent border border-white/10 rounded-xl px-4 py-3"/>
    <div className="mt-4 grid gap-2">{res.map((r,i)=>(<div key={i} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{r}</div>))}</div>
  </div>);
}
