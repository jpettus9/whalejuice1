'use client';
import { useEffect, useState } from 'react';
export default function Micro(){
  const [props,setProps]=useState([]);
  useEffect(()=>{
    const timer=setInterval(()=>{
      const market=['Next Play: Pass','Next Play: Run','Next Batter: Strikeout','Next Pitch: Ball','Next Point: Ace'][Math.floor(Math.random()*5)];
      const price=[-115,-105,+100,+120,+145][Math.floor(Math.random()*5)];
      setProps(p=>[{id:Date.now(),market,price},...p].slice(0,10));
    },2500);
    return ()=>clearInterval(timer);
  },[]);
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold">Microbetting (Flash Props)</h1>
      <div className="mt-6 grid gap-3">
        {props.map(p=>(
          <div key={p.id} className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
            <div className="text-sm">{p.market}</div>
            <button className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold">{p.price>0?`+${p.price}`:p.price}</button>
          </div>
        ))}
      </div>
    </div>
  );
}
