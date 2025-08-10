import Link from 'next/link';
const games=[{slug:'tempest-slots',name:'Tempest Slots'},{slug:'vortex-roulette',name:'Vortex Roulette'},{slug:'squall-blackjack',name:'Squall Blackjack'}];
export default function Casino(){
  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10'>
      <h1 className='text-3xl font-extrabold'>Casino</h1>
      <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {games.map(g=>(
          <Link key={g.slug} href={`/casino/${g.slug}`} className='rounded-2xl border border-white/10 bg-white/5 p-5 block hover:-translate-y-1 transition'>
            <div className='h-24 rounded-xl bg-gradient-to-br from-cyan-500/20 to-white/10 border border-white/10'/>
            <div className='mt-3 font-semibold'>{g.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
