import { useState, useEffect, useRef } from 'react';
import { Tv, Send, Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react';
import { useCoins } from '../context/CoinContext';
import { matches } from '../data/matches';

const FAKE_USERS = ['MaxFan','SportKing','GoalHunter','BayernFan','BVBler','TorJäger','UltraKurve'];
const FAKE_MSGS  = ['Wahnsinn! 🔥','Was für ein Tor!','Come on!','Der Schiri ist blind!','Unglaublich 😱','Kämpft weiter 💪','Abseits!!!','Hammer Freistoß!','TOOOOR 🎉','Weltklasse! ⭐','Super Flanke ⚽'];
const HOME_NAMES = ['Neuer','Kimmich','Upamecano','Kim','Davies','Müller','Goretzka','Musiala','Sané','Coman','Kane'];
const AWAY_NAMES = ['Lunin','Carvajal','Rüdiger','Alaba','Mendy','Valverde','Tchouaméni','Kroos','Bellingham','Rodrygo','Vinicius'];

interface Msg { id:number; user:string; text:string; time:string; isMe:boolean; }
interface FE  { id:number; emoji:string; x:number; }
let mid=1, fid=1;
const fmt=(d:Date)=>d.toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'});

/* ─── Perspective camera (high side-stand angle like TV) ─── */
const CAM = { cx:50, cy:200, cz:38, fov:380 };

function project(wx:number, wy:number, camX:number) {
  const rx = wx - camX;
  const ry = wy - CAM.cy;
  const rz = 0  - CAM.cz;
  const dz = CAM.fov / Math.max(-rz + CAM.fov + wy * 0.8, 8);
  return {
    sx: 50 + rx * dz,
    sy: 62 + ry * dz * 0.55 - wy * 0.28,
    scale: Math.max(0.28, Math.min(2.2, dz))
  };
}

/* ─── Realistic TV-broadcast player ─── */
function PPlayer({ wx,wy,color,kit2,num,name,hasBall,camX,frame,id }:
  {wx:number;wy:number;color:string;kit2:string;num:string;name:string;hasBall:boolean;camX:number;frame:number;id:number}) {

  const {sx,sy,scale} = project(wx,wy,camX);
  const s = scale;
  /* depth-of-field: far players get blurred */
  const dof = Math.max(0, (0.55 - scale) * 3.5);

  /* running cycle — offset per player id so they don't all sync */
  const t = (frame + id * 17) * 0.18;
  const legSwing = Math.sin(t) * 9;
  const armSwing = Math.cos(t) * 7;

  /* skin tones variety */
  const skins = ['#d4a574','#c8956c','#b07040','#e8c49a','#8b5e3c'];
  const skin = skins[id % skins.length];

  /* shirt gradient id per player */
  const gid = `kg${id}`;
  const sid = `sk${id}`;

  return (
    <g transform={`translate(${sx},${sy}) scale(${s})`}
       style={dof > 0.2 ? {filter:`blur(${dof.toFixed(1)}px)`} : undefined}>
      <defs>
        {/* jersey gradient — light from above-left */}
        <linearGradient id={gid} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1"/>
          <stop offset="60%" stopColor={color} stopOpacity="0.85"/>
          <stop offset="100%" stopColor="rgba(0,0,0,0.6)" stopOpacity="1"/>
        </linearGradient>
        {/* skin gradient */}
        <radialGradient id={sid} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor={skin} stopOpacity="1"/>
          <stop offset="100%" stopColor="#7a4020" stopOpacity="1"/>
        </radialGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="0" cy="13" rx="4.5" ry="1.2" fill="rgba(0,0,0,0.35)"/>

      {/* ── LEGS ── */}
      {/* back leg */}
      <g transform={`rotate(${-legSwing * 0.7},0,4)`}>
        {/* thigh */}
        <rect x="-1.1" y="4" width="2.2" height="4.2" rx="1" fill="#111"/>
        {/* shin */}
        <rect x="-1" y="7.5" width="2" height="3.8" rx="0.9" fill="#1a1a1a"/>
        {/* sock */}
        <rect x="-1" y="9.5" width="2" height="2.5" rx="0.7" fill="white" opacity="0.85"/>
        {/* boot */}
        <ellipse cx="0" cy="12.2" rx="1.8" ry="0.9" fill="#1a1a1a"/>
      </g>
      {/* front leg */}
      <g transform={`rotate(${legSwing},0,4)`}>
        <rect x="-1.2" y="4" width="2.4" height="4.2" rx="1" fill="#222"/>
        <rect x="-1.1" y="7.5" width="2.2" height="3.8" rx="0.9" fill="#2a2a2a"/>
        <rect x="-1.1" y="9.5" width="2.2" height="2.5" rx="0.7" fill="white" opacity="0.9"/>
        <ellipse cx="0" cy="12.2" rx="2" ry="1" fill="#111"/>
      </g>

      {/* ── SHORTS ── */}
      <rect x="-3.2" y="3.2" width="6.4" height="3.5" rx="1.2"
        fill={kit2} opacity="0.95"/>
      {/* shorts highlight */}
      <rect x="-2.5" y="3.5" width="1.5" height="2" rx="0.6"
        fill="white" opacity="0.12"/>

      {/* ── JERSEY ── */}
      <rect x="-4" y="-3" width="8" height="7" rx="2"
        fill={`url(#${gid})`}/>
      {/* collar */}
      <path d="M-1.5,-3 Q0,-1.5 1.5,-3" fill="none" stroke={kit2} strokeWidth="1.2"/>
      {/* jersey highlight (light sheen) */}
      <rect x="-3" y="-2.5" width="2.2" height="5" rx="1"
        fill="white" opacity="0.08"/>
      {/* number */}
      <text x="0.3" y="2.2" textAnchor="middle" fill="white"
        fontSize="3" fontWeight="bold" opacity="0.92"
        fontFamily="Arial,sans-serif">{num}</text>

      {/* ── ARMS ── */}
      {/* left arm */}
      <g transform={`rotate(${-armSwing},-4,0)`}>
        <rect x="-5.8" y="-2" width="2.2" height="4.5" rx="1"
          fill={`url(#${gid})`}/>
        {/* forearm skin */}
        <rect x="-5.8" y="1.5" width="2.2" height="2" rx="0.9"
          fill={skin} opacity="0.9"/>
      </g>
      {/* right arm */}
      <g transform={`rotate(${armSwing},4,0)`}>
        <rect x="3.6" y="-2" width="2.2" height="4.5" rx="1"
          fill={`url(#${gid})`}/>
        <rect x="3.6" y="1.5" width="2.2" height="2" rx="0.9"
          fill={skin} opacity="0.9"/>
      </g>

      {/* ── NECK ── */}
      <rect x="-1.2" y="-5" width="2.4" height="2.5" rx="1"
        fill={skin} opacity="0.95"/>

      {/* ── HEAD ── */}
      <circle cx="0" cy="-8" r="3.8" fill={`url(#${sid})`}/>
      {/* face shadow */}
      <ellipse cx="0.5" cy="-7.5" rx="2.5" ry="2.8"
        fill="rgba(0,0,0,0.08)"/>
      {/* eyes subtle */}
      <circle cx="-1.2" cy="-8.2" r="0.45" fill="rgba(0,0,0,0.6)"/>
      <circle cx="1.2"  cy="-8.2" r="0.45" fill="rgba(0,0,0,0.6)"/>
      {/* hair */}
      <path d={`M-3.8,-8 Q-3.5,-12.5 0,-12.8 Q3.5,-12.5 3.8,-8`}
        fill="#2c1a08" opacity="0.92"/>
      {/* hair side */}
      <path d={`M-3.8,-8 Q-4.2,-9 -3.2,-10`}
        fill="#2c1a08" opacity="0.7"/>

      {/* ── BALL (if has it) ── */}
      {hasBall && (
        <g transform="translate(5,13)">
          <ellipse cx="0" cy="2" rx="2.5" ry="0.8" fill="rgba(0,0,0,0.3)"/>
          <circle cx="0" cy="0" r="2.2" fill="white" stroke="#555" strokeWidth="0.5"/>
          {/* pentagon pattern */}
          <circle cx="0" cy="0" r="0.9" fill="#1a1a1a"/>
          <line x1="0" y1="-2.2" x2="0" y2="-0.9" stroke="#1a1a1a" strokeWidth="0.35"/>
          <line x1="2.1" y1="0.7" x2="0.85" y2="0.45" stroke="#1a1a1a" strokeWidth="0.35"/>
          <line x1="-2.1" y1="0.7" x2="-0.85" y2="0.45" stroke="#1a1a1a" strokeWidth="0.35"/>
        </g>
      )}

      {/* ── NAME TAG (broadcast style) ── */}
      <rect x="-7" y="15.5" width="14" height="4" rx="1"
        fill="rgba(0,0,0,0.72)"/>
      <rect x="-7" y="15.5" width="3" height="4" rx="1"
        fill={color} opacity="0.9"/>
      <text x="0" y="18.6" textAnchor="middle" fill="white"
        fontSize="2.8" fontWeight="bold" fontFamily="Arial,sans-serif">{name}</text>
    </g>
  );
}

/* ─── Live pitch ─── */
function LivePitch({ match, playing }:{match:typeof matches[0]; playing:boolean}) {
  const initPlayers = ()=>[
    {id:0, team:0, x:5,  y:0,  dx:0,    dy:0,    nm:HOME_NAMES[0],  nu:'1'},
    {id:1, team:0, x:20, y:-28,dx:0.08, dy:0.04, nm:HOME_NAMES[1],  nu:'5'},
    {id:2, team:0, x:20, y:-9, dx:0.09, dy:0.07, nm:HOME_NAMES[2],  nu:'4'},
    {id:3, team:0, x:20, y:9,  dx:0.09, dy:-0.07,nm:HOME_NAMES[3],  nu:'3'},
    {id:4, team:0, x:20, y:28, dx:0.08, dy:-0.04,nm:HOME_NAMES[4],  nu:'19'},
    {id:5, team:0, x:37, y:-20,dx:0.18, dy:0.09, nm:HOME_NAMES[5],  nu:'25'},
    {id:6, team:0, x:37, y:0,  dx:0.18, dy:-0.09,nm:HOME_NAMES[6],  nu:'8'},
    {id:7, team:0, x:37, y:20, dx:0.18, dy:0.09, nm:HOME_NAMES[7],  nu:'42'},
    {id:8, team:0, x:53, y:-24,dx:0.28, dy:0.09, nm:HOME_NAMES[8],  nu:'10'},
    {id:9, team:0, x:53, y:24, dx:0.28, dy:-0.09,nm:HOME_NAMES[9],  nu:'11'},
    {id:10,team:0, x:57, y:0,  dx:0.32, dy:0.04, nm:HOME_NAMES[10], nu:'9'},
    {id:11,team:1, x:95, y:0,  dx:0,    dy:0,    nm:AWAY_NAMES[0],  nu:'1'},
    {id:12,team:1, x:80, y:-28,dx:-0.08,dy:0.04, nm:AWAY_NAMES[1],  nu:'2'},
    {id:13,team:1, x:80, y:-9, dx:-0.09,dy:0.07, nm:AWAY_NAMES[2],  nu:'22'},
    {id:14,team:1, x:80, y:9,  dx:-0.09,dy:-0.07,nm:AWAY_NAMES[3],  nu:'4'},
    {id:15,team:1, x:80, y:28, dx:-0.08,dy:-0.04,nm:AWAY_NAMES[4],  nu:'23'},
    {id:16,team:1, x:63, y:-20,dx:-0.18,dy:0.09, nm:AWAY_NAMES[5],  nu:'15'},
    {id:17,team:1, x:63, y:0,  dx:-0.18,dy:-0.09,nm:AWAY_NAMES[6],  nu:'8'},
    {id:18,team:1, x:63, y:20, dx:-0.18,dy:0.09, nm:AWAY_NAMES[7],  nu:'14'},
    {id:19,team:1, x:47, y:-24,dx:-0.28,dy:0.09, nm:AWAY_NAMES[8],  nu:'5'},
    {id:20,team:1, x:47, y:24, dx:-0.28,dy:-0.09,nm:AWAY_NAMES[9],  nu:'11'},
    {id:21,team:1, x:43, y:0,  dx:-0.32,dy:0.04, nm:AWAY_NAMES[10], nu:'9'},
  ];

  const [ppos, setPpos]    = useState(initPlayers);
  const [ball, setBall]    = useState({x:50,y:0,vx:0.45,vy:0.22});
  const [camX, setCamX]    = useState(50);
  const [homeScore,setHS]  = useState(match.homeScore??0);
  const [awayScore,setAS]  = useState(match.awayScore??0);
  const [minute,setMin]    = useState(match.minute??1);
  const [goalMsg,setGoal]  = useState('');
  const [frame,setFrame]   = useState(0);
  const rafRef  = useRef<number>(0);
  const frm     = useRef(0);
  const nearest = useRef(0);
  const ballRef = useRef({x:50,y:0,vx:0.45,vy:0.22});

  useEffect(()=>{
    setHS(match.homeScore??0); setAS(match.awayScore??0);
    setMin(match.minute??1);   setPpos(initPlayers());
    frm.current=0;
  },[match.id]);

  useEffect(()=>{
    if(!playing){cancelAnimationFrame(rafRef.current);return;}
    function tick(){
      frm.current++;
      // ball
      ballRef.current = (prev=>{
        let{x,y,vx,vy}=prev;
        x+=vx; y+=vy;
        if(x<2||x>98){vx=-vx*0.88; x=Math.max(2,Math.min(98,x));}
        if(y<-37||y>37){vy=-vy*0.88; y=Math.max(-37,Math.min(37,y));}
        if(Math.random()<0.018){vx+=(Math.random()-0.5)*0.6; vy+=(Math.random()-0.5)*0.4;}
        const sp=Math.sqrt(vx*vx+vy*vy);
        if(sp>3.8){vx=vx/sp*3.8; vy=vy/sp*3.8;}
        return{x,y,vx,vy};
      })(ballRef.current);
      setBall({...ballRef.current});

      setPpos(prev=>{
        const bx=ballRef.current.x, by=ballRef.current.y;
        let md=9999,mi=0;
        prev.forEach((p,i)=>{const d=Math.hypot(p.x-bx,p.y-by);if(d<md){md=d;mi=i;}});
        nearest.current=mi;
        return prev.map((p,i)=>{
          let{x,y,dx,dy}=p;
          let ndx=dx,ndy=dy;
          if(i===mi){
            const d=Math.hypot(bx-x,by-y);
            if(d>2.5){ndx=(bx-x)/d*0.5; ndy=(by-y)/d*0.4;}
          } else {
            ndx=dx+(Math.random()-0.5)*0.055;
            ndy=dy+(Math.random()-0.5)*0.055;
            ndx=Math.max(-0.5,Math.min(0.5,ndx));
            ndy=Math.max(-0.5,Math.min(0.5,ndy));
          }
          x+=ndx; y+=ndy;
          if(x<2||x>98){ndx=-ndx; x=Math.max(2,Math.min(98,x));}
          if(y<-37||y>37){ndy=-ndy; y=Math.max(-37,Math.min(37,y));}
          return{...p,x,y,dx:ndx,dy:ndy};
        });
      });

      setCamX(cx=>cx+(ballRef.current.x-cx)*0.035);
      setFrame(frm.current);
      if(frm.current%60===0) setMin(m=>Math.min(90,m+1));
      if(frm.current>300&&frm.current%1800===0&&Math.random()<0.45){
        const home=Math.random()>0.5;
        if(home) setHS(s=>s+1); else setAS(s=>s+1);
        const arr=home?HOME_NAMES:AWAY_NAMES;
        const scorer=arr[Math.floor(Math.random()*arr.length)];
        setGoal(`⚽ TOR! ${scorer}`);
        setTimeout(()=>setGoal(''),5000);
      }
      rafRef.current=requestAnimationFrame(tick);
    }
    rafRef.current=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(rafRef.current);
  },[playing]);

  function projP(wx:number,wy:number){
    const {sx,sy}=project(wx,wy,camX);
    return `${sx.toFixed(2)},${sy.toFixed(2)}`;
  }

  // pitch lines (world coords: x=0..100, y=-38..38)
  const pitchLines=[
    [[2,-38],[2,38],[98,38],[98,-38],[2,-38]],   // boundary
    [[50,-38],[50,38]],                           // halfway
    [[2,-18],[18,-18],[18,18],[2,18]],            // left pen box
    [[82,-18],[98,-18],[98,18],[82,18]],          // right pen box
    [[2,-8],[7,-8],[7,8],[2,8]],                  // left 6-yard
    [[93,-8],[98,-8],[98,8],[93,8]],              // right 6-yard
    [[2,-8],[0,-8],[0,8],[2,8]],                  // left goal
    [[98,-8],[100,-8],[100,8],[98,8]],            // right goal
  ];

  const sorted = [...ppos].sort((a,b)=>a.y-b.y);

  return(
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#1a1a2a]"
      style={{paddingBottom:'56.25%', background:'#060810'}}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet">
        <defs>
          {/* stadium lights gradient */}
          <radialGradient id="stadLight" cx="50%" cy="30%" r="75%">
            <stop offset="0%"   stopColor="#3aaa3a" stopOpacity="1"/>
            <stop offset="60%"  stopColor="#267a26" stopOpacity="1"/>
            <stop offset="100%" stopColor="#174d17" stopOpacity="1"/>
          </radialGradient>
          {/* vignette */}
          <radialGradient id="vg" cx="50%" cy="55%" r="65%">
            <stop offset="45%" stopColor="transparent"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0.7)"/>
          </radialGradient>
          {/* crowd gradient */}
          <linearGradient id="standG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#0d0d18"/>
            <stop offset="100%" stopColor="#181828"/>
          </linearGradient>
        </defs>

        {/* ── SKY / UPPER STAND ── */}
        <rect x="0" y="0" width="100" height="32" fill="url(#standG)"/>

        {/* stadium arch lights */}
        <ellipse cx="20" cy="2" rx="4" ry="2" fill="#fffbe0" opacity="0.12"/>
        <ellipse cx="50" cy="1" rx="5" ry="2" fill="#fffbe0" opacity="0.15"/>
        <ellipse cx="80" cy="2" rx="4" ry="2" fill="#fffbe0" opacity="0.12"/>

        {/* crowd — layered rows */}
        {Array.from({length:200},(_,i)=>{
          const row = Math.floor(i/40);
          const col = i % 40;
          const colors=['#ef4444','#3b82f6','#f59e0b','#ffffff','#6366f1','#10b981','#f43f5e','#8b5cf6'];
          return(
            <circle key={i}
              cx={col*2.55+1.2+(row%2)*1.2}
              cy={3+row*4.2}
              r="1.1"
              fill={colors[(i*7+row*3)%colors.length]}
              opacity={0.55+row*0.05}/>
          );
        })}

        {/* stand railing */}
        <rect x="0" y="23.5" width="100" height="1.5" fill="#2a2a3a"/>
        <rect x="0" y="24.8" width="100" height="0.8" fill="#444" opacity="0.6"/>

        {/* ── PITCH SURFACE ── */}
        {/* base */}
        <rect x="0" y="24" width="100" height="76" fill="#1e6e1e"/>
        {/* mowing stripes — horizontal bands */}
        {Array.from({length:10},(_,i)=>(
          <rect key={i} x="0" y={24+i*7.6} width="100" height="3.8"
            fill={i%2===0?'#226e22':'#1e641e'} opacity="0.9"/>
        ))}
        {/* stadium lighting overlay */}
        <ellipse cx="50" cy="65" rx="58" ry="40" fill="url(#stadLight)" opacity="0.35"/>

        {/* ── PITCH LINES (projected) ── */}
        {pitchLines.map((pts,li)=>(
          <polyline key={li}
            points={pts.map(([wx,wy])=>projP(wx,wy)).join(' ')}
            fill="none" stroke="rgba(255,255,255,0.88)" strokeWidth="0.45"/>
        ))}

        {/* center spot */}
        {(()=>{const p=project(50,0,camX);return<circle cx={p.sx} cy={p.sy} r="0.4" fill="white" opacity="0.8"/>})()}

        {/* center circle */}
        {Array.from({length:32},(_,i)=>{
          const a1=i/32*Math.PI*2, a2=(i+1)/32*Math.PI*2;
          const r=10, rx=0.45;
          const p1=project(50+Math.cos(a1)*r,Math.sin(a1)*r*rx,camX);
          const p2=project(50+Math.cos(a2)*r,Math.sin(a2)*r*rx,camX);
          return<line key={i} x1={p1.sx} y1={p1.sy} x2={p2.sx} y2={p2.sy}
            stroke="rgba(255,255,255,0.82)" strokeWidth="0.42"/>;
        })}

        {/* ── PLAYERS (back-to-front depth sort) ── */}
        {sorted.map(p=>{
          const isNearest = ppos.indexOf(ppos.find(q=>q.id===p.id)!) === nearest.current;
          const bd = Math.hypot(p.x-ball.x,p.y-ball.y);
          return(
            <PPlayer key={p.id}
              wx={p.x} wy={p.y}
              color={p.team===0?'#c8102e':'#003087'}
              kit2={p.team===0?'#8b0000':'#00205b'}
              num={p.nu} name={p.nm}
              hasBall={isNearest&&bd<6}
              camX={camX}
              frame={frame}
              id={p.id}/>
          );
        })}

        {/* ── BALL ── */}
        {(()=>{
          const {sx,sy,scale}=project(ball.x,ball.y,camX);
          const bs=Math.max(0.4,Math.min(1.6,scale))*1.9;
          const spin=(frame*0.08)%(Math.PI*2);
          return(
            <g>
              <ellipse cx={sx} cy={sy+bs*0.5} rx={bs*1.1} ry={bs*0.35} fill="rgba(0,0,0,0.32)"/>
              <circle cx={sx} cy={sy} r={bs} fill="white" stroke="#444" strokeWidth="0.35"/>
              {/* spin pattern */}
              <path d={`M${sx+Math.cos(spin)*bs*0.4},${sy+Math.sin(spin)*bs*0.4} Q${sx},${sy} ${sx+Math.cos(spin+2)*bs*0.5},${sy+Math.sin(spin+2)*bs*0.5}`}
                fill="none" stroke="#1a1a1a" strokeWidth="0.45" opacity="0.7"/>
              <circle cx={sx} cy={sy} r={bs*0.35} fill="#1a1a1a" opacity="0.4"/>
            </g>
          );
        })()}

        {/* ── VIGNETTE ── */}
        <rect x="0" y="0" width="100" height="100" fill="url(#vg)"/>

        {/* ── FILM GRAIN ── */}
        <rect x="0" y="0" width="100" height="100"
          fill="transparent"
          style={{
            backgroundImage:'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
          }}
          opacity="0.35"/>
      </svg>

      {/* ── TV BROADCAST OVERLAYS ── */}
      {/* Score bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <div className="flex items-stretch overflow-hidden rounded-b-2xl shadow-2xl border border-white/10"
          style={{backdropFilter:'blur(6px)'}}>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#c8102e]">
            <span className="text-white text-lg">{match.homeTeam.emoji}</span>
            <span className="text-white font-black text-sm tracking-wide">{match.homeTeam.shortName}</span>
          </div>
          <div className="flex items-center px-5 py-1 bg-black/90">
            <span className="text-white font-black text-3xl tabular-nums tracking-widest">
              {homeScore}&nbsp;–&nbsp;{awayScore}
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#003087]">
            <span className="text-white font-black text-sm tracking-wide">{match.awayTeam.shortName}</span>
            <span className="text-white text-lg">{match.awayTeam.emoji}</span>
          </div>
        </div>
      </div>

      {/* Bottom broadcast bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <div className="flex items-end justify-between px-3 pb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse inline-block"/>
              LIVE
            </div>
            <div className="bg-black/85 text-white text-xs font-black px-3 py-1.5 rounded-lg">
              {minute}'
            </div>
          </div>
          <div className="bg-black/75 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg">
            {match.competitionEmoji} {match.competition}
          </div>
        </div>
        {/* ticker strip */}
        <div className="bg-[#6c63ff]/90 text-white text-[11px] font-bold px-3 py-1 flex items-center gap-2">
          <span className="flex-shrink-0">⚽ SPORT TV</span>
          <span className="opacity-40">│</span>
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

      {/* Paused overlay */}
      {!playing&&(
        <div className="absolute inset-0 bg-black/75 flex items-center justify-center z-30 rounded-2xl">
          <div className="text-white text-center">
            <Play size={60} className="mx-auto mb-3 opacity-90"/>
            <p className="text-sm font-bold opacity-70">Drücke Play</p>
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
          <p className="text-slate-500 text-sm">TV-Kamera · Echte Spieler-Figuren · Chat</p>
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
