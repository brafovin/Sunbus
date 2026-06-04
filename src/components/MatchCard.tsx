import { useNavigate } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';
import type { Match } from '../data/matches';

interface Props {
  match: Match;
  showWatch?: boolean;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit' });
}

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

export default function MatchCard({ match, showWatch = false }: Props) {
  const navigate = useNavigate();

  const statusColor =
    match.status === 'live' ? 'border-red-500/40 bg-red-500/5' :
    match.status === 'finished' ? 'border-[#22223a] opacity-70' :
    'border-[#22223a] hover:border-[#6c63ff]/40';

  return (
    <div className={`rounded-2xl border bg-[#12121a] p-4 transition-all duration-200 ${statusColor}`}>
      {/* Competition + Status */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-base">{match.competitionEmoji}</span>
          <span className="text-xs text-slate-400 font-medium">{match.competition}</span>
        </div>
        {match.status === 'live' && (
          <div className="flex items-center gap-1.5 bg-red-500/20 border border-red-500/40 rounded-full px-2.5 py-0.5">
            <span className="live-dot" />
            <span className="text-xs text-red-400 font-bold">{match.minute}'</span>
          </div>
        )}
        {match.status === 'finished' && (
          <span className="text-xs text-slate-500 bg-[#1a1a27] px-2 py-0.5 rounded-full">Beendet</span>
        )}
        {match.status === 'upcoming' && (
          <div className="flex items-center gap-1 text-slate-400 text-xs">
            <Clock size={12} />
            <span>{formatDate(match.date)} {formatTime(match.date)}</span>
          </div>
        )}
      </div>

      {/* Teams + Score */}
      <div className="flex items-center gap-3">
        {/* Home team */}
        <div className="flex-1 flex items-center gap-2.5 min-w-0">
          <span className="text-2xl flex-shrink-0">{match.homeTeam.emoji}</span>
          <div className="min-w-0">
            <p className="font-semibold text-white text-sm truncate">{match.homeTeam.name}</p>
            <p className="text-xs text-slate-500">{match.homeTeam.country} {match.homeTeam.league}</p>
          </div>
        </div>

        {/* Score */}
        <div className="flex-shrink-0 text-center px-3">
          {match.status !== 'upcoming' ? (
            <div className={`text-2xl font-black tracking-tight ${match.status === 'live' ? 'text-white' : 'text-slate-400'}`}>
              {match.homeScore} <span className="text-slate-600 text-xl">:</span> {match.awayScore}
            </div>
          ) : (
            <div className="text-slate-600 font-bold text-xl">vs</div>
          )}
        </div>

        {/* Away team */}
        <div className="flex-1 flex items-center gap-2.5 justify-end min-w-0">
          <div className="min-w-0 text-right">
            <p className="font-semibold text-white text-sm truncate">{match.awayTeam.name}</p>
            <p className="text-xs text-slate-500">{match.awayTeam.league} {match.awayTeam.country}</p>
          </div>
          <span className="text-2xl flex-shrink-0">{match.awayTeam.emoji}</span>
        </div>
      </div>

      {/* Venue */}
      <div className="flex items-center gap-1 mt-3 pt-3 border-t border-[#1a1a27]">
        <MapPin size={12} className="text-slate-600 flex-shrink-0" />
        <span className="text-xs text-slate-500 truncate">{match.venue}</span>
        {showWatch && match.status === 'live' && (
          <button
            onClick={() => navigate('/live-ansehen')}
            className="ml-auto flex-shrink-0 flex items-center gap-1.5 bg-[#6c63ff] hover:bg-[#5a52e8] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            <span>▶</span> Live ansehen
          </button>
        )}
      </div>
    </div>
  );
}
