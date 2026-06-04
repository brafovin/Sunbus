import { useState, useEffect, useRef } from 'react';
import { Tv, Send, Play, Pause, Volume2, VolumeX, Maximize2, Radio } from 'lucide-react';
import { useCoins } from '../context/CoinContext';
import { matches } from '../data/matches';

const FAKE_USERS = ['MaxFan', 'SportKing', 'GoalHunter', 'BayernFan', 'BVBler', 'TorJäger', 'UltraKurve'];
const FAKE_MESSAGES = [
  'Wahnsinn! 🔥', 'Was für ein Tor!', 'Come on Bayern!', 'Der Schiedsrichter ist blind!',
  'Unglaublich! 😱', 'BVB kämpft zurück! 💪', 'Das war Abseits!!!', 'Hammer Freistoß!',
  'Keeper hält alles heute 🧤', 'Wir brauchen ein Tor!', 'TOOOOR!!! 🎉',
  'Gänsehaut pur! ❤️', 'Super Flanke! ⚽', 'Weltklasse Aktion!', 'Nicht aufzuhalten!',
];

interface ChatMessage { id: number; user: string; text: string; time: string; isMe: boolean; }
interface FloatingEmoji { id: number; emoji: string; x: number; }
let mid = 1; let fid = 1;
function fmt(d: Date) { return d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }); }

function LivePlayer({ match, playing }: { match: typeof matches[0]; playing: boolean }) {
  const [ball, setBall] = useState({ x: 50, y: 50, vx: 1.2, vy: 0.8 });
  const [players] = useState(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i, team: i < 7 ? 0 : 1,
      bx: 15 + Math.random() * 70, by: 10 + Math.random() * 80,
      dx: (Math.random() - 0.5) * 0.3, dy: (Math.random() - 0.5) * 0.3,
    }))
  );
  const [ppos, setPpos] = useState(() => players.map(p => ({ x: p.bx, y: p.by, dx: p.dx, dy: p.dy })));
  const [homeScore, setHomeScore] = useState(match.homeScore ?? 0);
  const [awayScore, setAwayScore] = useState(match.awayScore ?? 0);
  const [minute, setMinute] = useState(match.minute ?? 1);
  const [goalEvent, setGoalEvent] = useState('');
  const rafRef = useRef<number>(0);
  const frame = useRef(0);

  useEffect(() => {
    setHomeScore(match.homeScore ?? 0);
    setAwayScore(match.awayScore ?? 0);
    setMinute(match.minute ?? 1);
  }, [match.id]);

  useEffect(() => {
    if (!playing) { cancelAnimationFrame(rafRef.current); return; }
    function tick() {
      frame.current++;
      setBall(prev => {
        let { x, y, vx, vy } = prev;
        x += vx; y += vy;
        if (x < 3 || x > 97) vx = -vx;
        if (y < 3 || y > 97) vy = -vy;
        if (Math.random() < 0.02) { vx += (Math.random() - 0.5) * 0.5; vy += (Math.random() - 0.5) * 0.5; }
        vx = Math.max(-2.5, Math.min(2.5, vx));
        vy = Math.max(-2.5, Math.min(2.5, vy));
        return { x, y, vx, vy };
      });
      setPpos(prev => prev.map(p => {
        let { x, y, dx, dy } = p;
        x += dx + (Math.random() - 0.5) * 0.2;
        y += dy + (Math.random() - 0.5) * 0.2;
        if (x < 5 || x > 95) { dx = -dx; x = Math.max(5, Math.min(95, x)); }
        if (y < 5 || y > 95) { dy = -dy; y = Math.max(5, Math.min(95, y)); }
        return { x, y, dx, dy };
      }));
      if (frame.current % 60 === 0) setMinute(m => Math.min(90, m + 1));
      if (frame.current % 1800 === 0 && Math.random() < 0.4) {
        const isHome = Math.random() > 0.5;
        if (isHome) setHomeScore(s => s + 1); else setAwayScore(s => s + 1);
        const scorer = ['Müller', 'Messi', 'Kane', 'Mbappé', 'Haaland', 'Salah'][Math.floor(Math.random() * 6)];
        setGoalEvent(`⚽ TOR! ${scorer}`);
        setTimeout(() => setGoalEvent(''), 3500);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingBottom: '56.25%' }}>
      <div className="absolute inset-0 overflow-hidden" style={{ background: '#1a5c1a' }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={0} y={i * 10} width={100} height={10} fill={i % 2 === 0 ? '#1a5c1a' : '#1a4a1a'} />
          ))}
          <rect x="3" y="3" width="94" height="94" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="0.5" />
          <line x1="50" y1="3" x2="50" y2="97" stroke="rgba(255,255,255,0.45)" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="12" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="0.8" fill="rgba(255,255,255,0.6)" />
          <rect x="3" y="28" width="15" height="44" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="0.4" />
          <rect x="82" y="28" width="15" height="44" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="0.4" />
          <rect x="0.5" y="42" width="2.5" height="16" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="0.6" />
          <rect x="97" y="42" width="2.5" height="16" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="0.6" />
          {ppos.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="2.5" fill={players[i].team === 0 ? '#ef4444' : '#3b82f6'} stroke="white" strokeWidth="0.5" />
            </g>
          ))}
          <circle cx={ball.x} cy={ball.y} r="1.8" fill="white" filter="url(#shadow)" />
          <defs>
            <filter id="shadow"><feDropShadow dx="0" dy="0" stdDeviation="1" floodOpacity="0.4" /></filter>
          </defs>
        </svg>

        {/* Score bar */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-xl px-4 py-1.5 flex items-center gap-3 z-10 whitespace-nowrap">
          <span className="text-white font-bold text-sm">{match.homeTeam.emoji} {match.homeTeam.shortName}</span>
          <span className="text-white font-black text-xl tabular-nums">{homeScore} – {awayScore}</span>
          <span className="text-white font-bold text-sm">{match.awayTeam.shortName} {match.awayTeam.emoji}</span>
        </div>

        {/* Live + minute */}
        <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 z-10">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse inline-block" />
          {minute}'
        </div>

        {/* Goal popup */}
        {goalEvent && (
          <div className="absolute inset-x-0 top-16 flex justify-center z-20">
            <div className="bg-yellow-400 text-black font-black text-lg px-6 py-3 rounded-2xl shadow-2xl animate-bounce">
              {goalEvent}
            </div>
          </div>
        )}

        {/* Paused overlay */}
        {!playing && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 rounded-2xl">
            <div className="text-white text-center">
              <Play size={56} className="mx-auto mb-2 opacity-80" />
              <p className="text-sm opacity-70">Drücke Play zum Weiterschauen</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LiveAnsehen() {
  const { state, dispatch } = useCoins();
  const liveMatches = matches.filter(m => m.status === 'live');
  const [selectedMatch, setSelectedMatch] = useState(liveMatches[0] ?? null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: mid++, user: 'SportKing', text: 'Hey Leute! Bereit fürs Spiel? 🔥', time: fmt(new Date()), isMe: false },
    { id: mid++, user: 'MaxFan', text: 'Jaaaa! Heute wird gewonnen!', time: fmt(new Date()), isMe: false },
  ]);
  const [inputText, setInputText] = useState('');
  const [emojiCounts, setEmojiCounts] = useState<Record<string, number>>({});
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    function next() {
      t = setTimeout(() => {
        const user = FAKE_USERS[Math.floor(Math.random() * FAKE_USERS.length)];
        const text = FAKE_MESSAGES[Math.floor(Math.random() * FAKE_MESSAGES.length)];
        setMessages(prev => [...prev.slice(-60), { id: mid++, user, text, time: fmt(new Date()), isMe: false }]);
        next();
      }, 3000 + Math.random() * 3000);
    }
    next();
    return () => clearTimeout(t);
  }, []);

  function handleSend() {
    const text = inputText.trim();
    if (!text) return;
    setMessages(prev => [...prev, { id: mid++, user: 'Du', text, time: fmt(new Date()), isMe: true }]);
    setInputText('');
    dispatch({ type: 'ADD_COINS', amount: 2 });
    inputRef.current?.focus();
  }

  function handleEmojiReaction(emoji: string) {
    setEmojiCounts(prev => ({ ...prev, [emoji]: (prev[emoji] ?? 0) + 1 }));
    const id = fid++;
    setFloatingEmojis(prev => [...prev, { id, emoji, x: 10 + Math.random() * 80 }]);
    setTimeout(() => setFloatingEmojis(prev => prev.filter(f => f.id !== id)), 1200);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-safe-nav md:pb-8 pt-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#6c63ff]/20 border border-[#6c63ff]/30 flex items-center justify-center">
          <Tv size={20} className="text-[#6c63ff]" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">Live ansehen</h1>
          <p className="text-slate-500 text-sm">Wähle ein Spiel und schaue live zu</p>
        </div>
        <div className="ml-auto text-amber-400 font-bold text-sm">🪙 {state.coins}</div>
      </div>

      {/* Match selector */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {liveMatches.map(m => (
          <button key={m.id} onClick={() => setSelectedMatch(m)}
            className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold transition-all ${
              selectedMatch?.id === m.id
                ? 'bg-red-500/20 border-red-500/50 text-white'
                : 'bg-[#12121a] border-[#22223a] text-slate-400 hover:border-red-500/30'
            }`}>
            <Radio size={12} className="text-red-400 animate-pulse flex-shrink-0" />
            <span>{m.homeTeam.emoji} {m.homeTeam.shortName}</span>
            <span className="font-black text-white">{m.homeScore}–{m.awayScore}</span>
            <span>{m.awayTeam.shortName} {m.awayTeam.emoji}</span>
            <span className="text-[10px] text-slate-500">{m.minute}'</span>
          </button>
        ))}
        {liveMatches.length === 0 && <p className="text-slate-600 text-sm py-2">Keine Live-Spiele gerade</p>}
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Player + reactions */}
        <div className="flex-1 min-w-0">
          {selectedMatch ? (
            <>
              <div className="mb-2">
                <LivePlayer match={selectedMatch} playing={playing} />
              </div>
              {/* Controls */}
              <div className="flex items-center gap-3 bg-[#12121a] border border-[#22223a] rounded-xl px-4 py-2 mb-4">
                <button onClick={() => setPlaying(p => !p)}
                  className="w-8 h-8 rounded-lg bg-[#6c63ff] flex items-center justify-center hover:bg-[#5a52e8] transition-colors">
                  {playing ? <Pause size={14} className="text-white" /> : <Play size={14} className="text-white" />}
                </button>
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
                  <span className="text-red-400 text-xs font-bold">LIVE</span>
                  <span className="text-slate-600 text-xs ml-2 truncate">{selectedMatch.venue}</span>
                </div>
                <button onClick={() => setMuted(m => !m)} className="text-slate-400 hover:text-white transition-colors">
                  {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
                <Maximize2 size={18} className="text-slate-600" />
              </div>
              {/* Emoji reactions */}
              <div className="bg-[#12121a] border border-[#22223a] rounded-2xl p-4 relative overflow-hidden min-h-[80px]">
                <p className="text-slate-400 text-sm mb-3 font-semibold">Deine Reaktionen</p>
                {floatingEmojis.map(f => (
                  <div key={f.id} className="pointer-events-none absolute bottom-12 text-3xl"
                    style={{ left: `${f.x}%`, animation: 'floatUp 1.2s ease-out forwards' }}>{f.emoji}</div>
                ))}
                {state.ownedEmojis.length === 0 ? (
                  <p className="text-slate-600 text-sm">Kaufe Emojis im Shop!</p>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {state.ownedEmojis.map(emoji => (
                      <button key={emoji} onClick={() => handleEmojiReaction(emoji)} className="flex flex-col items-center gap-1 group">
                        <span className="text-3xl group-hover:scale-125 transition-transform duration-150 active:scale-150">{emoji}</span>
                        {emojiCounts[emoji] ? <span className="text-xs text-slate-400 font-bold">{emojiCounts[emoji]}</span> : null}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="rounded-2xl bg-[#12121a] border border-[#22223a] flex items-center justify-center h-64">
              <p className="text-slate-600">Kein Live-Spiel ausgewählt</p>
            </div>
          )}
        </div>

        {/* Chat */}
        <div className="lg:w-80 flex flex-col bg-[#12121a] border border-[#22223a] rounded-2xl overflow-hidden" style={{ minHeight: 400, maxHeight: 600 }}>
          <div className="p-4 border-b border-[#22223a] flex items-center justify-between">
            <h3 className="text-white font-bold text-sm">Live Chat</h3>
            <span className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
              Online
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ maxHeight: 420 }}>
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-2 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${msg.isMe ? 'bg-[#6c63ff]' : 'bg-[#22223a]'} text-white`}>
                  {msg.user[0].toUpperCase()}
                </div>
                <div className={`max-w-[75%] flex flex-col gap-0.5 ${msg.isMe ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-slate-500">{msg.isMe ? 'Du' : msg.user} · {msg.time}</span>
                  <div className={`px-3 py-2 rounded-2xl text-sm ${msg.isMe ? 'bg-[#6c63ff] text-white rounded-tr-sm' : 'bg-[#1a1a27] text-slate-200 rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>
          <div className="p-3 border-t border-[#22223a] flex gap-2">
            <input ref={inputRef} type="text" value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Schreib etwas… (+2🪙)"
              className="flex-1 bg-[#1a1a27] border border-[#22223a] rounded-xl px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#6c63ff]/50 transition-colors" />
            <button onClick={handleSend} disabled={!inputText.trim()}
              className="w-9 h-9 rounded-xl bg-[#6c63ff] hover:bg-[#5a52e8] disabled:opacity-40 flex items-center justify-center transition-colors flex-shrink-0">
              <Send size={14} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0%   { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
