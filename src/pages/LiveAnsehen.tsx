import { useState, useEffect, useRef } from 'react';
import { Tv, Send } from 'lucide-react';
import { useCoins } from '../context/CoinContext';

const FAKE_USERS = ['MaxFan', 'SportKing', 'GoalHunter', 'BayernFan', 'BVBler'];

const FAKE_MESSAGES = [
  'Wahnsinn! 🔥',
  'Was für ein Tor!',
  'Come on Bayern!',
  'Der Schiedsrichter ist blind!',
  'Unglaublich, diese Leistung!',
  'BVB kämpft zurück! 💪',
  'Das war Abseits!!!',
  'Hammer Freistoß!',
  'Gelbe Karte war verdient.',
  'Keeper hält alles heute 🧤',
  'Wir brauchen ein Tor!',
  'Das war doch kein Foul!',
  'Super Flanke! ⚽',
  'Ausgleich wäre jetzt fair.',
  'Endlich mal ein gutes Spiel!',
  'Ich glaub es nicht! 😱',
  'Gänsehaut pur! ❤️',
  'Der beste Spieler auf dem Platz!',
  'Verlängerung kommt, ich spür\'s!',
  'Feuer frei! Schieß! 🎯',
];

interface ChatMessage {
  id: number;
  user: string;
  text: string;
  time: string;
  isMe: boolean;
}

interface FloatingEmoji {
  id: number;
  emoji: string;
  x: number;
}

type EmojiCounts = Record<string, number>;

function formatTime(date: Date): string {
  return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

let msgId = 1;
let floatId = 1;

export default function LiveAnsehen() {
  const { state, dispatch } = useCoins();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: msgId++, user: 'SportKing', text: 'Hey Leute! Bereit fürs Spiel? 🔥', time: formatTime(new Date()), isMe: false },
    { id: msgId++, user: 'MaxFan', text: 'Jaaaa! Heute wird gewonnen!', time: formatTime(new Date()), isMe: false },
  ]);
  const [inputText, setInputText] = useState('');
  const [emojiCounts, setEmojiCounts] = useState<EmojiCounts>({});
  const [floatingEmojis, setFloatingEmojis] = useState<FloatingEmoji[]>([]);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fake messages every 3-5 seconds
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    function scheduleNext() {
      const delay = 3000 + Math.random() * 2000;
      timeout = setTimeout(() => {
        const user = FAKE_USERS[Math.floor(Math.random() * FAKE_USERS.length)];
        const text = FAKE_MESSAGES[Math.floor(Math.random() * FAKE_MESSAGES.length)];
        setMessages(prev => [...prev, {
          id: msgId++,
          user,
          text,
          time: formatTime(new Date()),
          isMe: false,
        }]);
        scheduleNext();
      }, delay);
    }

    scheduleNext();
    return () => clearTimeout(timeout);
  }, []);

  function handleSend() {
    const text = inputText.trim();
    if (!text) return;
    setMessages(prev => [...prev, {
      id: msgId++,
      user: 'Du',
      text,
      time: formatTime(new Date()),
      isMe: true,
    }]);
    setInputText('');
    dispatch({ type: 'ADD_COINS', amount: 2 });
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleSend();
  }

  function handleEmojiReaction(emoji: string) {
    setEmojiCounts(prev => ({ ...prev, [emoji]: (prev[emoji] ?? 0) + 1 }));
    const x = 10 + Math.random() * 80;
    const id = floatId++;
    setFloatingEmojis(prev => [...prev, { id, emoji, x }]);
    setTimeout(() => {
      setFloatingEmojis(prev => prev.filter(f => f.id !== id));
    }, 1200);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-safe-nav md:pb-8 pt-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#6c63ff]/20 border border-[#6c63ff]/30 flex items-center justify-center">
          <Tv size={20} className="text-[#6c63ff]" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">Live ansehen</h1>
          <p className="text-slate-500 text-sm">Streame live und chatte mit Fans</p>
        </div>
        <div className="ml-auto text-amber-400 font-bold text-sm">🪙 {state.coins}</div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left: Video + reactions */}
        <div className="flex-1 min-w-0">
          {/* Video player */}
          <div className="relative rounded-2xl overflow-hidden bg-black border border-[#22223a] mb-4 aspect-video">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/live_stream?channel=UCsT0YIqwnpJCM-mx7-gSA4Q"
              title="Live Stream"
              allow="autoplay"
              allowFullScreen
            />
            <div className="absolute top-3 left-3 z-10 pointer-events-none">
              <div className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse inline-block" />
                LIVE
              </div>
            </div>
          </div>

          {/* Emoji reactions */}
          <div className="bg-[#12121a] border border-[#22223a] rounded-2xl p-4 relative overflow-hidden">
            <p className="text-slate-400 text-sm mb-3 font-semibold">Deine Reaktionen</p>

            {/* Floating emojis */}
            {floatingEmojis.map(f => (
              <div
                key={f.id}
                className="pointer-events-none absolute bottom-12 text-3xl animate-bounce"
                style={{ left: `${f.x}%`, animation: 'floatUp 1.2s ease-out forwards' }}
              >
                {f.emoji}
              </div>
            ))}

            {state.ownedEmojis.length === 0 ? (
              <p className="text-slate-600 text-sm">Kaufe Emojis im Shop!</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {state.ownedEmojis.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => handleEmojiReaction(emoji)}
                    className="flex flex-col items-center gap-1 group"
                  >
                    <span className="text-3xl group-hover:scale-125 transition-transform duration-150 active:scale-150">
                      {emoji}
                    </span>
                    {emojiCounts[emoji] ? (
                      <span className="text-xs text-slate-400 font-bold">{emojiCounts[emoji]}</span>
                    ) : null}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Chat */}
        <div className="lg:w-80 flex flex-col bg-[#12121a] border border-[#22223a] rounded-2xl overflow-hidden" style={{ minHeight: '400px', maxHeight: '600px' }}>
          <div className="p-4 border-b border-[#22223a] flex items-center justify-between">
            <h3 className="text-white font-bold text-sm">Live Chat</h3>
            <span className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
              Online
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{ maxHeight: '420px' }}>
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-2 ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${msg.isMe ? 'bg-[#6c63ff]' : 'bg-[#22223a]'} text-white`}>
                  {msg.user[0].toUpperCase()}
                </div>
                <div className={`max-w-[75%] ${msg.isMe ? 'items-end' : 'items-start'} flex flex-col gap-0.5`}>
                  <span className="text-[10px] text-slate-500">{msg.isMe ? 'Du' : msg.user} · {msg.time}</span>
                  <div className={`px-3 py-2 rounded-2xl text-sm ${msg.isMe ? 'bg-[#6c63ff] text-white rounded-tr-sm' : 'bg-[#1a1a27] text-slate-200 rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-[#22223a] flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Schreib etwas… (+2🪙)"
              className="flex-1 bg-[#1a1a27] border border-[#22223a] rounded-xl px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#6c63ff]/50 transition-colors"
            />
            <button
              onClick={handleSend}
              disabled={!inputText.trim()}
              className="w-9 h-9 rounded-xl bg-[#6c63ff] hover:bg-[#5a52e8] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
            >
              <Send size={14} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
