export const revalidate = 120; // 2m
// Simple demo promos; in a real setup you'd compute deltas vs baseline odds.
export async function GET(){
  const promos = [
    { id:'boost-ml-1', title:'Surge • Moneyline Double', desc:'NBA favorites tonight', boost:'+35%', cta:'Add SGP (demo)' },
    { id:'boost-parlay-1', title:'Parlay Power Hour', desc:'Any 3-leg across sports', boost:'+20%', cta:'Start Parlay' },
    { id:'boost-td-1', title:'Anytime TD Flash', desc:'NFL primetime', boost:'+50%', cta:'See Markets' },
  ];
  return Response.json({ promos, ts: new Date().toISOString() });
}
