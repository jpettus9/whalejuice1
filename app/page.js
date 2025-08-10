import Card from '../components/ui/Card';
import Link from 'next/link';
export default function Home(){
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-5xl font-black leading-tight">Ride the <span className="text-cyan-300">Storm</span>. Bet like a <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">Whale</span>.</h1>
          <p className="mt-4 text-white/80">A next-gen sportsbook + casino vibe for your crew. Demo only.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/sports" className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-base">Enter Sportsbook</Link>
            <Link href="/casino" className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-base">Open Casino</Link>
          </div>
        </div>
        <Card>
          <div className="font-semibold">Trending</div>
          <div className="grid grid-cols-3 gap-3 mt-3 text-sm">
            <Card>Light. Dice<br/><span className="text-xs text-white/60">Pool $183k</span></Card>
            <Card>Tempest Slots<br/><span className="text-xs text-white/60">Pool $422k</span></Card>
            <Card>Parlay Surge<br/><span className="text-xs text-white/60">Pool $1.02m</span></Card>
          </div>
          <Link href="/event" className="mt-4 inline-block w-full text-center px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-white text-black font-bold">Play Now</Link>
        </Card>
      </div>
      <div className="mt-10 grid md:grid-cols-3 gap-4">
        <Card>Odds Boosts → <Link className="text-cyan-300" href="/boosts">See boosts</Link></Card>
        <Card>Stats Hub → <Link className="text-cyan-300" href="/stats-hub">Open</Link></Card>
        <Card>Missions → <Link className="text-cyan-300" href="/missions">Play</Link></Card>
      </div>
    </div>
  );
}