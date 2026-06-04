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

/* ── Camera projection (elevated side-stand, like TV) ── */
const CAM = { cx:50, cy:200, cz:38, fov:380 };
function project(wx:number, wy:number, camX:number) {
  const rx = wx - camX;
  const dz = CAM.fov / Math.max(CAM.fov + wy * 0.82, 8);
  return {
    sx: 50 + rx * dz,
    sy: 62 - wy * 0.3 * dz,
    scale: Math.max(0.28, Math.min(2.4, dz))
  };
}

/* ── Skin tones ── */
const SKINS = ['#d4956a','#c07840','#8b5530','#e8bb88','#b06030'];

/* ── Realistic human figure via SVG paths ── */
function PPlayer({wx,wy,color,kitShorts,num,name,hasBall,camX,frame,id}:{
  wx:number;wy:number;color:string;kitShorts:string;num:string;
  name:string;hasBall:boolean;camX:number;frame:number;id:number
}) {
  const {sx,sy,scale} = project(wx,wy,camX);
  const skin = SKINS[id % SKINS.length];
  const dof  = Math.max(0, (0.52 - scale) * 4);

  /* running cycle: each player offset so they don't sync */
  const phase = (frame * 0.14 + id * 1.3) % (Math.PI * 2);
  const lSwing = Math.sin(phase) * 22;         /* front leg angle */
  const rSwing = Math.sin(phase + Math.PI) * 22; /* back leg angle */
  const lArm   = Math.sin(phase + Math.PI) * 18;
  const rArm   = Math.sin(phase) * 18;

  /* gradient IDs unique per player */
  const gJ = `gJ${id}`, gS = `gS${id}`, gH = `gH${id}`;

  return (
    <g transform={`translate(${sx.toFixed(1)},${sy.toFixed(1)}) scale(${scale.toFixed(3)})`}
       style={dof > 0.3 ? {filter:`blur(${dof.toFixed(1)}px)`} : undefined}>
      <defs>
        <linearGradient id={gJ} x1="0%" y1="0%" x2="30%" y2="100%">
          <stop offset="0%"   stopColor={color}/>
          <stop offset="100%" stopColor={`color-mix(in srgb,${color} 60%,#000)`}/>
        </linearGradient>
        <radialGradient id={gH} cx="38%" cy="32%" r="58%">
          <stop offset="0%"   stopColor={skin}/>
          <stop offset="100%" stopColor={`color-mix(in srgb,${skin} 60%,#000)`}/>
        </radialGradient>
        <linearGradient id={gS} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor={kitShorts}/>
          <stop offset="100%" stopColor={`color-mix(in srgb,${kitShorts} 50%,#000)`}/>
        </linearGradient>
      </defs>

      {/* ── GROUND SHADOW ── */}
      <ellipse cx="0" cy="14.5" rx="5" ry="1.3" fill="rgba(0,0,0,0.38)"/>

      {/* ── BACK LEG ── */}
      <g transform={`rotate(${rSwing}, 0.8, 5)`} style={{transformOrigin:'0.8px 5px'}}>
        {/* thigh */}
        <path d="M0,4 C-0.5,4 -1.5,4.5 -1.8,9 C-1.6,9.5 -0.2,9.5 0.4,9 C0.2,5.5 0.8,4.5 0,4Z"
          fill={`color-mix(in srgb,${skin} 55%,#222)`}/>
        {/* shin */}
        <path d="M-1.8,9 C-2,10.5 -2.5,12.5 -2.2,14 C-1.5,14.2 -0.5,14 0,13.5 C0,11.5 0.4,9.5 0.4,9Z"
          fill={`color-mix(in srgb,${skin} 45%,#111)`}/>
        {/* boot */}
        <path d="M-2.2,13.8 C-3.2,14.2 -3.8,14.8 -3.4,15.2 C-2,15.5 0.5,15.2 0.8,14.5 C0.5,13.8 -0.5,13.5 -2.2,13.8Z"
          fill="#1a1a1a"/>
        {/* white sock */}
        <path d="M-1.9,11.5 C-2.1,12.8 -2.4,13.5 -2.2,14 C-1.2,14.2 0,14 0,13.5 C0.1,12.5 0.1,11.5 0.4,11 C-0.4,10.8 -1.4,11 -1.9,11.5Z"
          fill="rgba(255,255,255,0.85)"/>
      </g>

      {/* ── FRONT LEG ── */}
      <g transform={`rotate(${lSwing}, -0.8, 5)`} style={{transformOrigin:'-0.8px 5px'}}>
        <path d="M0,4 C0.5,4 1.5,4.5 1.8,9 C1.6,9.5 0.2,9.5 -0.4,9 C-0.2,5.5 -0.8,4.5 0,4Z"
          fill={skin}/>
        <path d="M1.8,9 C2,10.5 2.5,12.5 2.2,14 C1.5,14.2 0.5,14 0,13.5 C0,11.5 -0.4,9.5 -0.4,9Z"
          fill={`color-mix(in srgb,${skin} 85%,#111)`}/>
        <path d="M2.2,13.8 C3.2,14.2 3.8,14.8 3.4,15.2 C2,15.5 -0.5,15.2 -0.8,14.5 C-0.5,13.8 0.5,13.5 2.2,13.8Z"
          fill="#111111"/>
        <path d="M1.9,11.5 C2.1,12.8 2.4,13.5 2.2,14 C1.2,14.2 0,14 0,13.5 C-0.1,12.5 -0.1,11.5 -0.4,11 C0.4,10.8 1.4,11 1.9,11.5Z"
          fill="white"/>
      </g>

      {/* ── SHORTS ── */}
      <path d="M-3.5,3.5 C-4,4 -4,7 -3,8 C-1,8.8 1,8.8 3,8 C4,7 4,4 3.5,3.5 C2,3 -2,3 -3.5,3.5Z"
        fill={`url(#${gS})`}/>

      {/* ── JERSEY / TORSO ── */}
      <path d="M-4.5,-2 C-5.5,-1 -5.5,3 -4,5 C-2,6 2,6 4,5 C5.5,3 5.5,-1 4.5,-2 C3,-4 -3,-4 -4.5,-2Z"
        fill={`url(#${gJ})`}/>
      {/* collar V */}
      <path d="M-1.8,-3.5 C-0.8,-2 0.8,-2 1.8,-3.5" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.7"/>
      {/* jersey light sheen */}
      <path d="M-4,-2 C-4.5,0 -3.5,4 -2,5 C-1,5 -0.5,4.5 -1,3.5 C-2,1.5 -3.5,-0.5 -3.5,-2Z"
        fill="rgba(255,255,255,0.09)"/>
      {/* number */}
      <text x="0.5" y="2.8" textAnchor="middle" fill="white"
        fontSize="2.9" fontWeight="bold" fontFamily="'Arial Narrow',Arial,sans-serif"
        style={{paintOrder:'stroke'}} stroke="rgba(0,0,0,0.3)" strokeWidth="0.5">{num}</text>

      {/* ── BACK ARM ── */}
      <g transform={`rotate(${lArm}, -4.5, 0)`} style={{transformOrigin:'-4.5px 0px'}}>
        <path d="M-4.5,0 C-6.5,-0.5 -7.5,1.5 -7,4.5 C-6.5,5 -5.5,4.5 -5,4 C-5.5,2 -5.5,0.5 -4.5,0Z"
          fill={`color-mix(in srgb,${color} 80%,#000)`}/>
        {/* forearm */}
        <path d="M-7,4.5 C-7.5,6 -7,7.5 -6,8 C-5.2,7.5 -4.8,6 -5,4 C-5.5,4.5 -6.5,5 -7,4.5Z"
          fill={skin}/>
      </g>

      {/* ── FRONT ARM ── */}
      <g transform={`rotate(${rArm}, 4.5, 0)`} style={{transformOrigin:'4.5px 0px'}}>
        <path d="M4.5,0 C6.5,-0.5 7.5,1.5 7,4.5 C6.5,5 5.5,4.5 5,4 C5.5,2 5.5,0.5 4.5,0Z"
          fill={`color-mix(in srgb,${color} 80%,#000)`}/>
        <path d="M7,4.5 C7.5,6 7,7.5 6,8 C5.2,7.5 4.8,6 5,4 C5.5,4.5 6.5,5 7,4.5Z"
          fill={skin}/>
      </g>

      {/* ── NECK ── */}
      <path d="M-1.5,-4.5 C-1.5,-2.5 -0.8,-2 0,-2 C0.8,-2 1.5,-2.5 1.5,-4.5 C0.8,-5 -0.8,-5 -1.5,-4.5Z"
        fill={skin}/>

      {/* ── HEAD ── */}
      <circle cx="0" cy="-8" r="3.6" fill={`url(#${gH})`}/>
      {/* face highlight */}
      <ellipse cx="-1" cy="-9" rx="1.5" ry="1.2" fill="rgba(255,255,255,0.1)"/>
      {/* eyes */}
      <circle cx="-1.3" cy="-8.3" r="0.38" fill="rgba(20,10,5,0.75)"/>
      <circle cx="1.1"  cy="-8.3" r="0.38" fill="rgba(20,10,5,0.75)"/>
      {/* nose bridge */}
      <path d="M0,-8.3 L0.2,-7.2" stroke="rgba(0,0,0,0.2)" strokeWidth="0.3" fill="none"/>
      {/* hair */}
      <path d="M-3.6,-8.5 C-3.8,-11.2 -2,-12.5 0,-12.6 C2,-12.5 3.8,-11.2 3.6,-8.5 C2.5,-8 -2.5,-8 -3.6,-8.5Z"
        fill="#241408" opacity="0.93"/>

      {/* ── BALL if nearest ── */}
      {hasBall&&(
        <g transform="translate(5.5,14)">
          <ellipse cx="0" cy="1.5" rx="2.3" ry="0.7" fill="rgba(0,0,0,0.3)"/>
          <circle cx="0" cy="0" r="2" fill="white"/>
          <path d="M0,-2 C0.8,-1.2 1.9,-0.3 1.7,0.7 C1.2,1.7 -1.2,1.7 -1.7,0.7 C-1.9,-0.3 -0.8,-1.2 0,-2Z"
            fill="#1a1a1a" opacity="0.65"/>
          <circle cx="0.6" cy="-0.5" r="0.4" fill="#333" opacity="0.5"/>
        </g>
      )}

      {/* ── NAME TAG ── */}
      <rect x="-7" y="17" width="14" height="4.2" rx="1.2" fill="rgba(0,0,0,0.78)"/>
      <rect x="-7" y="17" width="3.2" height="4.2" rx="1.2" fill={color} opacity="0.95"/>
      <text x="0.5" y="20.4" textAnchor="middle" fill="white"
        fontSize="2.8" fontWeight="bold" fontFamily="Arial,sans-serif">{name}</text>
    </g>
  );
}

/* ── Live pitch ── */
function LivePitch({ match, playing }:{match:typeof matches[0]; playing:boolean}) {
  const initPlayers = () => [
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

  const [ppos,setPpos]   = useState(initPlayers);
  const [ball,setBall]   = useState({x:50,y:0,vx:0.45,vy:0.22});
  const [camX,setCamX]   = useState(50);
  const [homeScore,setHS]= useState(match.homeScore??0);
  const [awayScore,setAS]= useState(match.awayScore??0);
  const [minute,setMin]  = useState(match.minute??1);
  const [goalMsg,setGoal]= useState('');
  const [frame,setFrame] = useState(0);
  const rafRef = useRef<number>(0);
  const frm    = useRef(0);
  const nearest= useRef(0);
  const ballRef= useRef({x:50,y:0,vx:0.45,vy:0.22});

  useEffect(()=>{
    setHS(match.homeScore??0);setAS(match.awayScore??0);
    setMin(match.minute??1);setPpos(initPlayers());frm.current=0;
  },[match.id]);

  useEffect(()=>{
    if(!playing){cancelAnimationFrame(rafRef.current);return;}
    function tick(){
      frm.current++;
      ballRef.current=(prev=>{
        let{x,y,vx,vy}=prev;
        x+=vx;y+=vy;
        if(x<2||x>98){vx=-vx*0.88;x=Math.max(2,Math.min(98,x));}
        if(y<-37||y>37){vy=-vy*0.88;y=Math.max(-37,Math.min(37,y));}
        if(Math.random()<0.018){vx+=(Math.random()-0.5)*0.6;vy+=(Math.random()-0.5)*0.4;}
        const sp=Math.sqrt(vx*vx+vy*vy);
        if(sp>3.8){vx=vx/sp*3.8;vy=vy/sp*3.8;}
        return{x,y,vx,vy};
      })(ballRef.current);
      setBall({...ballRef.current});
      setPpos(prev=>{
        const bx=ballRef.current.x,by=ballRef.current.y;
        let md=9999,mi=0;
        prev.forEach((p,i)=>{const d=Math.hypot(p.x-bx,p.y-by);if(d<md){md=d;mi=i;}});
        nearest.current=mi;
        return prev.map((p,i)=>{
          let{x,y,dx,dy}=p;let ndx=dx,ndy=dy;
          if(i===mi){const d=Math.hypot(bx-x,by-y);if(d>2.5){ndx=(bx-x)/d*0.5;ndy=(by-y)/d*0.4;}}
          else{ndx=dx+(Math.random()-0.5)*0.055;ndy=dy+(Math.random()-0.5)*0.055;
            ndx=Math.max(-0.5,Math.min(0.5,ndx));ndy=Math.max(-0.5,Math.min(0.5,ndy));}
          x+=ndx;y+=ndy;
          if(x<2||x>98){ndx=-ndx;x=Math.max(2,Math.min(98,x));}
          if(y<-37||y>37){ndy=-ndy;y=Math.max(-37,Math.min(37,y));}
          return{...p,x,y,dx:ndx,dy:ndy};
        });
      });
      setCamX(cx=>cx+(ballRef.current.x-cx)*0.035);
      setFrame(frm.current);
      if(frm.current%60===0)setMin(m=>Math.min(90,m+1));
      if(frm.current>300&&frm.current%1800===0&&Math.random()<0.45){
        const home=Math.random()>0.5;
        if(home)setHS(s=>s+1);else setAS(s=>s+1);
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

  const pitchLines=[
    [[2,-38],[2,38],[98,38],[98,-38],[2,-38]],
    [[50,-38],[50,38]],
    [[2,-18],[18,-18],[18,18],[2,18]],
    [[82,-18],[98,-18],[98,18],[82,18]],
    [[2,-8],[7,-8],[7,8],[2,8]],
    [[93,-8],[98,-8],[98,8],[93,8]],
    [[2,-8],[0,-8],[0,8],[2,8]],
    [[98,-8],[100,-8],[100,8],[98,8]],
  ];

  const sorted=[...ppos].sort((a,b)=>a.y-b.y);

  return(
    <div className="relative w-full rounded-2xl overflow-hidden border border-[#1a1a2a]"
      style={{paddingBottom:'56.25%',background:'#060810'}}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="stadLight" cx="50%" cy="30%" r="75%">
            <stop offset="0%"  stopColor="#3aaa3a"/>
            <stop offset="65%" stopColor="#267a26"/>
            <stop offset="100%" stopColor="#174d17"/>
          </radialGradient>
          <radialGradient id="vg" cx="50%" cy="55%" r="65%">
            <stop offset="45%" stopColor="transparent"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0.72)"/>
          </radialGradient>
          <linearGradient id="standG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#0a0a15"/>
            <stop offset="100%" stopColor="#15152a"/>
          </linearGradient>
        </defs>

        {/* STAND */}
        <rect x="0" y="0" width="100" height="30" fill="url(#standG)"/>
        {/* light spots */}
        <ellipse cx="18" cy="1.5" rx="5"  ry="1.8" fill="#fffae0" opacity="0.13"/>
        <ellipse cx="50" cy="0.8" rx="6"  ry="2"   fill="#fffae0" opacity="0.16"/>
        <ellipse cx="82" cy="1.5" rx="5"  ry="1.8" fill="#fffae0" opacity="0.13"/>

        {/* crowd */}
        {Array.from({length:210},(_,i)=>{
          const row=Math.floor(i/42), col=i%42;
          const colors=['#ef4444','#3b82f6','#f59e0b','#ffffff','#6366f1','#10b981','#f43f5e','#a78bfa'];
          return<circle key={i}
            cx={col*2.42+1+(row%2)*1.1} cy={2.8+row*4.5}
            r="1.15" fill={colors[(i*7+row*3)%colors.length]}
            opacity={0.5+row*0.06}/>;
        })}
        <rect x="0" y="22" width="100" height="1.8" fill="#252535"/>
        <rect x="0" y="23.5" width="100" height="0.8" fill="#555" opacity="0.5"/>

        {/* PITCH */}
        <rect x="0" y="23" width="100" height="77" fill="#1d6b1d"/>
        {Array.from({length:11},(_,i)=>(
          <rect key={i} x="0" y={23+i*7} width="100" height="3.5"
            fill={i%2===0?'#216921':'#1c641c'} opacity="0.88"/>
        ))}
        <ellipse cx="50" cy="65" rx="56" ry="38" fill="url(#stadLight)" opacity="0.32"/>

        {/* PITCH LINES */}
        {pitchLines.map((pts,li)=>(
          <polyline key={li}
            points={pts.map(([wx,wy])=>projP(wx,wy)).join(' ')}
            fill="none" stroke="rgba(255,255,255,0.86)" strokeWidth="0.42"/>
        ))}
        {(()=>{const p=project(50,0,camX);return<circle cx={p.sx} cy={p.sy} r="0.4" fill="white" opacity="0.8"/>;})()}
        {Array.from({length:32},(_,i)=>{
          const a1=i/32*Math.PI*2,a2=(i+1)/32*Math.PI*2,r=10,ry=0.44;
          const p1=project(50+Math.cos(a1)*r,Math.sin(a1)*r*ry,camX);
          const p2=project(50+Math.cos(a2)*r,Math.sin(a2)*r*ry,camX);
          return<line key={i} x1={p1.sx} y1={p1.sy} x2={p2.sx} y2={p2.sy}
            stroke="rgba(255,255,255,0.8)" strokeWidth="0.4"/>;
        })}

        {/* PLAYERS */}
        {sorted.map(p=>{
          const idx=ppos.findIndex(q=>q.id===p.id);
          const bd=Math.hypot(p.x-ball.x,p.y-ball.y);
          return<PPlayer key={p.id}
            wx={p.x} wy={p.y}
            color={p.team===0?'#c8102e':'#003087'}
            kitShorts={p.team===0?'#8b0000':'#001a4d'}
            num={p.nu} name={p.nm}
            hasBall={idx===nearest.current&&bd<6}
            camX={camX} frame={frame} id={p.id}/>;
        })}

        {/* BALL */}
        {(()=>{
          const {sx,sy,scale}=project(ball.x,ball.y,camX);
          const bs=Math.max(0.35,Math.min(1.5,scale))*1.9;
          const spin=frame*0.09%(Math.PI*2);
          return<g>
            <ellipse cx={sx} cy={sy+bs*0.5} rx={bs*1.1} ry={bs*0.32} fill="rgba(0,0,0,0.3)"/>
            <circle cx={sx} cy={sy} r={bs} fill="white" stroke="#555" strokeWidth="0.3"/>
            <path d={`M${sx+Math.cos(spin)*bs*0.45},${sy+Math.sin(spin)*bs*0.45} C${sx+Math.cos(spin+1)*bs*0.7},${sy+Math.sin(spin+1)*bs*0.7} ${sx+Math.cos(spin+2.2)*bs*0.7},${sy+Math.sin(spin+2.2)*bs*0.7} ${sx+Math.cos(spin+3)*bs*0.45},${sy+Math.sin(spin+3)*bs*0.45}`}
              fill="none" stroke="#222" strokeWidth="0.4" opacity="0.7"/>
            <circle cx={sx} cy={sy} r={bs*0.28} fill="#222" opacity="0.45"/>
          </g>;
        })()}

        {/* VIGNETTE */}
        <rect x="0" y="0" width="100" height="100" fill="url(#vg)"/>
      </svg>

      {/* SCORE BAR */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <div className="flex items-stretch overflow-hidden rounded-b-2xl shadow-2xl border border-white/10"
          style={{backdropFilter:'blur(8px)'}}>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#c8102e]">
            <span className="text-white text-lg leading-none">{match.homeTeam.emoji}</span>
            <span className="text-white font-black text-sm tracking-wide">{match.homeTeam.shortName}</span>
          </div>
          <div className="flex items-center px-5 py-1 bg-black/90">
            <span className="text-white font-black text-3xl tabular-nums tracking-widest">
              {homeScore}&nbsp;–&nbsp;{awayScore}
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#003087]">
            <span className="text-white font-black text-sm tracking-wide">{match.awayTeam.shortName}</span>
            <span className="text-white text-lg leading-none">{match.awayTeam.emoji}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM BROADCAST */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <div className="flex items-end justify-between px-3 pb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse inline-block"/>LIVE
            </div>
            <div className="bg-black/85 text-white text-xs font-black px-3 py-1.5 rounded-lg">{minute}'</div>
          </div>
          <div className="bg-black/75 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg">
            {match.competitionEmoji} {match.competition}
          </div>
        </div>
        <div className="bg-[#6c63ff]/90 text-white text-[11px] font-bold px-3 py-1 flex items-center gap-2">
          <span className="flex-shrink-0">⚽ SPORT TV</span>
          <span className="opacity-40">│</span>
          <span className="truncate">{match.homeTeam.name} vs {match.awayTeam.name} · {match.venue}</span>
        </div>
      </div>

      {goalMsg&&(
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <div className="bg-yellow-400 text-black font-black text-2xl px-10 py-4 rounded-2xl shadow-2xl animate-bounce border-4 border-yellow-600">
            {goalMsg}
          </div>
        </div>
      )}
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

/* ── Main page ── */
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
    const next=()=>{t=setTimeout(()=>{
      const u=FAKE_USERS[Math.floor(Math.random()*FAKE_USERS.length)];
      const m=FAKE_MSGS[Math.floor(Math.random()*FAKE_MSGS.length)];
      setMsgs(p=>[...p.slice(-60),{id:mid++,user:u,text:m,time:fmt(new Date()),isMe:false}]);
      next();
    },3000+Math.random()*3000);};
    next();return()=>clearTimeout(t);
  },[]);

  function send(){
    const t=input.trim();if(!t)return;
    setMsgs(p=>[...p,{id:mid++,user:'Du',text:t,time:fmt(new Date()),isMe:true}]);
    setInput('');dispatch({type:'ADD_COINS',amount:2});inp.current?.focus();
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
          <p className="text-slate-500 text-sm">TV-Kamera · Echte Spieler · Chat</p>
        </div>
        <div className="ml-auto text-amber-400 font-bold text-sm">🪙 {state.coins}</div>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {live.map(m=>(
          <button key={m.id} onClick={()=>setSel(m)}
            className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold transition-all ${
              sel?.id===m.id?'bg-red-500/20 border-red-500/50 text-white':'bg-[#12121a] border-[#22223a] text-slate-400 hover:border-red-500/30'}`}>
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
      <style>{`@keyframes floatUp{0%{transform:translateY(0) scale(1);opacity:1;}100%{transform:translateY(-100px) scale(1.5);opacity:0;}}`}</style>
    </div>
  );
}
