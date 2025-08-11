'use client';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { niceTime, formatOdds } from '../../lib/odds';
import SportsbookProvider, { useSportsbook } from '../../components/SportsbookProvider';
import { useBetSlipAdder } from '../../components/BetSlip';

export default function EventPage(){
  return (
    <SportsbookProvider>
      <EventInner />
    </SportsbookProvider>
  );
}

function EventInner(){
  const sp = useSearchParams();
  const sport = sp.get('sport') || 'americanfootball_nfl'; // fallback
  const id = sp.get('id');
  const { oddsFormat, book } = useSportsbook();
  const addToSlip = useBetSlipAdder();

  const [game, setGame] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(()=>{
    const slug = sport.includes('_') ? sport : (sport || 'nfl');
    const url = `/api/odds/${slug.replace('americanfootball_nfl','nfl').replace('basketball_nba','nba').replace('baseball_mlb','mlb').replace('icehockey_nhl','nhl')}`;
    fetch(url, { cache:'no-store' })
      .then(r=>r.json().then(j=>({ok:r.ok, j})))
      .then(({ok,j})=>{
        if(!ok) throw new Error(j?.error||'fetch failed');
        const found = (j.events||[]).find(e=>e.id===id) || (j.events||[])[0];
        setGame(found);
      })
      .catch(e=>setErr(String(e)));
  }, [sport, id]);

  if (err) return <div className="p-6 text-sm text-red-400">Error: {err}</div>;
  if (!game) return <div className="p-6 text-sm text-white/60">Loading markets…</div>;

  function pickMarket(key){
    if (book === 'Any') return game[key];
    const target = (game.bookmakers||[]).find(bk => bk.title === book);
    const market = target?.markets?.find(m => m.key === key);
    return market ? { book: book, outcomes: market.outcomes } : game[key];
  }

  const groups = [
    { key:'h2h', label:'Moneyline', mapLabel:(o)=> o.name?.includes(game.home_team)?'Home':'Away' },
    { key:'spreads', label:'Spread', mapLabel:(o)=> {
        if (o?.point==null) return o?.name || 'Spread';
        const side = o.name?.toLowerCase().includes('home') ? 'Home' : o.name?.toLowerCase().includes('away') ? 'Away' : o.name;
        const sign = o.point>0?'+':'';
        return `${side} ${sign}${o.point}`;
      }},
    { key:'totals', label:'Total', mapLabel:(o)=> {
        if (o?.point==null) return o?.name || 'Total';
        const side = o.name?.toLowerCase().includes('under') ? 'Under' : 'Over';
        return `${side} ${o.point}`;
      }},
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs text-white/60">{game.sport}</div>
          <h1 className="text-2xl font-black">{game.away_team} @ {game.home_team}</h1>
          <div className="text-xs text-white/60">{niceTime(game.commence_time)}</div>
        </div>
        <div className="text-xs text-white/60">Book: {book==='Any' ? (game.h2h?.book || game.spreads?.book || game.totals?.book || '—') : book}</div>
      </div>

      <div className="mt-6 grid gap-4">
        {groups.map((g,i)=>{
          const m = pickMarket(g.key);
          const outs = m?.outcomes || [];
          return (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="font-semibold">{g.label}</div>
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {outs.map((o,idx)=> (
                  <button key={idx}
                    onClick={()=>addToSlip({ id: `${game.id}-${g.key}-${idx}`, label:`${game.away_team} @ ${game.home_team} • ${g.mapLabel(o)}`, price:o.price })}
                    className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm text-left">
                    <div className="text-white/80">{g.mapLabel(o)}</div>
                    <div className="text-white/60 text-xs mt-0.5">{formatOdds(o.price, oddsFormat)}</div>
                  </button>
                ))}
                {!outs.length && <div className="text-sm text-white/60 col-span-full">No {g.label} prices available.</div>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-xs text-white/60">Demo only. No real money.</div>
    </div>
  );
}
