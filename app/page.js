'use client';
import { motion } from 'framer-motion';
import { Shield, Zap, Headphones, Crown, Coins, Dice1, Trophy } from 'lucide-react';
import Button from '../components/ui/Button'; import Card from '../components/ui/Card';

function FeatureCard({ icon: Icon, title, text }){
  return (
    <motion.div whileHover={{ y: -6 }} className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <Icon className="w-6 h-6 text-cyan-300" />
      <div className="mt-3 font-semibold text-lg">{title}</div>
      <p className="text-white/70 text-sm">{text}</p>
    </motion.div>
  );
}

export default function Page(){
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -inset-20 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(55,143,255,0.25),transparent_60%),radial-gradient(40%_30%_at_20%_80%,rgba(0,255,194,0.15),transparent_60%),radial-gradient(40%_30%_at_80%_70%,rgba(147,197,253,0.15),transparent_60%)]" />
      </div>
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-black leading-tight">Ride the <span className="text-cyan-300">Storm</span>. Bet like a <span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">Whale</span>.</h1>
              <p className="mt-5 text-white/80 max-w-xl">A next-gen sportsbook + casino vibe for your crew. No KYC, no nags, just badass UI and fake bankrolls.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href="/sports" className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-base transition shadow-[0_0_30px_rgba(34,211,238,0.35)]">Enter Sportsbook</a>
                <a href="/casino" className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-base transition">Open Casino</a>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-white/60">
                <div className="flex items-center gap-2"><Shield className="w-4 h-4"/> Provably Fair</div>
                <div className="flex items-center gap-2"><Zap className="w-4 h-4"/> Instant Payouts</div>
                <div className="flex items-center gap-2"><Headphones className="w-4 h-4"/> 24/7 Live Support</div>
              </div>
            </div>
            <div className="relative">
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
                    <Card key={i}><g.icon className="w-6 h-6 text-cyan-300"/><div className="mt-3 font-semibold">{g.label}</div><div className="text-xs text-white/60">Pool {g.pot}</div></Card>
                  ))}
                </div>
                <a href="/event" className="mt-6 block text-center w-full px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-white text-black font-bold">Play Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-10 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <FeatureCard icon={Shield} title="Bank-Grade Security" text="Hardware keys, 2FA, and vault-level cold storage for digital assets." />
            <FeatureCard icon={Zap} title="Instant Payouts" text="Blazing settlements with zero fluff — your wins, on demand." />
            <FeatureCard icon={Crown} title="Whale Lounge" text="Tiered VIP with rakeback, reloads, and invites to private tables." />
          </div>
        </div>
      </section>
    </div>
  );
}
