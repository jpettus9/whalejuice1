export default function Rewards(){
  const tiers = [
    { name: 'Bronze', req: '0–999 Tier Credits', perks: 'Basic cashback, weekly drops' },
    { name: 'Silver', req: '1,000–9,999', perks: 'Higher rakeback, priority chat' },
    { name: 'Gold', req: '10,000+', perks: 'VIP host, exclusive promos' },
  ];
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold">WhaleJuice Rewards</h1>
      <p className="text-white/70 mt-2 text-sm">Earn Crowns & Tier Credits for every play. Redeem on anything.</p>
      <div className="mt-6 grid gap-4">
        {tiers.map((t,i)=>(
          <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="font-semibold">{t.name}</div>
            <div className="text-sm text-white/60">{t.req}</div>
            <div className="text-sm mt-1">{t.perks}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
