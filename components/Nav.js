'use client';
import { useEffect, useState } from 'react';
import LogoMark from './LogoMark';

export default function Nav(){
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <LogoMark />
            <div className="leading-none">
              <div className="text-lg sm:text-xl font-black tracking-wider group-hover:text-cyan-300 transition-colors">WHALEJUICE</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">Ride the Storm</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm text-white/80">
            <a className="hover:text-white transition-colors" href="/sports">Sportsbook</a>
            <a className="hover:text-white transition-colors" href="/casino">Casino</a>
            <a className="hover:text-white transition-colors" href="/promos">Promos</a>
            <a className="hover:text-white transition-colors" href="/vip">VIP</a>
            <a className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm" href="/banking">Banking</a>
            <a className="px-3 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm shadow-[0_0_20px_rgba(34,211,238,0.4)]" href="/profile/limits">Profile</a>
          </nav>
          <button aria-label="Menu" className="md:hidden text-white/80 min-h-[44px] min-w-[44px] -mr-1 p-2" onClick={()=>setOpen(!open)}>
            <div className="w-6 h-0.5 bg-white mb-1"/><div className="w-6 h-0.5 bg-white mb-1"/><div className="w-6 h-0.5 bg-white"/>
          </button>
        </div>
        {open && (
          <div className="md:hidden mt-3 grid gap-2 text-sm text-white/80">
            <a className="px-3 py-3 rounded-lg bg-white/5 active:bg-white/10 min-h-[44px]" href="/sports">Sportsbook</a>
            <a className="px-3 py-3 rounded-lg bg-white/5 active:bg-white/10 min-h-[44px]" href="/casino">Casino</a>
            <a className="px-3 py-3 rounded-lg bg-white/5 active:bg-white/10 min-h-[44px]" href="/promos">Promos</a>
            <a className="px-3 py-3 rounded-lg bg-white/5 active:bg-white/10 min-h-[44px]" href="/vip">VIP</a>
            <div className="flex gap-2 pt-2">
              <a href="/banking" className="flex-1 px-4 py-3 rounded-xl bg-white/5 text-center min-h-[44px]">Banking</a>
              <a href="/profile/limits" className="flex-1 px-4 py-3 rounded-xl bg-cyan-500 text-black font-semibold text-center min-h-[44px]">Profile</a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
