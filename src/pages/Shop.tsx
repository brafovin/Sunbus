import { ShoppingBag } from 'lucide-react';
import { useCoins } from '../context/CoinContext';

const EMOJI_ITEMS = [
  { emoji: '🔥', name: 'Feuer', price: 50 },
  { emoji: '💥', name: 'Explosion', price: 80 },
  { emoji: '🏆', name: 'Pokal', price: 100 },
  { emoji: '⚡', name: 'Blitz', price: 60 },
  { emoji: '🎯', name: 'Ziel', price: 70 },
  { emoji: '🌟', name: 'Stern', price: 120 },
  { emoji: '🚀', name: 'Rakete', price: 150 },
  { emoji: '👑', name: 'Krone', price: 200 },
  { emoji: '💎', name: 'Diamant', price: 300 },
  { emoji: '🎉', name: 'Party', price: 90 },
  { emoji: '😍', name: 'Verliebt', price: 40 },
  { emoji: '🤩', name: 'Begeistert', price: 40 },
];

export default function Shop() {
  const { state, dispatch } = useCoins();

  function handleBuy(emoji: string, price: number) {
    dispatch({ type: 'BUY_EMOJI', emoji, price });
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pb-safe-nav md:pb-8 pt-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#6c63ff]/20 border border-[#6c63ff]/30 flex items-center justify-center">
          <ShoppingBag size={20} className="text-[#6c63ff]" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">Emoji-Shop</h1>
          <p className="text-slate-500 text-sm">Kaufe neue Reaktionen für den Live-Chat</p>
        </div>
      </div>

      {/* Coin balance */}
      <div className="mb-6 bg-[#12121a] border border-[#22223a] rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm">Dein Kontostand</p>
          <p className="text-amber-400 font-black text-2xl">🪙 {state.coins}</p>
        </div>
        <div className="text-right">
          <p className="text-slate-400 text-sm">Besitzt du</p>
          <p className="text-white font-bold">{state.ownedEmojis.length} Emojis</p>
        </div>
      </div>

      {/* Emoji grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {EMOJI_ITEMS.map(({ emoji, name, price }) => {
          const owned = state.ownedEmojis.includes(emoji);
          const canAfford = state.coins >= price;

          return (
            <div
              key={emoji}
              className={`bg-[#12121a] border rounded-2xl p-4 flex flex-col items-center gap-3 transition-all duration-200
                ${owned ? 'border-green-500/40' : 'border-[#22223a] hover:border-[#6c63ff]/40'}`}
            >
              <span className="text-4xl hover:scale-110 transition-transform duration-150">{emoji}</span>
              <div className="text-center">
                <p className="text-white font-semibold text-sm">{name}</p>
                <p className="text-amber-400 text-sm font-bold mt-0.5">🪙 {price}</p>
              </div>

              {owned ? (
                <div className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-semibold">
                  <span>✅</span>
                  <span>Besitzt</span>
                </div>
              ) : (
                <button
                  onClick={() => handleBuy(emoji, price)}
                  disabled={!canAfford}
                  className={`w-full py-2 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95
                    ${canAfford
                      ? 'bg-[#6c63ff] hover:bg-[#5a52e8] text-white shadow-md shadow-[#6c63ff]/20'
                      : 'bg-[#1a1a27] text-slate-600 cursor-not-allowed border border-[#22223a]'
                    }`}
                >
                  {canAfford ? 'Kaufen' : '🪙 Zu wenig'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Owned emojis */}
      <div className="mt-8 bg-[#12121a] border border-[#22223a] rounded-2xl p-4">
        <h3 className="text-white font-bold mb-3">Deine Emojis</h3>
        <div className="flex flex-wrap gap-2">
          {state.ownedEmojis.map(e => (
            <span key={e} className="text-2xl hover:scale-125 transition-transform duration-150 cursor-default">{e}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
