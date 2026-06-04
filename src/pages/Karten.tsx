import { useState } from 'react';
import { Trophy, Star, Zap, Shield, Target, Users } from 'lucide-react';
import { useCoins, type PlayerCard } from '../context/CoinContext';

const CARDS: PlayerCard[] = [
  /* ── NORMAL (3000–5000) ── */
  { id:'c1',  name:'Müller',     team:'Bayern München', teamEmoji:'🔴', position:'ST', rating:82, pace:72, shooting:84, passing:79, defending:35, rarity:'normal', price:3000,  image:'👨' },
  { id:'c2',  name:'Kimmich',    team:'Bayern München', teamEmoji:'🔴', position:'MF', rating:86, pace:70, shooting:72, passing:90, defending:78, rarity:'normal', price:4500,  image:'👨' },
  { id:'c3',  name:'Goretzka',   team:'Bayern München', teamEmoji:'🔴', position:'MF', rating:84, pace:75, shooting:78, passing:83, defending:75, rarity:'normal', price:3500,  image:'👨' },
  { id:'c4',  name:'Carvajal',   team:'Real Madrid',    teamEmoji:'⚪', position:'RB', rating:83, pace:78, shooting:60, passing:76, defending:82, rarity:'normal', price:3200,  image:'👨' },
  { id:'c5',  name:'Mendy',      team:'Real Madrid',    teamEmoji:'⚪', position:'LB', rating:82, pace:84, shooting:50, passing:72, defending:80, rarity:'normal', price:3100,  image:'👨' },
  { id:'c6',  name:'Salah',      team:'Liverpool',      teamEmoji:'🔴', position:'RW', rating:88, pace:94, shooting:87, passing:80, defending:45, rarity:'normal', price:5000,  image:'👨' },
  { id:'c7',  name:'Dias',       team:'Man City',       teamEmoji:'🩵', position:'CB', rating:86, pace:72, shooting:42, passing:70, defending:87, rarity:'normal', price:4000,  image:'👨' },
  { id:'c8',  name:'Rüdiger',    team:'Real Madrid',    teamEmoji:'⚪', position:'CB', rating:84, pace:74, shooting:45, passing:68, defending:86, rarity:'normal', price:3800,  image:'👨' },

  /* ── RARE (5000–10000) ── */
  { id:'c9',  name:'Kane',       team:'Bayern München', teamEmoji:'🔴', position:'ST', rating:90, pace:72, shooting:93, passing:84, defending:38, rarity:'rare',   price:6000,  image:'⭐' },
  { id:'c10', name:'Bellingham', team:'Real Madrid',    teamEmoji:'⚪', position:'MF', rating:91, pace:82, shooting:85, passing:87, defending:70, rarity:'rare',   price:7500,  image:'⭐' },
  { id:'c11', name:'Rodrygo',    team:'Real Madrid',    teamEmoji:'⚪', position:'LW', rating:87, pace:88, shooting:82, passing:79, defending:38, rarity:'rare',   price:5500,  image:'⭐' },
  { id:'c12', name:'De Bruyne',  team:'Man City',       teamEmoji:'🩵', position:'MF', rating:91, pace:76, shooting:85, passing:95, defending:62, rarity:'rare',   price:8000,  image:'⭐' },
  { id:'c13', name:'Kroos',      team:'Real Madrid',    teamEmoji:'⚪', position:'MF', rating:88, pace:60, shooting:80, passing:94, defending:72, rarity:'rare',   price:7000,  image:'⭐' },
  { id:'c14', name:'Musiala',    team:'Bayern München', teamEmoji:'🔴', position:'AM', rating:87, pace:82, shooting:82, passing:86, defending:48, rarity:'rare',   price:6500,  image:'⭐' },
  { id:'c15', name:'Sané',       team:'Bayern München', teamEmoji:'🔴', position:'RW', rating:86, pace:92, shooting:80, passing:78, defending:40, rarity:'rare',   price:5800,  image:'⭐' },
  { id:'c16', name:'Vinicius',   team:'Real Madrid',    teamEmoji:'⚪', position:'LW', rating:91, pace:95, shooting:84, passing:76, defending:32, rarity:'rare',   price:9000,  image:'⭐' },

  /* ── EPIC (10000–16000) ── */
  { id:'c17', name:'Mbappé',     team:'Real Madrid',    teamEmoji:'⚪', position:'ST', rating:95, pace:99, shooting:93, passing:80, defending:38, rarity:'epic',   price:12000, image:'💫' },
  { id:'c18', name:'Haaland',    team:'Man City',       teamEmoji:'🩵', position:'ST', rating:94, pace:89, shooting:96, passing:66, defending:42, rarity:'epic',   price:11000, image:'💫' },
  { id:'c19', name:'Pedri',      team:'Barcelona',      teamEmoji:'🔵', position:'MF', rating:89, pace:78, shooting:76, passing:90, defending:68, rarity:'epic',   price:10000, image:'💫' },
  { id:'c20', name:'Yamal',      team:'Barcelona',      teamEmoji:'🔵', position:'RW', rating:88, pace:92, shooting:84, passing:82, defending:35, rarity:'epic',   price:10500, image:'💫' },
  { id:'c21', name:'Alaba',      team:'Real Madrid',    teamEmoji:'⚪', position:'CB', rating:87, pace:72, shooting:62, passing:80, defending:88, rarity:'epic',   price:10200, image:'💫' },
  { id:'c22', name:'Lewandowski',team:'Barcelona',      teamEmoji:'🔵', position:'ST', rating:90, pace:78, shooting:92, passing:78, defending:40, rarity:'epic',   price:13000, image:'💫' },

  /* ── LEGEND (16000–20000) ── */
  { id:'c23', name:'Modric',     team:'Real Madrid',    teamEmoji:'⚪', position:'MF', rating:88, pace:74, shooting:76, passing:92, defending:68, rarity:'legend', price:16000, image:'👑' },
  { id:'c24', name:'Alisson',    team:'Liverpool',      teamEmoji:'🔴', position:'GK', rating:89, pace:52, shooting:22, passing:78, defending:89, rarity:'legend', price:17000, image:'👑' },
  { id:'c25', name:'Neuer',      team:'Bayern München', teamEmoji:'🔴', position:'GK', rating:88, pace:54, shooting:24, passing:80, defending:92, rarity:'legend', price:17500, image:'👑' },
  { id:'c26', name:'T. Alexander-Arnold',team:'Real Madrid',teamEmoji:'⚪',position:'RB',rating:88,pace:80,shooting:72,passing:88,defending:76,rarity:'legend',price:18000,image:'👑'},
  { id:'c27', name:'Ter Stegen', team:'Barcelona',      teamEmoji:'🔵', position:'GK', rating:90, pace:50, shooting:20, passing:82, defending:90, rarity:'legend', price:19000, image:'👑' },
  { id:'c28', name:'Courtois',   team:'Real Madrid',    teamEmoji:'⚪', position:'GK', rating:91, pace:48, shooting:18, passing:78, defending:92, rarity:'legend', price:20000, image:'👑' },
];

const RARITY_CONFIG = {
  normal: { label:'Normal',  bg:'from-slate-700 to-slate-900',   border:'border-slate-500',   badge:'bg-slate-600',   glow:'',                         stars:1 },
  rare:   { label:'Rare',    bg:'from-blue-800 to-slate-900',    border:'border-blue-500',    badge:'bg-blue-600',    glow:'shadow-[0_0_20px_#3b82f680]', stars:2 },
  epic:   { label:'Epic',    bg:'from-purple-800 to-slate-900',  border:'border-purple-500',  badge:'bg-purple-600',  glow:'shadow-[0_0_25px_#a855f780]', stars:3 },
  legend: { label:'Legende', bg:'from-amber-700 to-slate-900',   border:'border-amber-400',   badge:'bg-amber-500',   glow:'shadow-[0_0_30px_#f59e0b90]', stars:4 },
};

const POSITIONS = ['Alle','GK','CB','RB','LB','MF','AM','ST','RW','LW'];
const RARITIES  = ['Alle','normal','rare','epic','legend'] as const;

function StatBar({ label, value, color }:{ label:string; value:number; color:string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-slate-400 w-5 font-bold shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{width:`${value}%`, background:color}}/>
      </div>
      <span className="text-[10px] text-white font-bold w-6 text-right">{value}</span>
    </div>
  );
}

function Card({ card, owned, onBuy }:{ card:PlayerCard; owned:boolean; onBuy:()=>void }) {
  const cfg = RARITY_CONFIG[card.rarity];
  const [flip, setFlip] = useState(false);

  return (
    <div className="cursor-pointer" style={{perspective:'800px'}} onClick={()=>setFlip(f=>!f)}>
      <div className="relative transition-transform duration-500" style={{
        transformStyle:'preserve-3d',
        transform: flip ? 'rotateY(180deg)' : 'none',
        height: 260,
      }}>
        {/* FRONT */}
        <div className={`absolute inset-0 rounded-2xl border-2 ${cfg.border} ${cfg.glow} bg-gradient-to-b ${cfg.bg} overflow-hidden backface-hidden`}>
          {/* rarity badge */}
          <div className={`absolute top-2 left-2 ${cfg.badge} text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide`}>
            {cfg.label}
          </div>
          {owned && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">✓ Besitzt</div>
          )}

          {/* avatar area */}
          <div className="flex items-center justify-center pt-8 pb-2">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center text-5xl bg-gradient-to-b ${cfg.bg} border-2 ${cfg.border}`}>
              {card.image}
            </div>
          </div>

          {/* rating circle */}
          <div className="absolute top-8 right-3 flex flex-col items-center">
            <span className="text-white font-black text-2xl leading-none">{card.rating}</span>
            <span className="text-slate-400 text-[9px] font-bold">{card.position}</span>
          </div>

          {/* name & team */}
          <div className="text-center px-3 pb-1">
            <h3 className="text-white font-black text-base leading-tight">{card.name}</h3>
            <p className="text-slate-400 text-[11px]">{card.teamEmoji} {card.team}</p>
          </div>

          {/* stars */}
          <div className="flex justify-center gap-0.5 mb-2">
            {Array.from({length:cfg.stars}).map((_,i)=>(
              <Star key={i} size={10} className="text-amber-400 fill-amber-400"/>
            ))}
          </div>

          {/* price / buy */}
          <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-amber-400 font-black text-sm">🪙 {card.price.toLocaleString()}</span>
            <button
              onClick={e=>{e.stopPropagation();onBuy();}}
              disabled={owned}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                owned
                  ? 'bg-green-700/40 text-green-400 cursor-default'
                  : 'bg-amber-500 hover:bg-amber-400 text-black active:scale-95'
              }`}>
              {owned ? 'Im Besitz' : 'Kaufen'}
            </button>
          </div>

          <p className="absolute bottom-12 w-full text-center text-slate-500 text-[9px]">Tippen zum Umdrehen</p>
        </div>

        {/* BACK */}
        <div className={`absolute inset-0 rounded-2xl border-2 ${cfg.border} ${cfg.glow} bg-gradient-to-b ${cfg.bg} overflow-hidden`}
          style={{transform:'rotateY(180deg)', backfaceVisibility:'hidden'}}>
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{card.image}</span>
              <div>
                <h3 className="text-white font-black text-sm">{card.name}</h3>
                <p className="text-slate-400 text-[10px]">{card.teamEmoji} {card.team} · {card.position}</p>
              </div>
              <span className="ml-auto text-white font-black text-2xl">{card.rating}</span>
            </div>

            <div className="flex-1 space-y-1.5">
              <StatBar label="PAC" value={card.pace}      color="#22d3ee"/>
              <StatBar label="SHO" value={card.shooting}  color="#f59e0b"/>
              <StatBar label="PAS" value={card.passing}   color="#34d399"/>
              <StatBar label="DEF" value={card.defending} color="#6366f1"/>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-amber-400 font-black text-sm">🪙 {card.price.toLocaleString()}</span>
              <button
                onClick={e=>{e.stopPropagation();onBuy();}}
                disabled={owned}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                  owned ? 'bg-green-700/40 text-green-400 cursor-default' : 'bg-amber-500 hover:bg-amber-400 text-black active:scale-95'
                }`}>
                {owned ? 'Im Besitz' : 'Kaufen'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Karten() {
  const { state, dispatch } = useCoins();
  const [posFilter,  setPosFilter]  = useState('Alle');
  const [rarFilter,  setRarFilter]  = useState<typeof RARITIES[number]>('Alle');
  const [tab,        setTab]        = useState<'shop'|'sammlung'>('shop');
  const [toast,      setToast]      = useState('');

  function showToast(msg:string){ setToast(msg); setTimeout(()=>setToast(''),2500); }

  function buy(card:PlayerCard){
    if(state.ownedCards.includes(card.id)){ showToast('Karte bereits im Besitz!'); return; }
    if(state.coins < card.price){ showToast(`Nicht genug Münzen! Du brauchst 🪙 ${(card.price-state.coins).toLocaleString()} mehr.`); return; }
    dispatch({ type:'BUY_CARD', cardId:card.id, price:card.price });
    showToast(`✅ ${card.name} gekauft!`);
  }

  const filtered = CARDS.filter(c=>{
    if(tab==='sammlung' && !state.ownedCards.includes(c.id)) return false;
    if(posFilter!=='Alle' && c.position!==posFilter) return false;
    if(rarFilter!=='Alle' && c.rarity!==rarFilter) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 pb-safe-nav md:pb-8 pt-6">
      {/* header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
          <Trophy size={20} className="text-amber-400"/>
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">Spielerkarten</h1>
          <p className="text-slate-500 text-sm">Sammle Spieler · Kaufe mit Münzen</p>
        </div>
        <div className="ml-auto text-amber-400 font-bold text-base">🪙 {state.coins.toLocaleString()}</div>
      </div>

      {/* stats row */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-[#12121a] border border-[#22223a] rounded-xl p-3 text-center">
          <div className="text-2xl font-black text-white">{state.ownedCards.length}</div>
          <div className="text-xs text-slate-500 mt-0.5 flex items-center justify-center gap-1"><Users size={11}/>Karten</div>
        </div>
        <div className="bg-[#12121a] border border-[#22223a] rounded-xl p-3 text-center">
          <div className="text-2xl font-black text-amber-400">{CARDS.filter(c=>c.rarity==='legend'&&state.ownedCards.includes(c.id)).length}</div>
          <div className="text-xs text-slate-500 mt-0.5 flex items-center justify-center gap-1"><Star size={11}/>Legenden</div>
        </div>
        <div className="bg-[#12121a] border border-[#22223a] rounded-xl p-3 text-center">
          <div className="text-2xl font-black text-purple-400">{CARDS.filter(c=>c.rarity==='epic'&&state.ownedCards.includes(c.id)).length}</div>
          <div className="text-xs text-slate-500 mt-0.5 flex items-center justify-center gap-1"><Zap size={11}/>Episch</div>
        </div>
      </div>

      {/* tabs */}
      <div className="flex gap-2 mb-4">
        {(['shop','sammlung'] as const).map(t=>(
          <button key={t} onClick={()=>setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              tab===t ? 'bg-[#6c63ff] text-white' : 'bg-[#12121a] border border-[#22223a] text-slate-400 hover:border-[#6c63ff]/40'
            }`}>
            {t==='shop' ? '🏪 Shop' : `📦 Sammlung (${state.ownedCards.length})`}
          </button>
        ))}
      </div>

      {/* price guide */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {(Object.entries(RARITY_CONFIG) as [keyof typeof RARITY_CONFIG, typeof RARITY_CONFIG[keyof typeof RARITY_CONFIG]][]).map(([k,v])=>(
          <div key={k} className={`bg-[#12121a] border-2 ${v.border} rounded-xl px-3 py-2 flex items-center gap-2`}>
            <div className="flex gap-0.5">{Array.from({length:v.stars}).map((_,i)=><Star key={i} size={8} className="text-amber-400 fill-amber-400"/>)}</div>
            <div>
              <div className="text-white font-bold text-xs">{v.label}</div>
              <div className="text-slate-400 text-[10px]">
                {k==='normal'?'3.000–5.000':k==='rare'?'5.000–10.000':k==='epic'?'10.000–16.000':'16.000–20.000'} 🪙
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 shrink-0">
          <Shield size={12} className="text-slate-500"/>
          {POSITIONS.map(p=>(
            <button key={p} onClick={()=>setPosFilter(p)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                posFilter===p ? 'bg-[#6c63ff] text-white' : 'bg-[#12121a] border border-[#22223a] text-slate-400'
              }`}>{p}</button>
          ))}
        </div>
      </div>
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5 shrink-0">
          <Target size={12} className="text-slate-500"/>
          {RARITIES.map(r=>(
            <button key={r} onClick={()=>setRarFilter(r)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all shrink-0 ${
                rarFilter===r ? 'bg-[#6c63ff] text-white' : 'bg-[#12121a] border border-[#22223a] text-slate-400'
              }`}>{r==='Alle'?'Alle':RARITY_CONFIG[r].label}</button>
          ))}
        </div>
      </div>

      {/* cards grid */}
      {filtered.length===0 ? (
        <div className="text-center py-16 text-slate-500">
          <Trophy size={40} className="mx-auto mb-3 opacity-30"/>
          <p className="font-bold">{tab==='sammlung'?'Noch keine Karten gesammelt!':'Keine Karten gefunden.'}</p>
          {tab==='sammlung'&&<p className="text-sm mt-1">Gehe zum Shop und kaufe deine erste Karte!</p>}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {filtered.map(card=>(
            <Card
              key={card.id}
              card={card}
              owned={state.ownedCards.includes(card.id)}
              onBuy={()=>buy(card)}/>
          ))}
        </div>
      )}

      {/* toast */}
      {toast && (
        <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1a1a2e] border border-[#6c63ff]/40 text-white text-sm font-bold px-5 py-3 rounded-2xl shadow-2xl whitespace-nowrap">
          {toast}
        </div>
      )}
    </div>
  );
}
