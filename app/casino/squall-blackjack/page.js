'use client';
import { useState } from 'react';
import { Zap } from 'lucide-react';
export default function Game(){
  const [balance,setBalance]=useState(1000);
  const [last,setLast]=useState(null);
  function play(){const bet=10; const win=Math.random()>0.6?Math.floor(Math.random()*150):0; setBalance(b=>b-bet+win); setLast({bet,win});}
  return (
    <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10'>
      <h1 className='text-3xl font-extrabold'>Squall Blackjack</h1>
      <div className='mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-cyan-400/10 p-6'>
        <div className='h-48 rounded-2xl bg-white/5 border border-white/10 grid place-items-center text-white/50'>[ Squall Blackjack Placeholder ]</div>
        <div className='mt-4 flex items-center justify-between text-sm'><div>Balance: <span className='font-semibold'>${balance}</span></div><div className='text-white/60'>{last?`Last: $${last.bet} → $${last.win}`:'No plays yet'}</div></div>
        <button onClick={play} className='mt-4 w-full px-4 py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 flex items-center justify-center gap-2'><Zap className='w-4 h-4'/> Play $10</button>
      </div>
    </div>
  );
}
