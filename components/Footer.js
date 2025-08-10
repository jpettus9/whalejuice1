export default function Footer(){
  return (
    <footer className="relative z-10 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="font-black">WhaleJuice</div>
            <p className="mt-3 text-white/60">© {new Date().getFullYear()} WhaleJuice. Demo only. No real money.</p>
          </div>
          <div>
            <div className="font-semibold mb-3">Products</div>
            <ul className="space-y-2 text-white/70">
              <li><a href="/sports" className="hover:text-white">Sportsbook</a></li>
              <li><a href="/casino" className="hover:text-white">Casino</a></li>
              <li><a href="/vip" className="hover:text-white">VIP</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Company</div>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Affiliates</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Help</div>
            <ul className="space-y-2 text-white/70">
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Support</a></li>
              <li><a href="#" className="hover:text-white">Feedback</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}