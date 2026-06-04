import { useState, useEffect, useRef } from 'react';
import { Tv, Send, Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react';
import { useCoins } from '../context/CoinContext';
import { matches } from '../data/matches';

const FAKE_USERS = ['MaxFan', 'SportKing', 'GoalHunter', 'BayernFan', 'BVBler', 'TorJäger', 'UltraKurve'];
const FAKE_MESSAGES = [
  'Wahnsinn! 🔥', 'Was für ein Tor!', 'Come on Bayern!', 'Der Schiedsrichter ist blind!',
  'Unglaublich! 😱', 'BVB kämpft zurück! 💪', 'Das war Abseits!!!', 'Hammer Freistoß!',
  'Keeper hält alles heute 🧤', 'Wir brauchen ein Tor!', 'TOOOOR!!! 🎉',
  'Gänsehaut pur! ❤️', 'Super Flanke! ⚽', 'Weltklasse Aktion!', 'Nicht aufzuhalten!',
];

const HOME_NAMES = ['Neuer','Kimmich','Upamecano','Kim','Davies','Müller','Goretzka','Musiala','Sané','Coman','Kane'];
const AWAY_NAMES = ['Lunin','Carvajal','Rüdiger','Alaba','Mendy','Valverde','Tchouaméni','Kroos','Bellingham','Rodrygo','Vinicius'];

interface ChatMessage { id: number; user: string; text: string; time: string; isMe: boolean; }
interface FloatingEmoji { id: number; emoji: string; x: number; }
let mid = 1; let fid = 1;
function fmt(d: Date) { return d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }); }

// SVG player figure
function PlayerFigure({ x, y, color, shirt, name, hasBall }: {
  x: number; y: number; color: string; shirt: string; name: string; hasBall: boolean;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      {/* Shadow */}
      <ellipse cx="0" cy="5.5" rx="3" ry="1" fill="rgba(0,0,0,0.25)" />
      {/* Legs */}
      <rect x="-1.5" y="3" width="1.2" height="4" rx="0.6" fill={color} opacity="0.85" />
      <rect x="0.3" y="3" width="1.2" height="4" rx="0.6" fill={color} opacity="0.85" />
      {/* Shorts */}
      <rect x="-2" y="2.5" width="4" height="2.2" rx="0.8" fill="white" opacity="0.5" />
      {/* Body / shirt */}
      <rect x="-2.5" y="-1.5" width="5" height="4.5" rx="1.2" fill={color} />
      {/* Shirt number */}
      <text x="0" y="1.5" textAnchor="middle" fill="white" fontSize="2" fontWeight="bold">{shirt}</text>
      {/* Head */}
      <circle cx="0" cy="-3.5" r="2.2" fill="#f5c99a" stroke={color} strokeWidth="0.4" />
      {/* Hair */}
      <ellipse cx="0" cy="-5.2" rx="2" ry="0.8" fill="#5a3a1a" />
      {/* Arms */}
      <rect x="-4" y="-1" width="1.8" height="2.5" rx="0.8" fill={color} opacity="0.9" />
      <rect x="2.2" y="-1" width="1.8" height="2.5" rx="0.8" fill={color} opacity="0.9" />
      {/* Ball indicator */}
      {hasBall && <circle cx="3" cy="5" r="1.5" fill="white" stroke="#333" strokeWidth="0.3" />}
      {/* Name */}
      <text x="0" y="9" textAnchor="middle" fill="white" fontSize="2.2" fontWeight="bold"
        style={{ textShadow: '0 0 2px #000', paintOrder: 'stroke' } as React.CSSProperties}
        stroke="black" strokeWidth="0.6">{name}</text>
    </g>
  );
}

function LivePlayer({ match, playing }: { match: typeof matches[0]; playing: boolean }) {
  const initPlayers = () => [
    // Home team (red) — 4-3-3 formation, left side
    { id: 0,  team: 0, x:  8, y: 50, dx: 0,    dy: 0,    name: HOME_NAMES[0],  num: '1'  }, // GK
    { id: 1,  team: 0, x: 22, y: 20, dx: 0.15, dy: 0.1,  name: HOME_NAMES[1],  num: '5'  },
    { id: 2,  team: 0, x: 22, y: 37, dx: 0.1,  dy: 0.15, name: HOME_NAMES[2],  num: '5'  },
    { id: 3,  team: 0, x: 22, y: 63, dx: 0.12, dy: -0.1, name: HOME_NAMES[3],  num: '3'  },
    { id: 4,  team: 0, x: 22, y: 80, dx: 0.1,  dy: -0.15,name: HOME_NAMES[4],  num: '19' },
    { id: 5,  team: 0, x: 38, y: 30, dx: 0.2,  dy: 0.12, name: HOME_NAMES[5],  num: '25' },
    { id: 6,  team: 0, x: 38, y: 50, dx: 0.18, dy: -0.1, name: HOME_NAMES[6],  num: '8'  },
    { id: 7,  team: 0, x: 38, y: 70, dx: 0.15, dy: 0.15, name: HOME_NAMES[7],  num: '42' },
    { id: 8,  team: 0, x: 52, y: 22, dx: 0.25, dy: 0.1,  name: HOME_NAMES[8],  num: '10' },
    { id: 9,  team: 0, x: 52, y: 78, dx: 0.2,  dy: -0.12,name: HOME_NAMES[9],  num: '11' },
    { id: 10, team: 0, x: 55, y: 50, dx: 0.3,  dy: 0.05, name: HOME_NAMES[10], num: '9'  },
    // Away team (blue) — mirror
    { id: 11, team: 1, x: 92, y: 50, dx: 0,    dy: 0,    name: AWAY_NAMES[0],  num: '1'  },
    { id: 12, team: 1, x: 78, y: 20, dx:-0.15, dy: 0.1,  name: AWAY_NAMES[1],  num: '2'  },
    { id: 13, team: 1, x: 78, y: 37, dx:-0.1,  dy: 0.12, name: AWAY_NAMES[2],  num: '22' },
    { id: 14, team: 1, x: 78, y: 63, dx:-0.12, dy:-0.1,  name: AWAY_NAMES[3],  num: '4'  },
    { id: 15, team: 1, x: 78, y: 80, dx:-0.1,  dy:-0.12, name: AWAY_NAMES[4],  num: '23' },
    { id: 16, team: 1, x: 62, y: 30, dx:-0.2,  dy: 0.1,  name: AWAY_NAMES[5],  num: '15' },
    { id: 17, team: 1, x: 62, y: 50, dx:-0.18, dy:-0.1,  name: AWAY_NAMES[6],  num: '8'  },
    { id: 18, team: 1, x: 62, y: 70, dx:-0.15, dy: 0.15, name: AWAY_NAMES[7],  num: '8'  },
    { id: 19, team: 1, x: 48, y: 22, dx:-0.25, dy: 0.1,  name: AWAY_NAMES[8],  num: '22' },
    { id: 20, team: 1, x: 48, y: 78, dx:-0.2,  dy:-0.1,  name: AWAY_NAMES[9],  num: '11' },
    { id: 21, team: 1, x: 45, y: 50, dx:-0.3,  dy: 0.05, name: AWAY_NAMES[10], num: '9'  },
  ];

  const [ppos, setPpos] = useState(initPlayers);
  const [ball, setBall] = useState({ x: 50, y: 50, vx: 0.8, vy: 0.5 });
  const [homeScore, setHomeScore] = useState(match.homeScore ?? 0);
  const [awayScore, setAwayScore] = useState(match.awayScore ?? 0);
  const [minute, setMinute] = useState(match.minute ?? 1);
  const [goalEvent, setGoalEvent] = useState('');
  const rafRef = useRef<number>(0);
  const frame = useRef(0);
  const nearestRef = useRef(0);

  useEffect(() => {
    setHomeScore(match.homeScore ?? 0);
    setAwayScore(match.awayScore ?? 0);
    setMinute(match.minute ?? 1);
    setPpos(initPlayers());
    frame.current = 0;
  }, [match.id]);

  useEffect(() => {
    if (!playing) { cancelAnimationFrame(rafRef.current); return; }
    function tick() {
      frame.current++;
      // Move ball
      setBall(prev => {
        let { x, y, vx, vy } = prev;
        x += vx; y += vy;
        if (x < 3 || x > 97) { vx = -vx * 0.9; x = Math.max(3, Math.min(97, x)); }
        if (y < 3 || y > 97) { vy = -vy * 0.9; y = Math.max(3, Math.min(97, y)); }
        if (Math.random() < 0.015) { vx += (Math.random() - 0.5) * 0.6; vy += (Math.random() - 0.5) * 0.6; }
        const speed = Math.sqrt(vx*vx + vy*vy);
        if (speed > 3) { vx = vx/speed*3; vy = vy/speed*3; }
        return { x, y, vx, vy };
      });
      // Move players — closest chases ball
      setPpos(prev => {
        const bx = ball.x, by = ball.y;
        let minDist = 9999, minIdx = 0;
        prev.forEach((p, i) => {
          const d = Math.hypot(p.x - bx, p.y - by);
          if (d < minDist) { minDist = d; minIdx = i; }
        });
        nearestRef.current = minIdx;
        return prev.map((p, i) => {
          let { x, y, dx, dy } = p;
          let ndx = dx, ndy = dy;
          if (i === minIdx) {
            // Chase ball
            const dist = Math.hypot(bx - x, by - y);
            if (dist > 3) { ndx = (bx - x) / dist * 0.5; ndy = (by - y) / dist * 0.5; }
          } else {
            ndx = dx + (Math.random() - 0.5) * 0.08;
            ndy = dy + (Math.random() - 0.5) * 0.08;
            ndx = Math.max(-0.4, Math.min(0.4, ndx));
            ndy = Math.max(-0.4, Math.min(0.4, ndy));
          }
          x += ndx; y += ndy;
          const minX = p.team === 0 ? 4 : 4;
          const maxX = p.team === 0 ? 96 : 96;
          if (x < minX || x > maxX) { ndx = -ndx; x = Math.max(minX, Math.min(maxX, x)); }
          if (y < 5 || y > 95) { ndy = -ndy; y = Math.max(5, Math.min(95, y)); }
          return { ...p, x, y, dx: ndx, dy: ndy };
        });
      });
      if (frame.current % 60 === 0) setMinute(m => Math.min(90, m + 1));
      if (frame.current > 600 && frame.current % 1500 === 0 && Math.random() < 0.5) {
        const isHome = Math.random() > 0.5;
        if (isHome) setHomeScore(s => s + 1); else setAwayScore(s => s + 1);
        const arr = isHome ? HOME_NAMES : AWAY_NAMES;
        const scorer = arr[Math.floor(Math.random() * arr.length)];
        setGoalEvent(`⚽ TOOR! ${scorer}`);
        setTimeout(() => setGoalEvent(''), 4000);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const nearest = nearestRef.current;

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#22223a]" style={{ paddingBottom: '60%' }}>
      <div className="absolute inset-0" style={{ background: '#2d7a2d' }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Grass */}
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x={0} y={i*10} width={100} height={10} fill={i%2===0?'#2d7a2d':'#267026'} />
          ))}
          {/* Lines */}
          <rect x="3" y="4" width="94" height="92" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.5"/>
          <line x1="50" y1="4" x2="50" y2="96" stroke="rgba(255,255,255,0.7)" strokeWidth="0.4"/>
          <circle cx="50" cy="50" r="11" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.4"/>
          <circle cx="50" cy="50" r="0.8" fill="rgba(255,255,255,0.9)"/>
          {/* Penalty boxes */}
          <rect x="3" y="27" width="16" height="46" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.4"/>
          <rect x="81" y="27" width="16" height="46" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.6)" strokeWidth="0.4"/>
          {/* Goals */}
          <rect x="0.5" y="42" width="2.5" height="16" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="0.6"/>
          <rect x="97" y="42" width="2.5" height="16" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="0.6"/>
          {/* Players */}
          {ppos.map((p, i) => (
            <PlayerFigure
              key={p.id}
              x={p.x} y={p.y}
              color={p.team === 0 ? '#dc2626' : '#2563eb'}
              shirt={initPlayers()[i]?.num ?? String(i)}
              name={p.name}
              hasBall={i === nearest && Math.hypot(p.x - ball.x, p.y - ball.y) < 5}
            />
          ))}
          {/* Ball */}
          <circle cx={ball.x} cy={ball.y} r="1.8" fill="white" stroke="#555" strokeWidth="0.3"/>
          <circle cx={ball.x - 0.5} cy={ball.y - 0.5} r="0.6" fill="rgba(0,0,0,0.15)"/>
        </svg>

        {/* Score bar */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-black/80 rounded-xl px-4 py-1.5 flex items-center gap-3 z-10 whitespace-nowrap">
          <span className="text-white font-bold text-sm">{match.homeTeam.emoji} {match.homeTeam.shortName}</span>
          <span className="text-white font-black text-xl tabular-nums">{homeScore} – {awayScore}</span>
          <span className="text-white font-bold text-sm">{match.awayTeam.shortName} {match.awayTeam.emoji}</span>
        </div>

        {/* Live + minute */}
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 z-10">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse inline-block"/>
          {minute}'
        </div>

        {/* Legend */}
        <div className="absolute bottom-2 left-2 flex items-center gap-3 z-10">
          <div className="flex items-center gap-1 bg-black/60 rounded-lg px-2 py-1">
            <div className="w-3 h-3 rounded-sm bg-red-600"/>
            <span className="text-white text-[10px] font-bold">{match.homeTeam.shortName}</span>
          </div>
          <div className="flex items-center gap-1 bg-black/60 rounded-lg px-2 py-1">
            <div className="w-3 h-3 rounded-sm bg-blue-600"/>
            <span className="text-white text-[10px] font-bold">{match.awayTeam.shortName}</span>
          </div>
        </div>

        {/* Goal */}
        {goalEvent && (
          <div className="absolute inset-x-0 top-14 flex justify-center z-20">
            <div className="bg-yellow-400 text-black font-black text-xl px-8 py-3 rounded-2xl shadow-2xl animate-bounce">
              {goalEvent}
            </div>
          </div>
        )}

        {/* Paused */}
        {!playing && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 rounded-2xl">
            <div className="text-white text-center">
              <Play size={56} className="mx-auto mb-2 opacity-90"/>
              <p className="text-sm opacity-70">Drücke Play</p>
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
          <p className="text-slate-500 text-sm">Spieler bewegen sich live auf dem Platz</p>
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
            <Radio size={12} className="text-red-400 animate-pulse flex-shrink-0"/>
            <span>{m.homeTeam.emoji} {m.homeTeam.shortName}</span>
            <span className="font-black text-white">{m.homeScore}–{m.awayScore}</span>
            <span>{m.awayTeam.shortName} {m.awayTeam.emoji}</span>
            <span className="text-[10px] text-slate-500">{m.minute}'</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0">
          {selectedMatch && <LivePlayer match={selectedMatch} playing={playing} />}

          {/* Controls */}
          <div className="flex items-center gap-3 bg-[#12121a] border border-[#22223a] rounded-xl px-4 py-2 my-3">
            <button onClick={() => setPlaying(p => !p)}
              className="w-9 h-9 rounded-lg bg-[#6c63ff] flex items-center justify-center hover:bg-[#5a52e8] transition-colors">
              {playing ? <Pause size={16} className="text-white"/> : <Play size={16} className="text-white"/>}
            </button>
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0"/>
              <span className="text-red-400 text-xs font-bold">LIVE</span>
              <span className="text-slate-600 text-xs ml-2 truncate">{selectedMatch?.venue}</span>
            </div>
            <button onClick={() => setMuted(m => !m)} className="text-slate-400 hover:text-white transition-colors">
              {muted ? <VolumeX size={18}/> : <Volume2 size={18}/>}
            </button>
          </div>

          {/* Reactions */}
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
        </div>

        {/* Chat */}
        <div className="lg:w-80 flex flex-col bg-[#12121a] border border-[#22223a] rounded-2xl overflow-hidden" style={{ minHeight: 400, maxHeight: 600 }}>
          <div className="p-4 border-b border-[#22223a] flex items-center justify-between">
            <h3 className="text-white font-bold text-sm">Live Chat</h3>
            <span className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/>Online
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
            <div ref={chatBottomRef}/>
          </div>
          <div className="p-3 border-t border-[#22223a] flex gap-2">
            <input ref={inputRef} type="text" value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Schreib etwas… (+2🪙)"
              className="flex-1 bg-[#1a1a27] border border-[#22223a] rounded-xl px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#6c63ff]/50 transition-colors"/>
            <button onClick={handleSend} disabled={!inputText.trim()}
              className="w-9 h-9 rounded-xl bg-[#6c63ff] hover:bg-[#5a52e8] disabled:opacity-40 flex items-center justify-center transition-colors flex-shrink-0">
              <Send size={14} className="text-white"/>
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
