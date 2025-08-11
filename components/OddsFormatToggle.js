'use client';
import { useSportsbook } from './SportsbookProvider';
export default function OddsFormatToggle(){
  const { oddsFormat, setOddsFormat } = useSportsbook();
  const opts = ['american','decimal','fractional'];
  return (
    <div className="inline-flex rounded-xl overflow-hidden border border-white/10">
      {opts.map(o => (
        <button key={o}
          onClick={()=>setOddsFormat(o)}
          className={`px-3 py-1.5 text-sm ${oddsFormat===o?'bg-cyan-500 text-black':'bg-white/5'}`}>
          {o[0].toUpperCase()+o.slice(1)}
        </button>
      ))}
    </div>
  );
}
