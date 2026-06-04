import { useState } from 'react';
import { matches } from '../data/matches';
import { Tv, Volume2, Maximize2, Settings, Play, Pause, SkipForward } from 'lucide-react';

const liveMatches = matches.filter(m => m.status === 'live');

export default function LiveWatch() {
  const [selectedMatch, setSelectedMatch] = useState(liveMatches[0]?.id ?? null);
  const [playing, setPlaying] = useState(true);
  const [volume, setVolume] = useState(80);

  const current = liveMatches.find(m => m.id === selectedMatch) ?? liveMatches[0];

  return (
    <div className="max-w-4xl mx-auto px-4 pb-safe-nav md:pb-8 pt-6">
      <div className="mb-5">
        <div className="flex items-center gap-3">
          <Tv size={22} className="text-[#6c63ff]" />
          <h1 className="text-2xl font-black text-white">Live ansehen</h1>
        </div>
        <p className="text-slate-500 text-sm ml-9 mt-0.5">Streame deine Lieblingsmannschaft live</p>
      </div>

      {current ? (
        <>
          {/* Video Player */}
          <div className="relative rounded-2xl overflow-hidden bg-black border border-[#22223a] mb-4 aspect-video">
            {/* YouTube embed placeholder — replace src with a real stream */}
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&rel=0&modestbranding=1"
              title="Live Stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {/* Live overlay badge */}
            <div className="absolute top-3 left-3 z-10 pointer-events-none">
              <div className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg">
                <span className="live-dot w-2 h-2" />
                LIVE
              </div>
            </div>
            {/* Minute badge */}
            {current.minute && (
              <div className="absolute top-3 right-3 z-10 pointer-events-none">
                <div className="bg-black/70 text-white text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur">
                  {current.minute}'
                </div>
              </div>
            )}
          </div>

          {/* Custom controls bar */}
          <div className="bg-[#12121a] border border-[#22223a] rounded-2xl p-4 mb-4">
            {/* Match info */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{current.homeTeam.emoji}</span>
                <div className="text-center">
                  <div className="text-white font-black text-xl">
                    {current.homeScore} <span className="text-slate-600">:</span> {current.awayScore}
                  </div>
                  <div className="text-[10px] text-slate-500">{current.competition}</div>
                </div>
                <span className="text-2xl">{current.awayTeam.emoji}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-red-500/20 border border-red-500/30 rounded-full px-3 py-1">
                <span className="live-dot" />
                <span className="text-xs text-red-400 font-bold">{current.minute}'</span>
              </div>
            </div>

            <div className="text-center mb-4">
              <p className="text-sm font-semibold text-white">
                {current.homeTeam.name} vs. {current.awayTeam.name}
              </p>
              <p className="text-xs text-slate-500">{current.venue}</p>
            </div>

            {/* Playback controls */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={() => setPlaying(p => !p)}
                className="w-12 h-12 rounded-full bg-[#6c63ff] hover:bg-[#5a52e8] flex items-center justify-center transition-colors shadow-lg shadow-[#6c63ff]/30"
              >
                {playing ? <Pause size={20} className="text-white" /> : <Play size={20} className="text-white ml-0.5" />}
              </button>
              <button className="w-10 h-10 rounded-full bg-[#1a1a27] border border-[#22223a] flex items-center justify-center hover:border-[#6c63ff]/40 transition-colors">
                <SkipForward size={16} className="text-slate-400" />
              </button>
              <button className="w-10 h-10 rounded-full bg-[#1a1a27] border border-[#22223a] flex items-center justify-center hover:border-[#6c63ff]/40 transition-colors">
                <Settings size={16} className="text-slate-400" />
              </button>
              <button className="w-10 h-10 rounded-full bg-[#1a1a27] border border-[#22223a] flex items-center justify-center hover:border-[#6c63ff]/40 transition-colors">
                <Maximize2 size={16} className="text-slate-400" />
              </button>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-3">
              <Volume2 size={16} className="text-slate-400 flex-shrink-0" />
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                className="flex-1 h-1.5 rounded-full accent-[#6c63ff] cursor-pointer"
              />
              <span className="text-xs text-slate-500 w-8 text-right">{volume}%</span>
            </div>
          </div>

          {/* Other live games */}
          {liveMatches.length > 1 && (
            <div className="bg-[#12121a] border border-[#22223a] rounded-2xl p-4">
              <h3 className="font-bold text-white mb-3 text-sm">Andere Live-Spiele</h3>
              <div className="space-y-2">
                {liveMatches
                  .filter(m => m.id !== selectedMatch)
                  .map(m => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMatch(m.id)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl bg-[#1a1a27] hover:bg-[#22223a] border border-[#22223a] hover:border-[#6c63ff]/40 transition-all text-left"
                    >
                      <span className="live-dot flex-shrink-0" />
                      <span className="text-base">{m.homeTeam.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white font-semibold truncate">
                          {m.homeTeam.shortName} {m.homeScore}:{m.awayScore} {m.awayTeam.shortName}
                        </p>
                        <p className="text-xs text-slate-500">{m.competition} · {m.minute}'</p>
                      </div>
                      <span className="text-base">{m.awayTeam.emoji}</span>
                      <div className="text-xs text-[#6c63ff] font-semibold flex-shrink-0">Ansehen</div>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 text-slate-600">
          <Tv size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-semibold">Aktuell kein Stream verfügbar</p>
          <p className="text-sm mt-1">Warte auf das nächste Live-Spiel</p>
        </div>
      )}
    </div>
  );
}
