'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const Ctx = createContext(null);
export function useSportsbook(){ return useContext(Ctx); }

const DEFAULTS = { oddsFormat: 'american', book: 'Any', favorites: {} };

function load(){ try { return { ...DEFAULTS, ...(JSON.parse(localStorage.getItem('wj:sportsbook'))||{}) }; } catch { return DEFAULTS; } }
function save(state){ try { localStorage.setItem('wj:sportsbook', JSON.stringify(state)); } catch {} }

export default function SportsbookProvider({ children }){
  const [oddsFormat, setOddsFormat] = useState('american');
  const [book, setBook] = useState('Any');
  const [favorites, setFavorites] = useState({});

  useEffect(()=>{
    const s = load();
    setOddsFormat(s.oddsFormat); setBook(s.book); setFavorites(s.favorites||{});
  },[]);

  useEffect(()=>{ save({ oddsFormat, book, favorites }); }, [oddsFormat, book, favorites]);

  const value = useMemo(()=>({
    oddsFormat, setOddsFormat,
    book, setBook,
    favorites, toggleFav: (id)=> setFavorites(f => ({...f, [id]: !f[id]})),
  }), [oddsFormat, book, favorites]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
