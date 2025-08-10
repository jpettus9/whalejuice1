'use client';import { useState } from 'react';
export default function Tabs({tabs,initial=0}){const [i,setI]=useState(initial);
  return (<div>
    <div className='flex gap-2 overflow-x-auto no-scrollbar'>
      {tabs.map((t,idx)=>(<button key={idx} onClick={()=>setI(idx)} className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${i===idx?'bg-cyan-500 text-black':'bg-white/10'}`}>{t.label}</button>))}
    </div>
    <div className='mt-3'>{tabs[i]?.content}</div>
  </div>);
}