'use client';
import { useEffect, useState } from 'react';
import LogoMark from './LogoMark';
import Button from './ui/Button';

export default function Nav(){
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  useEffect(()=>{ document.documentElement.setAttribute('data-theme', theme==='light'?'light':''); },[theme]);
  return (
    <header className="relative z-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <LogoMark />
            <div className="leading-none">
              <div className="text-xl font-black tracking-wider group-hover:text-cyan-300 transition-colors">WHALEJUICE</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">Ride the Storm</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
            <a className="hover:text-white transition-colors" href="/sports">Sportsbook</a>
            <a className="hover:text-white transition-colors" href="/casino">Casino</a>
            <a className="hover:text-white transition-colors" href="/promos">Promos</a>
            <a className="hover:text-white transition-colors" href="/vip">VIP</a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" onClick={()=>setTheme(t=>t==='dark'?'light':'dark')}>{theme==='dark'?'Light':'Dark'}</Button>
            <a href="/banking" className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition text-sm">Banking</a>
            <a href="/profile/limits" className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition text-sm shadow-[0_0_20px_rgba(34,211,238,0.4)]">Profile</a>
          </div>
          <button className="md:hidden text-white/80" onClick={()=>setOpen(!open)} aria-label="Toggle menu">
            <div className="w-6 h-0.5 bg-white mb-1"/><div className="w-6 h-0.5 bg-white mb-1"/><div className="w-6 h-0.5 bg-white"/>
          </button>
        </div>
        {open && (
          <div className="md:hidden mt-4 grid gap-2 text-sm text-white/80">
            <a className="px-3 py-2 rounded-lg bg-white/5" href="/sports">Sportsbook</a>
            <a className="px-3 py-2 rounded-lg bg-white/5" href="/casino">Casino</a>
            <a className="px-3 py-2 rounded-lg bg-white/5" href="/promos">Promos</a>
            <a className="px-3 py-2 rounded-lg bg-white/5" href="/vip">VIP</a>
            <div className="flex gap-2 pt-2">
              <button onClick={()=>setTheme(t=>t==='dark'?'light':'dark')} className="flex-1 px-4 py-2 rounded-xl bg-white/5">Toggle Theme</button>
              <a href="/banking" className="flex-1 px-4 py-2 rounded-xl bg-cyan-500 text-black font-semibold text-center">Banking</a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}