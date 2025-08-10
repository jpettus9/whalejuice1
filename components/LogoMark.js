export default function LogoMark({ small=false }){
  return (
    <div className={`relative ${small?"w-6 h-6":"w-9 h-9"}`}>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500 to-white" />
      <div className="absolute inset-[2px] rounded-2xl bg-[#06070A]" />
      <svg viewBox="0 0 40 40" className="absolute inset-0 m-auto w-3/4 h-3/4">
        <path d="M4 22c5-6 10-6 15 0s10 6 17 0" fill="none" stroke="currentColor" strokeWidth="3" className="text-cyan-400"/>
        <path d="M8 26c3-3 6-3 9 0s6 3 10 0" fill="none" stroke="currentColor" strokeWidth="2" className="text-white"/>
      </svg>
      <svg viewBox="0 0 24 24" className="absolute -right-1 -top-1 w-3 h-3 text-white">
        <path d="M13 2L3 14h6l-2 8 10-12h-6z" fill="currentColor"/>
      </svg>
    </div>
  )
}