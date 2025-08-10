export default function Missions(){
  const items=[
    {name:'Place 3 Live Bets',reward:'+150 Crowns'},
    {name:'Build an SGP (3+ legs)',reward:'+100 Crowns'},
    {name:'Try Microbetting',reward:'+50 Crowns'},
  ];
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold">Missions</h1>
      <div className="mt-6 grid gap-3">
        {items.map((m,i)=>(
          <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 flex items-center justify-between">
            <div>
              <div className="font-semibold">{m.name}</div>
              <div className="text-xs text-white/60">Complete today</div>
            </div>
            <div className="text-sm font-semibold text-cyan-300">{m.reward}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
