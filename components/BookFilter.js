'use client';
import { useSportsbook } from './SportsbookProvider';
export default function BookFilter({ books=[] }){
  const { book, setBook } = useSportsbook();
  const options = ['Any', ...books];
  return (
    <select value={book} onChange={e=>setBook(e.target.value)}
      className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm">
      {options.map(b=><option key={b} value={b}>{b}</option>)}
    </select>
  );
}
