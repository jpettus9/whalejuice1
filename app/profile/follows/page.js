'use client';
import { useState } from 'react';
export default function Follows(){
  const [f,setF]=useState(['Tempest City']);
  const all=['Tempest City','Thunder Bay','Maelstrom','Stormhawks'];
  function toggle(team){ setF(arr=> arr.includes(team) ? arr.filter(x=>x!==team) : [...arr,team]); }
  return (
    <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10'>
      <h1 className='text-3xl font-extrabold'>Follows</h1>
      <div className='mt-4 grid grid-cols-2 gap-2'>
        {all.map(t=>(<button key={t} onClick={()=>toggle(t)} className={`${f.includes(t)?'bg-cyan-500 text-black':'bg-white/10'} px-4 py-3 rounded-xl`}>{t}</button>))}
      </div>
      <div className='mt-6 text-sm text-white/60'>Used by your Feed and discovery ranking.</div>
    </div>
  );
}
