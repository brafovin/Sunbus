import { useState, useEffect, useRef } from 'react';
import { Tv, Send, Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react';
import { useCoins } from '../context/CoinContext';
import { matches } from '../data/matches';

const FAKE_USERS = ['MaxFan','SportKing','GoalHunter','BayernFan','BVBler','TorJäger','UltraKurve'];
const FAKE_MSGS  = ['Wahnsinn! 🔥','Was für ein Tor!','Come on Bayern!','Der Schiri ist blind!','Unglaublich 😱','BVB kämpft 💪','Abseits!!!','Hammer Freistoß!','TOOOOR 🎉','Weltklasse! ⭐','Super Flanke ⚽'];
const HOME_NAMES = ['Neuer','Kimmich','Upamecano','Kim','Davies','Müller','Goretzka','Musiala','Sané','Coman','Kane'];
const AWAY_NAMES = ['Lunin','Carvajal','Rüdiger','Alaba','Mendy','Valverde','Tchouaméni','Kroos','Bellingham','Rodrygo','Vinicius'];

interface Msg { id:number; user:string; text:string; time:string; isMe:boolean; }
interface FE  { id:number; emoji:string; x:number; }
let mid=1, fid=1;
const fmt=(d:Date)=>d.toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'});

/* ─── 3-D perspective helpers ─── */
const CAM = { x:50, y:180, z:55, fov:320 };

function project(wx:number, wy:number, wz:number, camX:number) {
  const rx = wx - camX;
  const ry = wy - CAM.y;
  const rz = wz - CAM.z;
  const scale = CAM.fov / Math.max(rz + CAM.fov, 10);
  return { sx: 50 + rx * scale, sy: 50 + ry * scale, scale };
}

/* ─── Player SVG in perspective ─── */
function PPlayer({ wx,wy,color,num,name,hasBall,camX }:
  {wx:number;wy:number;color:string;num:string;name:string;hasBall:boolean;camX:number}) {
  const {sx,sy,scale} = project(wx,wy,0,camX);
  const s = Math.max(0.4, Math.min(1.6, scale));
  return (
    <g transform={`translate(${sx},${sy}) scale(${s})`}>
      <ellipse cx="0" cy="7" rx="3.5" ry="1.2" fill="rgba(0,0,0,0.3)"/>
      {/* legs */}
      <rect x="-1.8" y="3.5" width="1.4" height="5" rx="0.7" fill={color}/>
      <rect x="0.4"  y="3.5" width="1.4" height="5" rx="0.7" fill={color}/>
      {/* shorts */}
      <rect x="-2.2" y="3" width="4.4" height="2.5" rx="1" fill="white" opacity="0.35"/>
      {/* body */}
      <rect x="-3" y="-2" width="6" height="5.5" rx="1.4" fill={color}/>
      {/* number */}
      <text x="0" y="2" textAnchor="middle" fill="white" fontSize="2.4" fontWeight="bold">{num}</text>
      {/* head */}
      <circle cx="0" cy="-4.5" r="2.6" fill="#f5c99a" stroke={color} strokeWidth="0.5"/>
      {/* hair */}
      <ellipse cx="0" cy="-6.7" rx="2.4" ry="1" fill="#5a3a1a"/>
      {/* arms */}
      <rect x="-4.8" y="-1.5" width="2" height="3" rx="1" fill={color}/>
      <rect x="2.8"  y="-1.5" width="2" height="3" rx="1" fill={color}/>
      {hasBall && <circle cx="3.5" cy="6" r="1.8" fill="white" stroke="#444" strokeWidth="0.4"/>}
      {/* name tag */}
      <rect x="-5" y="8.5" width="10" height="3.5" rx="1" fill="rgba(0,0,0,0.55)"/>
      <text x="0" y="11.2" textAnchor="middle" fill="white" fontSize="2.4" fontWeight="bold">{name}</text>
    </g>
  );
}

/* ─── Live pitch component ─── */
function LivePitch({ match, playing }:{match:typeof matches[0]; playing:boolean}) {
  const initPlayers = ()=>[
    {id:0, team:0, x:5,  y:0, dx:0,   dy:0,   nm:HOME_NAMES[0],  nu:'1'},
    {id:1, team:0, x:20, y:-30,dx:0.1,dy:0.05,nm:HOME_NAMES[1],  nu:'5'},
    {id:2, team:0, x:20, y:-10,dx:0.1,dy:0.08,nm:HOME_NAMES[2],  nu:'5'},
    {id:3, team:0, x:20, y:10, dx:0.1,dy:-0.08,nm:HOME_NAMES[3], nu:'3'},
    {id:4, team:0, x:20, y:30, dx:0.1,dy:-0.05,nm:HOME_NAMES[4], nu:'19'},
    {id:5, team:0, x:38, y:-20,dx:0.2,dy:0.1,nm:HOME_NAMES[5],  nu:'25'},
    {id:6, team:0, x:38, y:0,  dx:0.2,dy:-0.1,nm:HOME_NAMES[6], nu:'8'},
    {id:7, team:0, x:38, y:20, dx:0.2,dy:0.1,nm:HOME_NAMES[7],  nu:'42'},
    {id:8, team:0, x:54, y:-25,dx:0.3,dy:0.1,nm:HOME_NAMES[8],  nu:'10'},
    {id:9, team:0, x:54, y:25, dx:0.3,dy:-0.1,nm:HOME_NAMES[9], nu:'11'},
    {id:10,team:0, x:58, y:0,  dx:0.35,dy:0.05,nm:HOME_NAMES[10],nu:'9'},
    {id:11,team:1, x:95, y:0,  dx:0,   dy:0,   nm:AWAY_NAMES[0], nu:'1'},
    {id:12,team:1, x:80, y:-30,dx:-0.1,dy:0.05,nm:AWAY_NAMES[1], nu:'2'},
    {id:13,team:1, x:80, y:-10,dx:-0.1,dy:0.08,nm:AWAY_NAMES[2], nu:'22'},
    {id:14,team:1, x:80, y:10, dx:-0.1,dy:-0.08,nm:AWAY_NAMES[3],nu:'4'},
    {id:15,team:1, x:80, y:30, dx:-0.1,dy:-0.05,nm:AWAY_NAMES[4],nu:'23'},
    {id:16,team:1, x:62, y:-20,dx:-0.2,dy:0.1,nm:AWAY_NAMES[5], nu:'15'},
    {id:17,team:1, x:62, y:0,  dx:-0.2,dy:-0.1,nm:AWAY_NAMES[6],nu:'8'},
    {id:18,team:1, x:62, y:20, dx:-0.2,dy:0.1,nm:AWAY_NAMES[7], nu:'8'},
    {id:19,team:1, x:46, y:-25,dx:-0.3,dy:0.1,nm:AWAY_NAMES[8], nu:'22'},
    {id:20,team:1, x:46, y:25, dx:-0.3,dy:-0.1,nm:AWAY_NAMES[9],nu:'11'},
    {id:21,team:1, x:42, y:0,  dx:-0.35,dy:0.05,nm:AWAY_NAMES[10],nu:'9'},
  ];

  const [ppos, setPpos]     = useState(initPlayers);
  const [ball, setBall]     = useState({x:50,y:0,vx:0.4,vy:0.2});
  const [camX, setCamX]     = useState(50);
  const [homeScore, setHS]  = useState(match.homeScore??0);
  const [awayScore, setAS]  = useState(match.awayScore??0);
  const [minute, setMin]    = useState(match.minute??1);
  const [goalMsg, setGoal]  = useState('');
  const rafRef  = useRef<number>(0);
  const frm     = useRef(0);
  const nearest = useRef(0);

  useEffect(()=>{
    setHS(match.homeScore??0); setAS(match.awayScore??0);
    setMin(match.minute??1);   setPpos(initPlayers());
    frm.current=0;
  },[match.id]);

  useEffect(()=>{
    if(!playing){cancelAnimationFrame(rafRef.current);return;}
    function tick(){
      frm.current++;
      // ball movement
      setBall(prev=>{
        let{x,y,vx,vy}=prev;
        x+=vx; y+=vy;
        if(x<2||x>98){vx=-vx*0.85; x=Math.max(2,Math.min(98,x));}
        if(y<-38||y>38){vy=-vy*0.85; y=Math.max(-38,Math.min(38,y));}
        if(Math.random()<0.02){vx+=(Math.random()-0.5)*0.7; vy+=(Math.random()-0.5)*0.4;}
        const sp=Math.sqrt(vx*vx+vy*vy);
        if(sp>3.5){vx=vx/sp*3.5; vy=vy/sp*3.5;}
        return{x,y,vx,vy};
      });
      // players
      setPpos(prev=>{
        const bx=ball.x, by=ball.y;
        let md=9999,mi=0;
        prev.forEach((p,i)=>{const d=Math.hypot(p.x-bx,p.y-by);if(d<md){md=d;mi=i;}});
        nearest.current=mi;
        return prev.map((p,i)=>{
          let{x,y,dx,dy}=p;
          let ndx=dx,ndy=dy;
          if(i===mi){
            const d=Math.hypot(bx-x,by-y);
            if(d>3){ndx=(bx-x)/d*0.45; ndy=(by-y)/d*0.35;}
          } else {
            ndx=dx+(Math.random()-0.5)*0.06;
            ndy=dy+(Math.random()-0.5)*0.06;
            ndx=Math.max(-0.45,Math.min(0.45,ndx));
            ndy=Math.max(-0.45,Math.min(0.45,ndy));
          }
          x+=ndx; y+=ndy;
          if(x<2||x>98){ndx=-ndx; x=Math.max(2,Math.min(98,x));}
          if(y<-38||y>38){ndy=-ndy; y=Math.max(-38,Math.min(38,y));}
          return{...p,x,y,dx:ndx,dy:ndy};
        });
      });
      // camera follows ball smoothly
      setCamX(cx=>cx+(ball.x-cx)*0.04);
      // minute
      if(frm.current%60===0) setMin(m=>Math.min(90,m+1));
      // goal
      if(frm.current>300&&frm.current%1800===0&&Math.random()<0.5){
        const home=Math.random()>0.5;
        if(home) setHS(s=>s+1); else setAS(s=>s+1);
        const arr=home?HOME_NAMES:AWAY_NAMES;
        const scorer=arr[Math.floor(Math.random()*arr.length)];
        setGoal(`⚽ TOOR! ${scorer}`);
        setTimeout(()=>setGoal(''),4500);
      }
      rafRef.current=requestAnimationFrame(tick);
    }
    rafRef.current=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(rafRef.current);
  },[playing]);

  /* ── Pitch lines in perspective ── */
  function projP(wx:number,wy:number){
    const {sx,sy}=project(wx,wy,0,camX);
    return `${sx},${sy}`;
  }
  const lines=[
    // touchlines
    [[2,-38],[2,38],[98,38],[98,-38],[2,-38]],
    // halfway
    [[50,-38],[50,38]],
    // left pen box
    [[2,-18],[18,-18],[18,18],[2,18]],
    // right pen box
    [[82,-18],[98,-18],[98,18],[82,18]],
    // goals
    [[2,-8],[0,-8],[0,8],[2,8]],
    [[98,-8],[100,-8],[100,8],[98,8]],
  ];

  // sort players by depth (far = low z = small y world → draw first)
  const sorted = [...ppos].sort((a,b)=>a.y-b.y);

  return(
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#1a1a2a]"
      style={{paddingBottom:'56.25%', background:'#1a1a2a'}}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet">

        {/* Sky / stadium */}
        <defs>
          <radialGradient id="pitch" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#2d8a2d"/>
            <stop offset="100%" stopColor="#1e5c1e"/>
          </radialGradient>
          <filter id="vignette">
            <feFlood floodColor="black" result="flood"/>
            <feComposite in="flood" in2="SourceGraphic" operator="in" result="masked"/>
            <feGaussianBlur in="masked" stdDeviation="8"/>
            <feComposite in="SourceGraphic" in2="masked" operator="over"/>
          </filter>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
            <feBlend in="SourceGraphic" mode="multiply" result="blend"/>
            <feComposite in="blend" in2="SourceGraphic" operator="in"/>
          </filter>
        </defs>

        {/* Stands */}
        <rect x="0" y="0" width="100" height="28" fill="#1a1a2a"/>
        {/* Crowd dots */}
        {Array.from({length:120},(_,i)=>(
          <circle key={i} cx={(i*3.7)%100} cy={2+Math.floor(i/27)*5+(i%3)*1.5}
            r="0.9" fill={['#ef4444','#3b82f6','#f59e0b','#ffffff','#6366f1'][i%5]} opacity="0.7"/>
        ))}
        {/* Stand rail */}
        <rect x="0" y="26" width="100" height="1.2" fill="#444" opacity="0.8"/>

        {/* Pitch surface */}
        <ellipse cx="50" cy="70" rx="62" ry="45" fill="url(#pitch)"/>
        {/* Stripes */}
        {Array.from({length:8},(_,i)=>(
          <ellipse key={i} cx="50" cy="70" rx={62-i*7} ry={45-i*5}
            fill="none" stroke={i%2===0?'#2d8a2d':'#267026'} strokeWidth="4"/>
        ))}

        {/* Pitch lines */}
        {lines.map((pts,li)=>(
          <polyline key={li}
            points={pts.map(([wx,wy])=>projP(wx,wy)).join(' ')}
            fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="0.5"/>
        ))}
        {/* Center circle */}
        {Array.from({length:24},(_,i)=>{
          const a1=i/24*Math.PI*2, a2=(i+1)/24*Math.PI*2;
          const r=10;
          return(
            <line key={i}
              x1={projP(50+Math.cos(a1)*r, Math.sin(a1)*r*0.45).split(',')[0]}
              y1={projP(50+Math.cos(a1)*r, Math.sin(a1)*r*0.45).split(',')[1]}
              x2={projP(50+Math.cos(a2)*r, Math.sin(a2)*r*0.45).split(',')[0]}
              y2={projP(50+Math.cos(a2)*r, Math.sin(a2)*r*0.45).split(',')[1]}
              stroke="rgba(255,255,255,0.8)" strokeWidth="0.5"/>
          );
        })}

        {/* Players (sorted back-to-front) */}
        {sorted.map(p=>{
          const init=ppos.find(q=>q.id===p.id)!;
          const isNearest=ppos.indexOf(init)===nearest.current;
          const bd=Math.hypot(p.x-ball.x,p.y-ball.y);
          return(
            <PPlayer key={p.id}
              wx={p.x} wy={p.y}
              color={p.team===0?'#dc2626':'#2563eb'}
              num={init.nu} name={p.nm}
              hasBall={isNearest&&bd<6}
              camX={camX}/>
          );
        })}

        {/* Ball */}
        {(()=>{
          const {sx,sy,scale}=project(ball.x,ball.y,0,camX);
          const bs=Math.max(0.5,Math.min(2,scale))*1.8;
          return(
            <g>
              <ellipse cx={sx} cy={sy+bs*0.6} rx={bs*0.9} ry={bs*0.3} fill="rgba(0,0,0,0.3)"/>
              <circle cx={sx} cy={sy} r={bs} fill="white" stroke="#444" strokeWidth="0.4"/>
              <path d={`M${sx-bs*0.4},${sy-bs*0.3} Q${sx},${sy-bs*0.9} ${sx+bs*0.4},${sy-bs*0.3}`}
                fill="none" stroke="#888" strokeWidth="0.3"/>
            </g>
          );
        })()}

        {/* Vignette */}
        <rect x="0" y="0" width="100" height="100"
          fill="radial-gradient(circle,transparent 40%,black 100%)" opacity="0.0"/>
        <radialGradient id="vg" cx="50%" cy="50%" r="70%">
          <stop offset="50%" stopColor="transparent"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.55)"/>
        </radialGradient>
        <rect x="0" y="0" width="100" height="100" fill="url(#vg)"/>

        {/* Film grain overlay */}
        {Array.from({length:40},(_,i)=>(
          <rect key={i}
            x={(i*17+frm.current*3)%100} y={(i*23+frm.current*2)%100}
            width="1" height="1" fill="white"
            opacity={0.02+Math.random()*0.04}/>
        ))}
      </svg>

      {/* ── TV broadcast overlays ── */}
      {/* Top score bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-center pt-2 pointer-events-none">
        <div className="flex items-center bg-black/85 backdrop-blur-sm rounded-b-xl overflow-hidden shadow-xl">
          <div className="flex items-center gap-2 px-4 py-2 bg-red-700">
            <span className="text-white font-black text-sm">{match.homeTeam.emoji}</span>
            <span className="text-white font-black text-sm">{match.homeTeam.shortName}</span>
          </div>
          <div className="px-5 py-2 bg-black/90">
            <span className="text-white font-black text-2xl tabular-nums tracking-widest">
              {homeScore} – {awayScore}
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-700">
            <span className="text-white font-black text-sm">{match.awayTeam.shortName}</span>
            <span className="text-white font-black text-sm">{match.awayTeam.emoji}</span>
          </div>
        </div>
      </div>

      {/* Bottom bar — broadcast style */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <div className="flex items-end justify-between px-3 pb-2">
          {/* Live + minute */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse inline-block"/>
              LIVE
            </div>
            <div className="bg-black/80 text-white text-xs font-black px-3 py-1.5 rounded-lg">
              {minute}'
            </div>
          </div>
          {/* Competition */}
          <div className="bg-black/75 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg">
            {match.competitionEmoji} {match.competition}
          </div>
        </div>
        {/* Ticker */}
        <div className="bg-[#6c63ff]/90 text-white text-[11px] font-bold px-3 py-1 flex items-center gap-2 overflow-hidden">
          <span className="flex-shrink-0">⚽ SPORT TV</span>
          <span className="opacity-50">|</span>
          <span className="truncate">{match.homeTeam.name} vs {match.awayTeam.name} · {match.venue}</span>
        </div>
      </div>

      {/* Goal popup */}
      {goalMsg&&(
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <div className="bg-yellow-400 text-black font-black text-2xl px-10 py-4 rounded-2xl shadow-2xl animate-bounce border-4 border-yellow-600">
            {goalMsg}
          </div>
        </div>
      )}

      {/* Paused */}
      {!playing&&(
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-30 rounded-2xl">
          <div className="text-white text-center">
            <Play size={64} className="mx-auto mb-3 opacity-90"/>
            <p className="text-base font-bold opacity-80">Drücke Play</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main page ─── */
export default function LiveAnsehen() {
  const {state,dispatch}=useCoins();
  const live=matches.filter(m=>m.status==='live');
  const [sel,setSel]=useState(live[0]??null);
  const [playing,setPlaying]=useState(true);
  const [muted,setMuted]=useState(true);
  const [msgs,setMsgs]=useState<Msg[]>([
    {id:mid++,user:'SportKing',text:'Hey Leute! Bereit? 🔥',time:fmt(new Date()),isMe:false},
    {id:mid++,user:'MaxFan',text:'Jaaaa! Heute gewinnen wir!',time:fmt(new Date()),isMe:false},
  ]);
  const [input,setInput]=useState('');
  const [ec,setEc]=useState<Record<string,number>>({});
  const [fe,setFe]=useState<FE[]>([]);
  const btm=useRef<HTMLDivElement>(null);
  const inp=useRef<HTMLInputElement>(null);

  useEffect(()=>{btm.current?.scrollIntoView({behavior:'smooth'});},[msgs]);
  useEffect(()=>{
    let t:ReturnType<typeof setTimeout>;
    const next=()=>{
      t=setTimeout(()=>{
        const u=FAKE_USERS[Math.floor(Math.random()*FAKE_USERS.length)];
        const m=FAKE_MSGS[Math.floor(Math.random()*FAKE_MSGS.length)];
        setMsgs(p=>[...p.slice(-60),{id:mid++,user:u,text:m,time:fmt(new Date()),isMe:false}]);
        next();
      },3000+Math.random()*3000);
    };
    next(); return()=>clearTimeout(t);
  },[]);

  function send(){
    const t=input.trim(); if(!t)return;
    setMsgs(p=>[...p,{id:mid++,user:'Du',text:t,time:fmt(new Date()),isMe:true}]);
    setInput(''); dispatch({type:'ADD_COINS',amount:2}); inp.current?.focus();
  }
  function react(emoji:string){
    setEc(p=>({...p,[emoji]:(p[emoji]??0)+1}));
    const id=fid++;
    setFe(p=>[...p,{id,emoji,x:10+Math.random()*80}]);
    setTimeout(()=>setFe(p=>p.filter(f=>f.id!==id)),1200);
  }

  return(
    <div className="max-w-6xl mx-auto px-4 pb-safe-nav md:pb-8 pt-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#6c63ff]/20 border border-[#6c63ff]/30 flex items-center justify-center">
          <Tv size={20} className="text-[#6c63ff]"/>
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">Live ansehen</h1>
          <p className="text-slate-500 text-sm">Kamera-Perspektive · Spieler mit Namen · Chat</p>
        </div>
        <div className="ml-auto text-amber-400 font-bold text-sm">🪙 {state.coins}</div>
      </div>

      {/* Match tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {live.map(m=>(
          <button key={m.id} onClick={()=>setSel(m)}
            className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold transition-all ${
              sel?.id===m.id
                ?'bg-red-500/20 border-red-500/50 text-white'
                :'bg-[#12121a] border-[#22223a] text-slate-400 hover:border-red-500/30'
            }`}>
            <Radio size={12} className="text-red-400 animate-pulse flex-shrink-0"/>
            {m.homeTeam.emoji}{m.homeTeam.shortName}
            <span className="font-black text-white">{m.homeScore}–{m.awayScore}</span>
            {m.awayTeam.shortName}{m.awayTeam.emoji}
            <span className="text-[10px] text-slate-500">{m.minute}'</span>
          </button>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 min-w-0">
          {sel&&<LivePitch match={sel} playing={playing}/>}
          {/* Controls */}
          <div className="flex items-center gap-3 bg-[#12121a] border border-[#22223a] rounded-xl px-4 py-2 my-3">
            <button onClick={()=>setPlaying(p=>!p)}
              className="w-9 h-9 rounded-lg bg-[#6c63ff] flex items-center justify-center hover:bg-[#5a52e8] transition-colors">
              {playing?<Pause size={16} className="text-white"/>:<Play size={16} className="text-white"/>}
            </button>
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0"/>
              <span className="text-red-400 text-xs font-bold">LIVE</span>
              <span className="text-slate-600 text-xs ml-2 truncate">{sel?.venue}</span>
            </div>
            <button onClick={()=>setMuted(m=>!m)} className="text-slate-400 hover:text-white transition-colors">
              {muted?<VolumeX size={18}/>:<Volume2 size={18}/>}
            </button>
          </div>
          {/* Reactions */}
          <div className="bg-[#12121a] border border-[#22223a] rounded-2xl p-4 relative overflow-hidden min-h-[76px]">
            <p className="text-slate-400 text-sm mb-3 font-semibold">Deine Reaktionen</p>
            {fe.map(f=>(
              <div key={f.id} className="pointer-events-none absolute bottom-12 text-3xl"
                style={{left:`${f.x}%`,animation:'floatUp 1.2s ease-out forwards'}}>{f.emoji}</div>
            ))}
            {state.ownedEmojis.length===0
              ?<p className="text-slate-600 text-sm">Kaufe Emojis im Shop!</p>
              :<div className="flex flex-wrap gap-3">
                {state.ownedEmojis.map(e=>(
                  <button key={e} onClick={()=>react(e)} className="flex flex-col items-center gap-1 group">
                    <span className="text-3xl group-hover:scale-125 transition-transform duration-150 active:scale-150">{e}</span>
                    {ec[e]?<span className="text-xs text-slate-400 font-bold">{ec[e]}</span>:null}
                  </button>
                ))}
              </div>
            }
          </div>
        </div>

        {/* Chat */}
        <div className="lg:w-80 flex flex-col bg-[#12121a] border border-[#22223a] rounded-2xl overflow-hidden" style={{minHeight:400,maxHeight:600}}>
          <div className="p-4 border-b border-[#22223a] flex items-center justify-between">
            <h3 className="text-white font-bold text-sm">Live Chat</h3>
            <span className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/>Online
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2" style={{maxHeight:420}}>
            {msgs.map(m=>(
              <div key={m.id} className={`flex gap-2 ${m.isMe?'flex-row-reverse':''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${m.isMe?'bg-[#6c63ff]':'bg-[#22223a]'} text-white`}>
                  {m.user[0].toUpperCase()}
                </div>
                <div className={`max-w-[75%] flex flex-col gap-0.5 ${m.isMe?'items-end':'items-start'}`}>
                  <span className="text-[10px] text-slate-500">{m.isMe?'Du':m.user} · {m.time}</span>
                  <div className={`px-3 py-2 rounded-2xl text-sm ${m.isMe?'bg-[#6c63ff] text-white rounded-tr-sm':'bg-[#1a1a27] text-slate-200 rounded-tl-sm'}`}>
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
            <div ref={btm}/>
          </div>
          <div className="p-3 border-t border-[#22223a] flex gap-2">
            <input ref={inp} type="text" value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>e.key==='Enter'&&send()}
              placeholder="Schreib etwas… (+2🪙)"
              className="flex-1 bg-[#1a1a27] border border-[#22223a] rounded-xl px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#6c63ff]/50"/>
            <button onClick={send} disabled={!input.trim()}
              className="w-9 h-9 rounded-xl bg-[#6c63ff] hover:bg-[#5a52e8] disabled:opacity-40 flex items-center justify-center flex-shrink-0">
              <Send size={14} className="text-white"/>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatUp{0%{transform:translateY(0) scale(1);opacity:1;}100%{transform:translateY(-100px) scale(1.5);opacity:0;}}
      `}</style>
    </div>
  );
}
