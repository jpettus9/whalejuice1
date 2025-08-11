import Link from 'next/link';
import { SPORT_SLUGS } from '../../lib/odds';

export default function SportsIndex(){
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold">Sportsbook</h1>
      <p className="text-white/70 mt-2 text-sm">Live prices powered by The Odds API, cached every 60 seconds.</p>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SPORT_SLUGS.map(s => (
          <a key={s.slug} href={`/sports/${s.slug}`} className="rounded-2xl border border-white/10 bg-white/5 p-5 block hover:-translate-y-1 transition">
            <div className="font-semibold">{s.name}</div>
            <div className="text-xs text-white/60">{s.key}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
