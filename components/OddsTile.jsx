'use client';
import { formatOdds } from '../lib/odds';
import { useBetSlipAdder } from './BetSlip';
import { useSportsbook } from './SportsbookProvider';

export default function OddsTile({ game, bookMarket='h2h' }){
  const addToSlip = useBetSlipAdder();
  const { oddsFormat } = useSportsbook();
  const m = game[bookMarket];
  const outs = m?.outcomes?.slice(0,2) || [];

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">
      <div className="text-xs text-white/60 truncate">{game.sport}</div>
      <div className="font-semibold truncate">{game.away_team} @ {game.home_team}</div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        {outs.map((o,i)=> (
          <button key={i}
            onClick={()=>addToSlip({ id: `${game.id}-${bookMarket}-${i}`, label:`${game.away_team} @ ${game.home_team} • ${bookMarket.toUpperCase()} ${i===0?'Away/H1':'Home/H2'}`, price:o.price })}
            className="px-2 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-left">
            <div className="text-white/80 truncate">{o.name}</div>
            <div className="text-white/60">{formatOdds(o.price, oddsFormat)}</div>
          </button>
        ))}
        {!outs.length && <div className="col-span-2 text-xs text-white/50">No prices</div>}
      </div>
    </div>
  );
}
