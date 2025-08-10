
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Trophy, Waves, Crown, Headphones, Coins, Dice1 } from "lucide-react";

function FeatureCard({ icon: Icon, title, text }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <Icon className="w-6 h-6 text-cyan-300" />
      <div className="mt-3 font-semibold text-lg">{title}</div>
      <p className="text-white/70 text-sm">{text}</p>
    </motion.div>
  );
}

function OddsWidget() {
  const rows = [
    { teams: "Stormhawks vs. Tritons", line: "-2.5", total: "O/U 45.5", odds: "+110" },
    { teams: "Maelstrom FC vs. Gales", line: "+1.0", total: "O/U 2.5", odds: "-105" },
    { teams: "Thunder Bay vs. Tempests", line: "PK", total: "O/U 41.0", odds: "+125" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 font-semibold"><Zap className="w-5 h-5 text-cyan-300"/> Live Odds</div>
        <button className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20">Refresh</button>
      </div>
      <div className="divide-y divide-white/10">
        {rows.map((r, i) => (
          <div key={i} className="py-3 grid grid-cols-3 items-center">
            <div className="text-sm">{r.teams}</div>
            <div className="text-xs text-white/70">{r.line} • {r.total}</div>
            <div className="flex justify-end"><button className="text-xs px-3 py-1.5 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400">{r.odds}</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LogoMark({ small = false }) {
  return (
    <div className={`relative ${small ? "w-6 h-6" : "w-10 h-10"}`}>
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
  );
}

function LightningDeco() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="pointer-events-none absolute -right-6 -bottom-10 w-48 h-48 sm:w-64 sm:h-64 opacity-70">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#67e8f9"/>
            <stop offset="100%" stopColor="#ffffff"/>
          </linearGradient>
        </defs>
        <path d="M110 10 L40 110 L92 110 L70 190 L160 90 L108 90 Z" fill="url(#g)" opacity="0.9"/>
      </svg>
    </motion.div>
  );
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen w-full bg-[#06070A] text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-20 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(55,143,255,0.25),transparent_60%),radial-gradient(40%_30%_at_20%_80%,rgba(0,255,194,0.15),transparent_60%),radial-gradient(40%_30%_at_80%_70%,rgba(147,197,253,0.15),transparent_60%)]" />
      </div>
      <motion.div
        aria-hidden
        className="absolute inset-0 mix-blend-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.12, 0, 0.2, 0] }}
        transition={{ duration: 6, repeat: Infinity, repeatDelay: 4, times: [0, 0.05, 0.1, 0.12, 0.2] }}
        style={{ background: "radial-gradient(60% 60% at 70% 20%, rgba(255,255,255,0.35), rgba(255,255,255,0) 60%)" }}
      />
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:6px_6px]" />

      <header className="relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              <LogoMark />
              <div className="leading-none">
                <div className="text-xl font-black tracking-wider group-hover:text-cyan-300 transition-colors">WHALEJUICE</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">Ride the Storm</div>
              </div>
            </a>
            <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
              <a className="hover:text-white transition-colors" href="/event">Live</a>
              <a className="hover:text-white transition-colors" href="#vip">VIP</a>
              <a className="hover:text-white transition-colors" href="#security">Security</a>
            </nav>
            <div className="hidden md:flex items-center gap-3">
              <button className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition text-sm">Sign In</button>
              <button className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition text-sm shadow-[0_0_20px_rgba(34,211,238,0.4)]">Join the Surge</button>
            </div>
            <button className="md:hidden text-white/80" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <div className="w-6 h-0.5 bg-white mb-1"/><div className="w-6 h-0.5 bg-white mb-1"/><div className="w-6 h-0.5 bg-white"/>
            </button>
          </div>
          {menuOpen && (
            <div className="md:hidden mt-4 grid gap-2 text-sm text-white/80">
              <a className="px-3 py-2 rounded-lg bg-white/5" href="/event">Live</a>
              <a className="px-3 py-2 rounded-lg bg-white/5" href="#vip">VIP</a>
              <a className="px-3 py-2 rounded-lg bg-white/5" href="#security">Security</a>
              <div className="flex gap-2 pt-2">
                <button className="flex-1 px-4 py-2 rounded-xl bg-white/5">Sign In</button>
                <button className="flex-1 px-4 py-2 rounded-xl bg-cyan-500 text-black font-semibold">Join</button>
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
                Ride the <span className="text-cyan-300">Storm</span>. Bet like a <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">Whale</span>.
              </motion.h1>
              <p className="mt-5 text-white/80 max-w-xl">
                WhaleJuice is a next‑gen gaming brand with instant payouts, ironclad security, and VIP rewards that actually slap.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="/event" className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-base transition shadow-[0_0_30px_rgba(34,211,238,0.35)]">Enter Live Event</a>
                <a href="#vip" className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-base transition">Sportsbook</a>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-white/60">
                <div className="flex items-center gap-2"><Shield className="w-4 h-4"/> Provably Fair</div>
                <div className="flex items-center gap-2"><Zap className="w-4 h-4"/> Instant Payouts</div>
                <div className="flex items-center gap-2"><Headphones className="w-4 h-4"/> 24/7 Live Support</div>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-cyan-400/40 to-transparent blur-2xl"/>
              <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 lg:p-8 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-white/60">Trending Jackpots</div>
                  <div className="text-sm font-semibold text-cyan-300">$2,847,190</div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { icon: Dice1, label: "Lightning Dice", pot: "$183k" },
                    { icon: Coins, label: "Tempest Slots", pot: "$422k" },
                    { icon: Trophy, label: "Parlay Surge", pot: "$1.02m" },
                  ].map((g, i) => (
                    <motion.div key={i} whileHover={{ y: -4 }} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                      <g.icon className="w-6 h-6 text-cyan-300"/>
                      <div className="mt-3 font-semibold">{g.label}</div>
                      <div className="text-xs text-white/60">Pool {g.pot}</div>
                    </motion.div>
                  ))}
                </div>
                <a href="/event" className="mt-6 block text-center w-full px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-white text-black font-bold hover:from-cyan-400 hover:to-white/90 transition">Play Now</a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="security" className="relative z-10 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <FeatureCard icon={Shield} title="Bank‑Grade Security" text="Hardware keys, 2FA, and vault‑level cold storage for digital assets." />
            <FeatureCard icon={Zap} title="Instant Payouts" text="Blazing settlements with zero fluff — your wins, on demand." />
            <FeatureCard icon={Crown} title="Whale Lounge" text="Tiered VIP with rakeback, reloads, and invites to private tables." />
          </div>
        </div>
      </section>

      <section id="vip" className="relative z-10 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-cyan-400/10 p-8 lg:p-12">
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-2xl sm:text-3xl font-extrabold">Unlock the Whale Lounge</h3>
              <p className="mt-3 text-white/80">Custom limits, dedicated hosts, and experiences money normally can’t buy. If you play big, we roll out thunder.</p>
              <div className="mt-6 flex gap-3">
                <a href="/event" className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400">Apply for VIP</a>
                <button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20">View Rewards</button>
              </div>
            </div>
            <LightningDeco />
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid md:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="flex items-center gap-2"><LogoMark small /><span className="font-black">WhaleJuice</span></div>
              <p className="mt-3 text-white/60">© {new Date().getFullYear()} WhaleJuice. All rights reserved.</p>
            </div>
            <div>
              <div className="font-semibold mb-3">Products</div>
              <ul className="space-y-2 text-white/70">
                <li><a href="/event" className="hover:text-white">Casino</a></li>
                <li><a href="/event" className="hover:text-white">Sportsbook</a></li>
                <li><a href="/event" className="hover:text-white">VIP</a></li>
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
          <div className="mt-8 text-xs text-white/50">Demo only. No real money.</div>
        </div>
      </footer>
    </div>
  );
}
