'use client';
import { useEffect, useState } from 'react';
import BetSlip from './BetSlip';

export default function GlobalSlip(){
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(()=>{
    const m = () => setIsDesktop(window.matchMedia('(min-width: 1024px)').matches);
    m(); window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  },[]);

  if (isDesktop){
    return (
      <div className="fixed right-4 top-24 w-80 hidden lg:block z-40">
        <BetSlip />
      </div>
    );
  }

  return (
    <>
      <button onClick={()=>setOpen(true)}
        className="fixed bottom-6 right-6 z-40 rounded-full px-5 py-3 bg-cyan-500 text-black font-bold shadow-lg">
        Bet Slip
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-[#0b0f13] rounded-t-2xl p-4 max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Bet Slip</div>
              <button className="text-white/60" onClick={()=>setOpen(false)}>Close</button>
            </div>
            <div className="mt-3"><BetSlip /></div>
          </div>
        </div>
      )}
    </>
  );
}
