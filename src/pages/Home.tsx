import { useState } from 'react';
import { matches } from '../data/matches';
import MatchCard from '../components/MatchCard';
import { Zap, Calendar, Trophy } from 'lucide-react';

const competitions = ['Alle', 'UEFA Champions League', 'Bundesliga', 'Premier League', 'La Liga', 'Serie A', 'Ligue 1'];

export default function Home() {
  const [filter, setFilter] = useState('Alle');

  const liveMatches = matches.filter(m => m.status === 'live');
  const upcoming = matches
    .filter(m => m.status === 'upcoming')
    .filter(m => filter === 'Alle' || m.competition === filter)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="max-w-2xl mx-auto px-4 pb-24 md:pb-8 pt-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-white">Nächste Spiele</h1>
        <p className="text-slate-500 text-sm mt-1">Alle bevorstehenden Begegnungen im Überblick</p>
      </div>

      {/* Live Banner */}
      {liveMatches.length > 0 && (
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/10 border border-red-500/30 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={16} className="text-red-400" />
            <span className="text-red-400 font-bold text-sm uppercase tracking-wider">Jetzt live</span>
            <span className="live-dot ml-1" />
          </div>
          <div className="grid gap-3">
            {liveMatches.map(m => (
              <MatchCard key={m.id} match={m} showWatch />
            ))}
          </div>
        </div>
      )}

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { icon: Zap, label: 'Live Spiele', value: liveMatches.length, color: 'text-red-400' },
          { icon: Calendar, label: 'Bevorstehend', value: upcoming.length, color: 'text-[#6c63ff]' },
          { icon: Trophy, label: 'Wettbewerbe', value: competitions.length - 1, color: 'text-yellow-400' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-[#12121a] border border-[#22223a] rounded-xl p-3 text-center">
            <Icon size={18} className={`${color} mx-auto mb-1`} />
            <p className="text-white font-bold text-lg">{value}</p>
            <p className="text-slate-500 text-xs">{label}</p>
          </div>
        ))}
      </div>

      {/* Competition filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
        {competitions.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all
              ${filter === c
                ? 'bg-[#6c63ff] border-[#6c63ff] text-white'
                : 'bg-[#12121a] border-[#22223a] text-slate-400 hover:border-[#6c63ff]/50 hover:text-white'
              }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Upcoming matches */}
      <div className="space-y-3">
        {upcoming.length === 0 ? (
          <div className="text-center py-12 text-slate-600">
            <Calendar size={40} className="mx-auto mb-3 opacity-50" />
            <p>Keine Spiele gefunden</p>
          </div>
        ) : (
          upcoming.map(m => <MatchCard key={m.id} match={m} />)
        )}
      </div>
    </div>
  );
}
