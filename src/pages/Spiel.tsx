import { useState, useEffect, useRef } from 'react';
import { Gamepad2, Coins } from 'lucide-react';
import { useCoins } from '../context/CoinContext';

const KICKS_PER_MINUTE = 5;
const COINS_PER_GOAL = 10;

const CELL_LABELS = ['Oben Links', 'Oben Mitte', 'Oben Rechts', 'Mitte Links', 'Mitte', 'Mitte Rechts', 'Unten Links', 'Unten Mitte', 'Unten Rechts'];

export default function Spiel() {
  const { state, dispatch } = useCoins();
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [blockedCell, setBlockedCell] = useState<number | null>(null);
  const [result, setResult] = useState<'goal' | 'saved' | null>(null);
  const [goals, setGoals] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [kicked, setKicked] = useState(false);
  const [kickTimes, setKickTimes] = useState<number[]>([]);
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      cooldownRef.current = setInterval(() => {
        setCooldown(prev => {
          if (prev <= 1) {
            if (cooldownRef.current) clearInterval(cooldownRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (cooldownRef.current) clearInterval(cooldownRef.current); };
  }, [cooldown]);

  function canKick(): boolean {
    const now = Date.now();
    const oneMinuteAgo = now - 60 * 1000;
    const recentKicks = kickTimes.filter(t => t > oneMinuteAgo);
    return recentKicks.length < KICKS_PER_MINUTE;
  }

  function getSecondsUntilNextKick(): number {
    const now = Date.now();
    const oneMinuteAgo = now - 60 * 1000;
    const recentKicks = kickTimes.filter(t => t > oneMinuteAgo).sort();
    if (recentKicks.length < KICKS_PER_MINUTE) return 0;
    const oldest = recentKicks[0];
    return Math.ceil((oldest + 60 * 1000 - now) / 1000);
  }

  function handleShoot() {
    if (selectedCell === null || kicked) return;
    if (!canKick()) {
      const secs = getSecondsUntilNextKick();
      setCooldown(secs);
      return;
    }

    const now = Date.now();
    const oneMinuteAgo = now - 60 * 1000;
    const recentKicks = kickTimes.filter(t => t > oneMinuteAgo);
    const newKickTimes = [...recentKicks, now];
    setKickTimes(newKickTimes);

    const goalie = Math.floor(Math.random() * 9);
    setBlockedCell(goalie);
    setKicked(true);
    setAttempts(prev => prev + 1);

    if (goalie !== selectedCell) {
      setResult('goal');
      setGoals(prev => prev + 1);
      dispatch({ type: 'ADD_COINS', amount: COINS_PER_GOAL });
    } else {
      setResult('saved');
    }
  }

  function handleReset() {
    setSelectedCell(null);
    setBlockedCell(null);
    setResult(null);
    setKicked(false);
  }

  const secs = !canKick() ? getSecondsUntilNextKick() : 0;

  return (
    <div className="max-w-lg mx-auto px-4 pb-safe-nav md:pb-8 pt-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#6c63ff]/20 border border-[#6c63ff]/30 flex items-center justify-center">
          <Gamepad2 size={20} className="text-[#6c63ff]" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">Torschuss-Spiel</h1>
          <p className="text-slate-500 text-sm">Schieße ins Tor und verdiene Münzen!</p>
        </div>
      </div>

      {/* Coin balance + score */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-[#12121a] border border-[#22223a] rounded-xl p-3 text-center">
          <p className="text-amber-400 font-bold text-lg flex items-center justify-center gap-1">
            🪙 {state.coins}
          </p>
          <p className="text-slate-500 text-xs">Münzen</p>
        </div>
        <div className="bg-[#12121a] border border-[#22223a] rounded-xl p-3 text-center">
          <p className="text-green-400 font-bold text-lg">{goals}</p>
          <p className="text-slate-500 text-xs">Tore</p>
        </div>
        <div className="bg-[#12121a] border border-[#22223a] rounded-xl p-3 text-center">
          <p className="text-white font-bold text-lg">{attempts}</p>
          <p className="text-slate-500 text-xs">Versuche</p>
        </div>
      </div>

      {/* Result message */}
      {result && (
        <div className={`mb-6 rounded-2xl p-4 text-center border ${result === 'goal' ? 'bg-green-500/20 border-green-500/30' : 'bg-red-500/20 border-red-500/30'}`}>
          {result === 'goal' ? (
            <>
              <p className="text-4xl mb-2">⚽</p>
              <p className="text-green-400 font-black text-xl">TOR!</p>
              <p className="text-slate-300 text-sm mt-1">+{COINS_PER_GOAL} Münzen verdient!</p>
            </>
          ) : (
            <>
              <p className="text-4xl mb-2">🧤</p>
              <p className="text-red-400 font-black text-xl">GEHALTEN!</p>
              <p className="text-slate-300 text-sm mt-1">Der Torwart hat gehalten.</p>
            </>
          )}
        </div>
      )}

      {/* Cooldown warning */}
      {secs > 0 && (
        <div className="mb-6 rounded-2xl bg-amber-500/20 border border-amber-500/30 p-4 text-center">
          <p className="text-amber-400 font-bold">⏱ Limit erreicht!</p>
          <p className="text-slate-300 text-sm mt-1">Warte noch <span className="text-amber-400 font-bold">{cooldown || secs}s</span></p>
        </div>
      )}

      {/* Goal SVG - 3x3 grid */}
      <div className="bg-[#12121a] border border-[#22223a] rounded-2xl p-6 mb-6">
        <p className="text-slate-400 text-sm text-center mb-4">
          {kicked ? 'Ergebnis:' : selectedCell !== null ? `Ziel: ${CELL_LABELS[selectedCell]}` : 'Wähle eine Ecke aus:'}
        </p>

        {/* Goal posts */}
        <div className="relative mb-2">
          <div className="h-2 bg-white/20 rounded-t-lg w-full" />
        </div>
        <div className="flex gap-1 mb-2">
          <div className="w-2 bg-white/20 rounded-l-lg" style={{ height: '168px' }} />
          <div className="grid grid-cols-3 gap-1 flex-1" style={{ height: '168px' }}>
            {Array.from({ length: 9 }, (_, i) => {
              const isSelected = selectedCell === i;
              const isBlocked = blockedCell === i;
              const isShot = kicked && selectedCell === i;
              let cellClass = 'rounded-lg border cursor-pointer transition-all duration-200 flex items-center justify-center text-2xl ';

              if (!kicked) {
                cellClass += isSelected
                  ? 'bg-[#6c63ff]/40 border-[#6c63ff] scale-105'
                  : 'bg-[#1a1a27] border-[#22223a] hover:bg-[#6c63ff]/20 hover:border-[#6c63ff]/50 hover:scale-105';
              } else {
                if (isBlocked && isShot) {
                  cellClass += 'bg-red-500/30 border-red-500';
                } else if (isBlocked) {
                  cellClass += 'bg-red-500/20 border-red-500/50';
                } else if (isShot) {
                  cellClass += 'bg-green-500/30 border-green-500';
                } else {
                  cellClass += 'bg-[#1a1a27] border-[#22223a]';
                }
              }

              return (
                <button
                  key={i}
                  className={cellClass}
                  onClick={() => !kicked && setSelectedCell(i)}
                  aria-label={CELL_LABELS[i]}
                  disabled={kicked}
                >
                  {kicked && isBlocked && isShot ? '❌' : kicked && isBlocked ? '🧤' : kicked && isShot ? '⚽' : isSelected ? '🎯' : ''}
                </button>
              );
            })}
          </div>
          <div className="w-2 bg-white/20 rounded-r-lg" style={{ height: '168px' }} />
        </div>
        <div className="h-2 bg-[#0a0a10] rounded-sm w-full" />
        <p className="text-center text-slate-600 text-xs mt-2">⬆ Tor</p>
      </div>

      {/* Action buttons */}
      {!kicked ? (
        <button
          onClick={handleShoot}
          disabled={selectedCell === null || secs > 0}
          className="w-full py-4 rounded-xl font-black text-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-[#6c63ff] hover:bg-[#5a52e8] active:scale-95 text-white shadow-lg shadow-[#6c63ff]/20"
        >
          {secs > 0 ? `⏱ Warte ${cooldown || secs}s` : selectedCell === null ? 'Wähle eine Ecke' : '⚽ Schießen!'}
        </button>
      ) : (
        <button
          onClick={handleReset}
          className="w-full py-4 rounded-xl font-black text-lg transition-all duration-200 bg-[#1a1a27] hover:bg-[#22223a] active:scale-95 text-white border border-[#22223a]"
        >
          🔄 Nochmal schießen
        </button>
      )}

      {/* Info */}
      <div className="mt-4 text-center">
        <p className="text-slate-600 text-xs flex items-center justify-center gap-1">
          <Coins size={12} />
          Tor = +{COINS_PER_GOAL} Münzen · Max. {KICKS_PER_MINUTE} Schüsse / Minute
        </p>
      </div>
    </div>
  );
}
