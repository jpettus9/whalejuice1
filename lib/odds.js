export const SPORT_SLUGS = [
  { slug: "nfl", name: "Football", key: "americanfootball_nfl" },
  { slug: "nba", name: "Basketball", key: "basketball_nba" },
  { slug: "mlb", name: "Baseball", key: "baseball_mlb" },
  { slug: "nhl", name: "Hockey", key: "icehockey_nhl" },
];

export function american(odds) {
  if (odds === null || odds === undefined) return "--";
  return Number(odds) > 0 ? `+${odds}` : `${odds}`;
}

export function toDecimal(a){
  const n = Number(a);
  if (isNaN(n)) return null;
  return n > 0 ? 1 + n/100 : 1 + 100/Math.abs(n);
}
export function toFractional(a){
  const d = toDecimal(a);
  if (d==null) return null;
  const num = Math.round((d-1)*100);
  const den = 100;
  function gcd(x,y){ return y ? gcd(y, x%y) : x; }
  const g = gcd(num, den);
  return `${num/g}/${den/g}`;
}
export function formatOdds(a, fmt='american'){
  if (fmt==='american') return american(a);
  if (fmt==='decimal') return toDecimal(a)?.toFixed(2);
  if (fmt==='fractional') return toFractional(a);
  return american(a);
}

export function niceTime(iso) {
  try { return new Date(iso).toLocaleString(); } catch { return iso; }
}
