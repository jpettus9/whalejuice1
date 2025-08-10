'use client';
import Link from 'next/link';
const items=[
  { href:'/', label:'Home' },
  { href:'/sports', label:'Sports' },
  { href:'/casino', label:'Casino' },
  { href:'/feed', label:'Feed' },
];
export default function MobileNav(){
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-white/10 backdrop-blur bg-black/40 safe-bottom">
      <div className="mx-auto max-w-7xl px-3 py-2 grid grid-cols-4 gap-2 text-xs">
        {items.map(it=>(<Link key={it.href} href={it.href} className="flex flex-col items-center justify-center py-2 rounded-xl bg-white/5 active:bg-white/10 min-h-[44px]">{it.label}</Link>))}
      </div>
    </nav>
  );
}
