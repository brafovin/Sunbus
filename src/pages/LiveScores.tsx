import { useNavigate } from 'react-router-dom';
import { matches } from '../data/matches';
import MatchCard from '../components/MatchCard';
import { Radio, Tv } from 'lucide-react';

export default function LiveScores() {
  const navigate = useNavigate();
  const live = matches.filter(m => m.status === 'live');

  return (
    <div className="max-w-2xl mx-auto px-4 pb-24 md:pb-8 pt-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
          <Radio size={20} className="text-red-400" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            Live
            <span className="live-dot" />
          </h1>
          <p className="text-slate-500 text-sm">{live.length} Spiel{live.length !== 1 ? 'e' : ''} gerade live</p>
        </div>
      </div>

      {live.length === 0 ? (
        <div className="text-center py-20 text-slate-600">
          <Radio size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-semibold">Aktuell keine Live-Spiele</p>
          <p className="text-sm mt-1">Schau später wieder vorbei!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {live.map(match => (
            <div key={match.id} className="group relative">
              <MatchCard match={match} />
              {/* Watch button overlay */}
              <div className="mt-2">
                <button
                  onClick={() => navigate('/live-ansehen', { state: { matchId: match.id } })}
                  className="w-full flex items-center justify-center gap-2 bg-[#6c63ff] hover:bg-[#5a52e8] active:scale-95 text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-[#6c63ff]/20"
                >
                  <Tv size={18} />
                  Live ansehen
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Live ticker */}
      {live.length > 0 && (
        <div className="mt-8 bg-[#12121a] border border-[#22223a] rounded-2xl p-4">
          <h3 className="font-bold text-white mb-3 flex items-center gap-2">
            <span className="live-dot" />
            Live-Ticker
          </h3>
          <div className="space-y-2">
            {[
              { time: "67'", team: 'Bayern München', event: '⚽ Tor! Harry Kane trifft zum 2:1' },
              { time: "61'", team: 'Real Madrid', event: '🟨 Gelbe Karte – Camavinga' },
              { time: "45'", team: 'Liverpool FC', event: '⚽ Tor! Mohamed Salah – 1:1' },
              { time: "34'", team: 'Borussia Dortmund', event: '🟨 Gelbe Karte – Hummels' },
              { time: "28'", team: 'FC Barcelona', event: '⚽ Tor! Robert Lewandowski – 2:0' },
            ].map((event, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-[#1a1a27] last:border-0">
                <span className="text-xs text-[#6c63ff] font-bold w-8 flex-shrink-0 pt-0.5">{event.time}</span>
                <div>
                  <p className="text-xs text-white">{event.event}</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">{event.team}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
