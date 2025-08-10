'use client';
import { useState, useEffect } from 'react';
export default function Feed(){
  const [teams,setTeams]=useState(['Tempest City','Thunder Bay']);
  const [items,setItems]=useState([]);
  useEffect(()=>{ const t=setInterval(()=>{
      const team = teams[Math.floor(Math.random()*teams.length)];
      const msg = `${team}: price moved ${Math.random()>0.5?'+':''}${(Math.random()*30-15).toFixed(0)}`;
      setItems(it=>[{ id: Date.now(), msg }, ...it].slice(0,20));
    }, 3500); return ()=>clearInterval(t);
  },[teams]);
  return (<div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
    <h1 className="text-3xl font-extrabold">Your Feed</h1>
    <div className="text-sm text-white/60 mt-1">Follow teams/players to surface lines & props first.</div>
    <div className="mt-4 flex gap-2">{['Add Tempest','Add Maelstrom','Add Stormhawks'].map(t=>(<button key={t} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20" onClick={()=>setTeams(arr=>[...new Set([...arr, t.replace('Add ','')])])}>{t}</button>))}</div>
    <div className="mt-6 grid gap-2">{items.map(i=>(<div key={i.id} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{i.msg}</div>))}</div>
  </div>);
}
