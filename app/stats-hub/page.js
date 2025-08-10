'use client';
import Card from '../../components/ui/Card';

const systems = [
  { name:'Road favorites after loss', hit:'58% last 30 days' },
  { name:'Unders in divisional primetime', hit:'61% season-to-date' },
  { name:'Player threes vs pace-up teams', hit:'57% last 7 days' },
];

export default function StatsHub(){
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold">Stats Hub</h1>
      <p className="text-white/70 mt-2 text-sm">Trending systems & quick filters to craft parlays — DK-style.</p>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <Card>
          <div className="font-semibold mb-2">Trending Systems</div>
          <ul className="text-sm space-y-2">
            {systems.map((s,i)=>(<li key={i} className="flex items-center justify-between"><span>{s.name}</span><span className="text-cyan-300">{s.hit}</span></li>))}
          </ul>
        </Card>
        <Card>
          <div className="font-semibold mb-2">Quick Filters</div>
          <div className="flex flex-wrap gap-2 text-sm">
            {['Hot Offense','Cold Defense','Back-to-back','High Pace','Windy'].map(t=>(
              <button key={t} className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20">{t}</button>
            ))}
          </div>
          <div className="mt-3 text-xs text-white/60">Tap to prefill an SGP on the event page.</div>
        </Card>
      </div>
    </div>
  );
}
