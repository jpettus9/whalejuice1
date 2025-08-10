'use client';
import { useState } from 'react';
export default function Nav(){
  const [open,setOpen]=useState(false);
  return (
    <header className="relative z-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          <a href="/" className="font-black tracking-[0.2em] text-lg sm:text-xl">WHALEJUICE</a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="/sports" className="hover:text-white">Sports</a>
            <a href="/boosts" className="hover:text-white">Boosts</a>
            <a href="/stats-hub" className="hover:text-white">Stats</a>
            <a href="/(core)/feed" className="hover:text-white">Feed</a>
          </nav>
          <button aria-label="Menu" className="md:hidden min-h-[44px] p-2" onClick={()=>setOpen(!open)}>
            <div className="w-6 h-0.5 bg-white mb-1"/><div className="w-6 h-0.5 bg-white mb-1"/><div className="w-6 h-0.5 bg-white"/>
          </button>
        </div>
        {open && (
          <div className="md:hidden mt-3 grid gap-2 text-sm text-white/80">
            <a className="px-3 py-3 rounded-lg bg-white/5 active:bg-white/10" href="/sports">Sports</a>
            <a className="px-3 py-3 rounded-lg bg-white/5 active:bg-white/10" href="/boosts">Boosts</a>
            <a className="px-3 py-3 rounded-lg bg-white/5 active:bg-white/10" href="/stats-hub">Stats Hub</a>
            <a className="px-3 py-3 rounded-lg bg-white/5 active:bg-white/10" href="/(core)/feed">Feed</a>
          </div>
        )}
      </div>
    </header>
  );
}
