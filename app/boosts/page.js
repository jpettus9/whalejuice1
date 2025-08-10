import Card from '../../components/ui/Card';
const boosts=[
  {id:1,title:'Storm Surge SGP Boost',desc:'Any NFL SGP 3+ legs',old:'+350',new:'+420'},
  {id:2,title:'Lightning Moneyline',desc:'Tempest City ML',old:'+110',new:'+140'},
  {id:3,title:'Parlay Power Hour',desc:'6–7pm local • all sports',old:'+500',new:'+600'},
];
export default function Boosts(){
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold">Odds Boosts</h1>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {boosts.map(b=>(
          <Card key={b.id}>
            <div className="font-semibold">{b.title}</div>
            <div className="text-sm text-white/60">{b.desc}</div>
            <div className="mt-3 text-xs text-white/60 line-through">Was {b.old}</div>
            <div className="text-lg font-bold text-cyan-300">Now {b.new}</div>
            <button className="mt-4 w-full px-4 py-2 rounded-xl bg-cyan-500 text-black font-semibold">Add to Slip</button>
          </Card>
        ))}
      </div>
    </div>
  );
}
