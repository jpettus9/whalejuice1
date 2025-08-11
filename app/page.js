'use client';
import { useEffect, useMemo, useState } from 'react';
import SportsbookProvider from '../components/SportsbookProvider';
import GlobalSlip from '../components/GlobalSlip';
import OddsTile from '../components/OddsTile';

export default function Home(){
  return (
    <SportsbookProvider>
      <HomeInner />
      <GlobalSlip />
    </SportsbookProvider>
  );
}

function HomeInner(){
  const [sports, setSports] = useState(null);
  const [sections, setSections] = useState({ live: [], popular: [] });
  const [err, setErr] = useState(null);

  useEffect(()=>{
    fetch('/api/odds/sports', { cache:'no-store' })
      .then(r=>r.json().then(j=>({ok:r.ok, j})))
      .then(({ok,j})=>{
        if(!ok) throw new Error(j?.error||'fetch failed');
        setSports(j.sports||[]);
      })
      .catch(e=>setErr(String(e)));
  },[]);

  // choose a handful of common sports to feature
  const picks = useMemo(()=>{
    if(!sports) return [];
    const wanted = ['basketball_nba','americanfootball_nfl','baseball_mlb','icehockey_nhl','soccer_epl','golf','mma_mixed_martial_arts'];
    const found = sports.filter(s => wanted.some(w => s.key.includes(w)));
    return found.slice(0, 6);
  }, [sports]);

  useEffect(()=>{
    const run = async () => {
      if (!picks.length) return;
      const results = await Promise.allSettled(picks.map(s =>
        fetch(`/api/odds/${encodeURIComponent(s.key)}`, { cache: 'no-store' })
          .then(r=>r.json().then(j=>({ok:r.ok, j, key:s.key})))
      ));
      const live = [];
      const popular = [];
      results.forEach(res => {
        if (!res.value?.ok) return;
        const list = res.value.j.events||[];
        // simple split: first 1-2 are "live", rest "popular"
        live.push(...list.slice(0,1));
        popular.push(...list.slice(1,4));
      });
      setSections({ live, popular });
    };
    run();
  }, [picks]);

  if (err) return <div className="p-6 text-sm text-red-400">Error: {err}</div>;
  if (!sports) return <div className="p-6 text-sm text-white/60">Loading homepage…</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero promos */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-cyan-600/20 to-indigo-700/20 p-6">
        <div className="text-xs tracking-widest text-white/70">WHALEJUICE</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-black">Storm the board. Bet faster.</h1>
        <p className="mt-2 text-white/70 text-sm max-w-2xl">Live odds across every sport. Parlays, boosts, and quick-add to your slip from anywhere.</p>
        <div className="mt-4 flex gap-3">
          <a href="/sports" className="px-4 py-2 rounded-xl bg-cyan-500 text-black font-semibold">Browse Sports</a>
          <a href="/boosts" className="px-4 py-2 rounded-xl bg-white/10">Today’s Boosts</a>
        </div>
      </div>

      {/* Live Now rail */}
      <Section title="Live Now">
        <Rail items={sections.live} />
      </Section>

      {/* Popular Today grid */}
      <Section title="Popular Today">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.popular.map(g => <OddsTile key={g.id} game={g} />)}
          {!sections.popular.length && <div className="text-sm text-white/60">No popular events right now.</div>}
        </div>
      </Section>

      {/* Featured Parlays (demo, static) */}
      <Section title="Featured Parlays">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { t:'NBA • 3-Leg Moneyline', d:'Favorites parlay', k:'parlay-nba-1' },
            { t:'NFL • Alt Spread Duo', d:'+6.5 safe cover', k:'parlay-nfl-1' },
            { t:'MLB • Totals Trio', d:'Over fiesta', k:'parlay-mlb-1' },
          ].map(x=>(
            <div key={x.k} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="font-semibold">{x.t}</div>
              <div className="text-xs text-white/60">{x.d}</div>
              <button className="mt-3 px-3 py-2 rounded-lg bg-cyan-500 text-black text-sm font-semibold">Add Parlay (demo)</button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({title, children}){
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Rail({ items=[] }){
  return (
    <div className="grid auto-cols-[70%] grid-flow-col gap-3 overflow-x-auto no-scrollbar pr-1
                    sm:auto-cols-[45%] lg:auto-cols-[30%]">
      {items.map(g => <OddsTile key={g.id} game={g} />)}
      {!items.length && <div className="text-sm text-white/60">No live events right now.</div>}
    </div>
  );
}
