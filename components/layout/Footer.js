export default function Footer(){
  return (<footer className="border-t border-white/10">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-white/70">
      © {new Date().getFullYear()} WhaleJuice — Demo only. No real money.
    </div>
  </footer>);
}