const HOST_PATHS = ['/api/odds/sports'];

export async function GET(){
  try {
    // Get sports list first
    const sportsRes = await fetch(HOST_PATHS[0], { cache: 'no-store' });
    const sportsJson = await sportsRes.json();
    const sports = (sportsJson.sports||[]).slice(0, 12); // cap for demo perf

    // Pull odds for each sport
    const results = await Promise.allSettled(sports.map(s =>
      fetch(`/api/odds/${encodeURIComponent(s.key)}`, { cache: 'no-store' })
        .then(r=>r.json().then(j=>({ok:r.ok,j,key:s.key,title:s.title})))
    ));

    const items = [];
    results.forEach(res => {
      const v = res?.value;
      if (!v?.ok) return;
      const events = v.j.events||[];
      events.forEach(e=>{
        const label = `${e.away_team} @ ${e.home_team}`;
        // index moneyline outcomes
        (e.h2h?.outcomes||[]).slice(0,2).forEach((o,i)=>{
          items.push({
            id: `${e.id}-h2h-${i}`,
            sport: v.title,
            gameId: e.id,
            gameLabel: label,
            market: 'Moneyline',
            outcome: o.name,
            price: o.price,
          });
        });
      });
    });

    return Response.json({ items, ts: new Date().toISOString() });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
