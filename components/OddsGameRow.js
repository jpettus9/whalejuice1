'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import { niceTime, formatOdds } from '../lib/odds';
import { useSportsbook } from './SportsbookProvider';
import { useBetSlipAdder } from './BetSlip';

function MarketButton({ label, price, onClick, oddsFormat }){
  if (price==null || price===undefined) return <button className="px-3 py-2 rounded-xl bg-white/5 text-sm opacity-40" disabled>—</button>;
  return (
    <button onClick={onClick} className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm">
      {label} {formatOdds(price, oddsFormat)}
    </button>
  );
}

export default function OddsGameRow({ g }) {
  const { oddsFormat, book, favorites, toggleFav } = useSportsbook();
  const addToSlip = useBetSlipAdder();

  // Choose a book's market if user filtered
  function pickMarket(key){
    if (book === 'Any') return g[key];
    // find the market for a specific book in raw bookmakers
    const target = (g.bookmakers||[]).find(bk => bk.title === book);
    const market = target?.markets?.find(m => m.key === key);
    return market ? { book: book, outcomes: market.outcomes } : g[key];
  }

  const ml = pickMarket('h2h')?.outcomes?.slice(0,2) || [];
  const sp = pickMarket('spreads')?.outcomes?.slice(0,2) || [];
  const tot = pickMarket('totals')?.outcomes?.slice(0,2) || [];

  function spreadLabel(out){
    if (out?.point==null) return out?.name || 'Spread';
    const side = out.name?.toLowerCase().includes('home') ? 'Home' : out.name?.toLowerCase().includes('away') ? 'Away' : out.name;
    const sign = out.point>0?'+':'';
    return `${side} ${sign}${out.point}`;
  }
  function totalLabel(out){
    if (out?.point==null) return out?.name || 'Total';
    const side = out.name?.toLowerCase().includes('under') ? 'Under' : 'Over';
    return `${side} ${out.point}`;
  }

  const fav = !!favorites[g.id];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold">{g.away_team} @ {g.home_team}</div>
          <div className="text-xs text-white/60">{niceTime(g.commence_time)}</div>
          <div className="text-[10px] text-white/50 mt-1">Books: {g.books?.slice(0,4).join(', ') || '—'}</div>
        </div>
        <button onClick={()=>toggleFav(g.id)} className={`text-xs px-2 py-1 rounded ${fav ? 'bg-cyan-500 text-black' : 'bg-white/10'}`}>
          {fav ? '★ Favorited' : '☆ Favorite'}
        </button>
      </div>

      <div className="mt-3 grid md:grid-cols-3 gap-2">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="text-xs text-white/60 w-full">Moneyline</div>
          {ml.map((o,i)=>(
            <MarketButton key={i} oddsFormat={oddsFormat}
              label={o.name?.includes(g.home_team)?'Home':'Away'}
              price={o.price}
              onClick={()=>addToSlip({ id: `${g.id}-ml-${i}`, label:`${g.away_team} @ ${g.home_team} • ML ${o.name?.includes(g.home_team)?'Home':'Away'}`, price:o.price })}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="text-xs text-white/60 w-full">Spread</div>
          {sp.map((o,i)=>(
            <MarketButton key={i} oddsFormat={oddsFormat}
              label={spreadLabel(o)}
              price={o.price}
              onClick={()=>addToSlip({ id: `${g.id}-sp-${i}`, label:`${g.away_team} @ ${g.home_team} • ${spreadLabel(o)}`, price:o.price })}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <div className="text-xs text-white/60 w-full">Total</div>
          {tot.map((o,i)=>(
            <MarketButton key={i} oddsFormat={oddsFormat}
              label={totalLabel(o)}
              price={o.price}
              onClick={()=>addToSlip({ id: `${g.id}-tot-${i}`, label:`${g.away_team} @ ${g.home_team} • ${totalLabel(o)}`, price:o.price })}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-white/60">
        <div>Last update just now (cached)</div>
        <Link href={`/event?sport=${encodeURIComponent(g.sport)}&id=${encodeURIComponent(g.id)}`} className="text-cyan-300">All markets →</Link>
      </div>
    </div>
  );
}
