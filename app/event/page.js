
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Flame, Plus, Minus, X, Trophy, CloudLightning, Waves, ArrowRight, Clock } from "lucide-react";

export default function WhaleJuiceEventPage() {
  const [bankroll, setBankroll] = useState(10000);
  const [betslip, setBetslip] = useState([]);
  const [sgpLegs, setSgpLegs] = useState([]);
  const [flash, setFlash] = useState(false);
  const [rain, setRain] = useState(true);

  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((n) => n + 1), 3500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() > 0.7) {
        setFlash(true);
        setTimeout(() => setFlash(false), 180);
      }
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const base = useMemo(() => ({
    home: { name: "Tempest City", abbr: "TMC" },
    away: { name: "Thunder Bay", abbr: "TBY" },
    sport: "Football",
    period: "Q3 06:24",
    score: { home: 17, away: 20 },
  }), []);

  function nudge(num, maxDelta = 20) {
    return (num + Math.round((Math.random() * maxDelta - maxDelta / 2))) / 100;
  }

  const markets = useMemo(() => {
    const mlHome = +((Math.random() * 200 - 100)).toFixed(0);
    const mlAway = -mlHome + Math.round(Math.random() * 30 - 15);
    const spread = (Math.random() * 6 - 3).toFixed(1);
    const total = (44 + nudge(0, 200)).toFixed(1);

    const makeOdds = (o) => (o > 0 ? `+${o}` : `${o}`);

    return {
      moneyline: [
        { id: `ml-h-${tick}`, label: `${base.home.abbr} Moneyline`, odds: makeOdds(mlHome) },
        { id: `ml-a-${tick}`, label: `${base.away.abbr} Moneyline`, odds: makeOdds(mlAway) },
      ],
      spread: [
        { id: `sp-h-${tick}`, label: `${base.home.abbr} ${spread}`, odds: makeOdds(mlAway - 20) },
        { id: `sp-a-${tick}`, label: `${base.away.abbr} ${(-spread).toFixed(1)}`, odds: makeOdds(mlHome - 20) },
      ],
      total: [
        { id: `tot-o-${tick}`, label: `Over ${total}`, odds: makeOdds(mlHome - 10) },
        { id: `tot-u-${tick}`, label: `Under ${total}`, odds: makeOdds(mlAway - 10) },
      ],
      micro: [
        { id: `nxt-td-${tick}`, label: "Next Play: Touchdown", odds: makeOdds(350) },
        { id: `nxt-fg-${tick}`, label: "Next Play: Field Goal", odds: makeOdds(220) },
        { id: `nxt-to-${tick}`, label: "Next Play: Turnover", odds: makeOdds(480) },
      ],
      props: [
        { id: `qb-h-${tick}`, label: "Home QB Over 1.5 TD", odds: makeOdds(110) },
        { id: `rb-a-${tick}`, label: "Away RB Over 74.5 Rush", odds: makeOdds(-105) },
        { id: `wr-h-${tick}`, label: "Home WR Over 5.5 Rec", odds: makeOdds(125) },
      ],
    };
  }, [tick, base]);

  const momentum = useMemo(() => {
    const swing = Math.sin(tick / 2) * 60 + (base.score.home - base.score.away) * 5;
    return Math.max(-100, Math.min(100, swing));
  }, [tick, base]);

  function addToSlip(sel, type = "single") {
    setBetslip((s) => (s.find((x) => x.id === sel.id) ? s : [...s, { ...sel, type, stake: 25 }]));
  }
  function addLeg(sel) { setSgpLegs((s) => (s.find((x) => x.id === sel.id) ? s : [...s, sel])); }
  function removeFromSlip(id) { setBetslip((s) => s.filter((x) => x.id !== id)); }
  function removeLeg(id) { setSgpLegs((s) => s.filter((x) => x.id !== id)); }

  const sgpPrice = useMemo(() => {
    if (!sgpLegs.length) return 0;
    const decimals = sgpLegs.map((l) => americanToDecimal(l.odds));
    const decimal = decimals.reduce((a, b) => a * b, 1);
    return decimalToAmerican(decimal - 1);
  }, [sgpLegs]);

  function americanToDecimal(a) {
    const n = parseInt(String(a));
    if (n > 0) return 1 + n / 100;
    return 1 + 100 / Math.abs(n);
  }
  function decimalToAmerican(d) {
    if (d >= 2) return "+" + Math.round((d - 1) * 100);
    return "-" + Math.round(100 / (d - 1));
  }

  function settleCashout(idx) {
    const win = Math.random() > 0.5;
    const sel = betslip[idx];
    const stake = sel.stake || 0;
    const payout = win ? Math.round(stake * americanToDecimal(sel.odds)) : 0;
    setBankroll((b) => b - stake + payout);
    setBetslip((s) => s.filter((_, i) => i !== idx));
    setFlash(true); setTimeout(() => setFlash(false), 160);
  }

  return (
    <div className="min-h-screen bg-[#06070A] text-white relative overflow-hidden">
      <StormBackdrop flash={flash} rain={rain} setRain={setRain} />

      <div className="relative z-20 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LogoMark />
            <div>
              <div className="text-xs text-white/60">Football • Live</div>
              <div className="font-bold">Thunder Bay @ Tempest City</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-sm"><span className="text-white/60">Bankroll:</span> <span className="font-semibold">${bankroll.toLocaleString()}</span></div>
            <button onClick={() => setBankroll((b)=>b+1000)} className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20">+ Add 1,000</button>
          </div>
        </div>
      </div>

      <div className="relative z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="text-white/60 text-sm">Q3 06:24</div>
              <div className="flex items-center gap-2 text-white/60 text-sm"><Clock className="w-4 h-4"/> Live markets update every few seconds</div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <TeamBadge name="Thunder Bay" abbr="TBY" score={20} right />
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs"><Flame className="w-4 h-4 text-cyan-300"/> Hot streak detected</div>
              <TeamBadge name="Tempest City" abbr="TMC" score={17} />
            </div>

            <div className="mt-5 h-3 rounded-full bg-white/10 overflow-hidden relative">
              <div className="absolute inset-0 [background:linear-gradient(90deg,transparent,rgba(103,232,249,0.2),transparent)] animate-pulse" />
              <motion.div
                className="h-full bg-cyan-400"
                initial={{ width: "50%" }}
                animate={{ width: `${50 + momentum/2}%` }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
              />
            </div>

            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <div className="flex items-center gap-2 px-3 py-2 text-xs bg-white/5 border-b border-white/10"><CloudLightning className="w-4 h-4 text-cyan-300"/> Live Odds</div>
              <TickerRow items={[...markets.moneyline, ...markets.spread, ...markets.total].map(m=>`${m.label}: ${m.odds}`)} />
            </div>
          </div>

          <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Bet Slip</div>
              <div className="text-xs text-white/60">Fake mode</div>
            </div>
            <div className="mt-3 space-y-3 max-h-[340px] overflow-auto pr-1">
              <AnimatePresence initial={false}>
                {betslip.map((b, i) => (
                  <motion.div key={b.id} layout initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-semibold">{b.label}</div>
                        <div className="text-xs text-white/60">Odds {b.odds}</div>
                      </div>
                      <button onClick={()=>removeFromSlip(b.id)} className="text-white/60 hover:text-white"><X className="w-4 h-4"/></button>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={()=>setBetslip(s=>s.map((x)=>x.id===b.id?{...x,stake:Math.max(1,(x.stake||0)-5)}:x))} className="px-2 py-1 rounded-lg bg-white/10"><Minus className="w-3 h-3"/></button>
                      <input value={b.stake||0} onChange={(e)=>setBetslip(s=>s.map((x)=>x.id===b.id?{...x,stake:+e.target.value||0}:x))} className="w-16 text-center bg-transparent border border-white/10 rounded-lg text-sm py-1"/>
                      <button onClick={()=>setBetslip(s=>s.map((x)=>x.id===b.id?{...x,stake:(x.stake||0)+5}:x))} className="px-2 py-1 rounded-lg bg-white/10"><Plus className="w-3 h-3"/></button>
                      <div className="ml-auto text-xs text-white/60">Payout: ${Math.round((b.stake||0)*americanToDecimal(b.odds)).toLocaleString()}</div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <button onClick={()=>settleCashout(i)} className="flex-1 px-3 py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 flex items-center justify-center gap-2"><Zap className="w-4 h-4"/> Cash Out</button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {!betslip.length && (
                <div className="text-sm text-white/60">No selections yet. Tap odds to add picks.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MarketBlock title="Moneyline" items={markets.moneyline} onSelect={(s)=>addToSlip(s)} onLeg={(s)=>addLeg(s)} />
            <MarketBlock title="Spread" items={markets.spread} onSelect={(s)=>addToSlip(s)} onLeg={(s)=>addLeg(s)} />
            <MarketBlock title="Total" items={markets.total} onSelect={(s)=>addToSlip(s)} onLeg={(s)=>addLeg(s)} />
            <MarketBlock title="Player Props" items={markets.props} onSelect={(s)=>addToSlip(s)} onLeg={(s)=>addLeg(s)} />
            <MarketBlock title="Micro Markets" items={markets.micro} onSelect={(s)=>addToSlip(s)} onLeg={(s)=>addLeg(s)} micro />
          </div>

          <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="font-semibold flex items-center gap-2"><Waves className="w-5 h-5 text-cyan-300"/> Same‑Game Parlay</div>
              <button onClick={()=>setSgpLegs([])} className="text-xs text-white/60 hover:text-white">Clear</button>
            </div>
            <div className="mt-3 space-y-2 max-h-[360px] overflow-auto pr-1">
              {sgpLegs.map((l)=> (
                <div key={l.id} className="rounded-lg border border-white/10 bg-white/5 p-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold">{l.label}</div>
                    <div className="text-xs text-white/60">{l.odds}</div>
                  </div>
                  <button onClick={()=>removeLeg(l.id)} className="text-white/60 hover:text-white"><X className="w-4 h-4"/></button>
                </div>
              ))}
              {!sgpLegs.length && <div className="text-sm text-white/60">Add legs using the “+ Leg” buttons.</div>}
            </div>
            <div className="mt-4 p-3 rounded-xl border border-white/10 bg-white/5">
              <div className="text-xs text-white/60">Combined Odds</div>
              <div className="text-xl font-extrabold">{sgpLegs.length? (sgpPrice>0?`+${sgpPrice}`:sgpPrice) : "—"}</div>
              <button disabled={!sgpLegs.length} onClick={()=>{
                const id = `sgp-${Date.now()}`;
                setBetslip((s)=>[...s, { id, label: `SGP (${sgpLegs.length} legs)`, odds: (sgpPrice>0?`+${sgpPrice}`:String(sgpPrice)), stake: 50, type: "parlay" }]);
                setSgpLegs([]);
              }} className="mt-3 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-white text-black font-bold disabled:opacity-40 flex items-center justify-center gap-2">Add to Bet Slip <ArrowRight className="w-4 h-4"/></button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2"><Trophy className="w-4 h-4 text-cyan-300"/> Demo only — no real money.</div>
          <div className="text-white/60">© {new Date().getFullYear()} WhaleJuice</div>
        </div>
      </div>
    </div>
  );
}

function MarketBlock({ title, items, onSelect, onLeg, micro=false }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between">
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-white/60">Tap price to add • + Leg to parlay</div>
      </div>
      <div className="mt-3 grid md:grid-cols-3 gap-3">
        {items.map((it)=> (
          <motion.div key={it.id} whileHover={{ y:-3 }} className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-sm">{it.label}</div>
            <div className="mt-2 flex items-center gap-2">
              <button onClick={()=>onSelect(it)} className="flex-1 px-3 py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400">{it.odds}</button>
              <button onClick={()=>onLeg(it)} className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20"><Plus className="w-4 h-4"/></button>
            </div>
            {micro && (<div className="mt-2 text-[11px] text-white/50">Settles in ~30s • ultra‑volatile</div>)}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TickerRow({ items }) {
  const ref = useRef(null);
  return (
    <div className="relative overflow-hidden">
      <motion.div
        ref={ref}
        className="whitespace-nowrap py-2 text-sm"
        animate={{ x: [0, -800] }}
        transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
      >
        {items.concat(items).map((t, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-6 text-white/80"><span className="text-white/40">•</span> {t}</span>
        ))}
      </motion.div>
    </div>
  );
}

function TeamBadge({ name, abbr, score, right=false }) {
  return (
    <div className={`flex items-center gap-3 ${right?"flex-row-reverse":""}`}>
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-white/10 border border-white/10 grid place-items-center font-black">{abbr}</div>
      <div>
        <div className="text-sm text-white/60">{name}</div>
        <div className="text-2xl font-extrabold">{score}</div>
      </div>
    </div>
  );
}

function StormBackdrop({ flash, rain, setRain }) {
  return (
    <div className="absolute inset-0 -z-0">
      <div className="absolute -inset-24 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(55,143,255,0.25),transparent_60%),radial-gradient(40%_30%_at_20%_80%,rgba(0,255,194,0.12),transparent_60%),radial-gradient(40%_30%_at_80%_70%,rgba(147,197,253,0.1),transparent_60%)]" />
      <AnimatePresence>
        {flash && (
          <motion.div
            key="flash"
            className="absolute inset-0 mix-blend-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.22 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            style={{ background: "radial-gradient(60% 60% at 70% 20%, rgba(255,255,255,0.6), rgba(255,255,255,0) 60%)" }}
          />
        )}
      </AnimatePresence>
      {rain && (
        <div className="pointer-events-none absolute inset-0 opacity-25" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "2px 16px, 2px 16px",
          transform: "skewY(-12deg)"
        }} />
      )}
      <div className="absolute right-3 top-3 z-50 text-xs">
        <button onClick={()=>setRain((r)=>!r)} className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 flex items-center gap-1"><CloudLightning className="w-3 h-3"/> Rain {rain?"On":"Off"}</button>
      </div>
    </div>
  );
}

function LogoMark() {
  return (
    <div className="relative w-9 h-9">
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
