import { useState } from 'react';
import { teams, matches } from '../data/matches';
import MatchCard from '../components/MatchCard';
import { Users, ChevronRight, X, Calendar } from 'lucide-react';

export default function Teams() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const team = teams.find(t => t.id === selectedTeam);
  const teamMatches = selectedTeam
    ? matches
        .filter(m => m.homeTeam.id === selectedTeam || m.awayTeam.id === selectedTeam)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    : [];

  const leagues = [...new Set(teams.map(t => t.league))];

  return (
    <div className="max-w-2xl mx-auto px-4 pb-safe-nav md:pb-8 pt-6">
      {selectedTeam && team ? (
        // Team detail view
        <div>
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setSelectedTeam(null)}
              className="w-9 h-9 rounded-xl bg-[#12121a] border border-[#22223a] flex items-center justify-center hover:border-[#6c63ff]/50 transition-colors"
            >
              <X size={16} className="text-slate-400" />
            </button>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{team.emoji}</span>
              <div>
                <h1 className="text-xl font-black text-white">{team.name}</h1>
                <p className="text-slate-500 text-sm">{team.country} {team.league}</p>
              </div>
            </div>
          </div>

          {/* Team stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Gesamt', value: teamMatches.length },
              { label: 'Live', value: teamMatches.filter(m => m.status === 'live').length },
              { label: 'Bevorstehend', value: teamMatches.filter(m => m.status === 'upcoming').length },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#12121a] border border-[#22223a] rounded-xl p-3 text-center">
                <p className="text-white font-bold text-xl">{value}</p>
                <p className="text-slate-500 text-xs">{label}</p>
              </div>
            ))}
          </div>

          <h2 className="text-lg font-bold text-white mb-3">Spielplan</h2>
          {teamMatches.length === 0 ? (
            <div className="text-center py-12 text-slate-600">
              <Calendar size={40} className="mx-auto mb-3 opacity-50" />
              <p>Keine Spiele geplant</p>
            </div>
          ) : (
            <div className="space-y-3">
              {teamMatches.map(m => <MatchCard key={m.id} match={m} showWatch />)}
            </div>
          )}
        </div>
      ) : (
        // Team list view
        <div>
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <Users size={22} className="text-[#6c63ff]" />
              <h1 className="text-2xl font-black text-white">Mannschaften</h1>
            </div>
            <p className="text-slate-500 text-sm ml-9">Klicke auf ein Team für den Spielplan</p>
          </div>

          {leagues.map(league => (
            <div key={league} className="mb-6">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 px-1">{league}</h2>
              <div className="space-y-2">
                {teams.filter(t => t.league === league).map(team => {
                  const teamMatchCount = matches.filter(m => m.homeTeam.id === team.id || m.awayTeam.id === team.id);
                  const liveMatch = teamMatchCount.find(m => m.status === 'live');
                  return (
                    <button
                      key={team.id}
                      onClick={() => setSelectedTeam(team.id)}
                      className="w-full flex items-center gap-4 p-4 bg-[#12121a] border border-[#22223a] rounded-xl hover:border-[#6c63ff]/40 hover:bg-[#1a1a27] transition-all duration-200 text-left group"
                    >
                      <span className="text-3xl">{team.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-white truncate">{team.name}</p>
                          {liveMatch && (
                            <div className="flex items-center gap-1 bg-red-500/20 border border-red-500/30 rounded-full px-2 py-0.5">
                              <span className="live-dot w-1.5 h-1.5" />
                              <span className="text-[10px] text-red-400 font-bold">LIVE</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-slate-500">{team.country} · {teamMatchCount.length} Spiele</p>
                      </div>
                      <ChevronRight size={18} className="text-slate-600 group-hover:text-[#6c63ff] transition-colors flex-shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
