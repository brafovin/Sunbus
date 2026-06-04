import { useState, useEffect, useRef, useCallback } from 'react';
import { Tv, Send, Play, Pause, Radio } from 'lucide-react';
import { useCoins } from '../context/CoinContext';
import { matches } from '../data/matches';

const FAKE_USERS = ['MaxFan','SportKing','GoalHunter','BayernFan','BVBler','TorJäger','UltraKurve'];
const FAKE_MSGS  = ['Wahnsinn! 🔥','Was für ein Tor!','Come on!','Der Schiri ist blind!','Unglaublich 😱','Kämpft weiter 💪','Abseits!!!','Hammer Freistoß!','TOOOOR 🎉','Weltklasse! ⭐','Super Flanke ⚽'];
const HOME_NAMES = ['Neuer','Kimmich','Upamecano','Kim','Davies','Müller','Goretzka','Musiala','Sané','Coman','Kane'];
const AWAY_NAMES = ['Lunin','Carvajal','Rüdiger','Alaba','Mendy','Valverde','Tchouaméni','Kroos','Bellingham','Rodrygo','Vinicius'];
const SKINS = ['#d4956a','#c07840','#8b5530','#e8bb88','#b06030','#f0c898','#a07050'];

interface Msg { id:number; user:string; text:string; time:string; isMe:boolean; }
interface FE  { id:number; emoji:string; x:number; }
let mid=1, fid=1;
const fmt=(d:Date)=>d.toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'});

/* ── TV camera: side stand, ~40m height ── */
function project(wx:number,wy:number,camX:number,W:number,H:number){
  /* wx: 0..100 pitch length, wy: -38..38 pitch width */
  const PITCH_TOP_Y  = H * 0.30;   /* where far touchline appears */
  const PITCH_BOT_Y  = H * 0.86;   /* where near touchline appears */
  /* depth: wy=-38 is far (top of screen), wy=38 is near (bottom) */
  const t = (wy + 38) / 76;               /* 0=far, 1=near */
  const sy = PITCH_TOP_Y + t * (PITCH_BOT_Y - PITCH_TOP_Y);
  const scaleX = 0.45 + t * 0.55;        /* perspective squeeze */
  const rx = (wx - camX) / 100;
  const sx = W/2 + rx * W * scaleX;
  const scale = 0.22 + t * 0.55;
  return { sx, sy, scale };
}

/* ── Draw realistic broadcast player on canvas ── */
function drawPlayer(
  ctx:CanvasRenderingContext2D,
  px:number, py:number, scale:number,
  color:string, kitShorts:string, skin:string,
  num:string, name:string,
  phase:number, hasBall:boolean, isGK:boolean
){
  const H = 28 * scale;   /* total figure height in px */
  const x = px, y = py;

  ctx.save();
  ctx.translate(x, y);

  /* shadow */
  ctx.save();
  ctx.globalAlpha = 0.35;
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.ellipse(0, H*0.52, H*0.28, H*0.07, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.restore();

  /* running legs */
  const lSwing = Math.sin(phase) * 0.45;
  const rSwing = Math.sin(phase + Math.PI) * 0.45;

  /* back leg */
  ctx.save();
  ctx.rotate(rSwing);
  /* thigh */
  ctx.fillStyle = isGK ? '#f59e0b' : '#1a1a2a';
  ctx.beginPath();
  ctx.moveTo(-H*0.08, H*0.15);
  ctx.quadraticCurveTo(-H*0.12, H*0.32, -H*0.07, H*0.42);
  ctx.quadraticCurveTo(-H*0.02, H*0.44, H*0.03, H*0.42);
  ctx.quadraticCurveTo(H*0.04, H*0.32, H*0.05, H*0.15);
  ctx.closePath();
  ctx.fill();
  /* shin */
  ctx.fillStyle = '#111';
  ctx.beginPath();
  ctx.moveTo(-H*0.07, H*0.42);
  ctx.quadraticCurveTo(-H*0.1, H*0.54, -H*0.08, H*0.64);
  ctx.quadraticCurveTo(-H*0.04, H*0.66, H*0.01, H*0.64);
  ctx.quadraticCurveTo(H*0.03, H*0.54, H*0.03, H*0.42);
  ctx.closePath();
  ctx.fill();
  /* sock */
  ctx.fillStyle = 'rgba(255,255,255,0.88)';
  ctx.beginPath();
  ctx.moveTo(-H*0.08, H*0.55);
  ctx.quadraticCurveTo(-H*0.09, H*0.63, -H*0.08, H*0.64);
  ctx.quadraticCurveTo(-H*0.03, H*0.66, H*0.01, H*0.64);
  ctx.quadraticCurveTo(H*0.02, H*0.62, H*0.03, H*0.55);
  ctx.closePath();
  ctx.fill();
  /* boot */
  ctx.fillStyle = '#111';
  ctx.beginPath();
  ctx.ellipse(-H*0.04, H*0.65, H*0.13, H*0.05, -0.2, 0, Math.PI*2);
  ctx.fill();
  ctx.restore();

  /* front leg */
  ctx.save();
  ctx.rotate(lSwing);
  ctx.fillStyle = isGK ? '#f59e0b' : '#1a1a2a';
  ctx.beginPath();
  ctx.moveTo(-H*0.07, H*0.15);
  ctx.quadraticCurveTo(-H*0.13, H*0.32, -H*0.08, H*0.42);
  ctx.quadraticCurveTo(-H*0.01, H*0.45, H*0.05, H*0.42);
  ctx.quadraticCurveTo(H*0.06, H*0.32, H*0.06, H*0.15);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.moveTo(-H*0.08, H*0.42);
  ctx.quadraticCurveTo(-H*0.11, H*0.54, -H*0.09, H*0.64);
  ctx.quadraticCurveTo(-H*0.03, H*0.67, H*0.03, H*0.64);
  ctx.quadraticCurveTo(H*0.05, H*0.54, H*0.06, H*0.42);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(-H*0.09, H*0.55);
  ctx.quadraticCurveTo(-H*0.1, H*0.63, -H*0.09, H*0.64);
  ctx.quadraticCurveTo(-H*0.02, H*0.67, H*0.03, H*0.64);
  ctx.quadraticCurveTo(H*0.04, H*0.62, H*0.05, H*0.55);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#111';
  ctx.beginPath();
  ctx.ellipse(-H*0.03, H*0.66, H*0.14, H*0.05, 0.2, 0, Math.PI*2);
  ctx.fill();
  ctx.restore();

  /* shorts */
  ctx.fillStyle = kitShorts;
  ctx.beginPath();
  ctx.roundRect(-H*0.2, H*0.12, H*0.4, H*0.17, H*0.06);
  ctx.fill();

  /* jersey body */
  const jerseyGrad = ctx.createLinearGradient(-H*0.22, -H*0.05, H*0.15, H*0.3);
  jerseyGrad.addColorStop(0, lighten(color, 18));
  jerseyGrad.addColorStop(0.5, color);
  jerseyGrad.addColorStop(1, darken(color, 30));
  ctx.fillStyle = jerseyGrad;
  ctx.beginPath();
  ctx.moveTo(-H*0.22, -H*0.05);
  ctx.quadraticCurveTo(-H*0.26, H*0.06, -H*0.22, H*0.17);
  ctx.lineTo(H*0.22, H*0.17);
  ctx.quadraticCurveTo(H*0.26, H*0.06, H*0.22, -H*0.05);
  ctx.quadraticCurveTo(H*0.12, -H*0.16, 0, -H*0.17);
  ctx.quadraticCurveTo(-H*0.12, -H*0.16, -H*0.22, -H*0.05);
  ctx.fill();

  /* jersey sheen */
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(-H*0.2, -H*0.05);
  ctx.quadraticCurveTo(-H*0.22, H*0.05, -H*0.18, H*0.15);
  ctx.lineTo(-H*0.05, H*0.15);
  ctx.lineTo(-H*0.08, -H*0.14);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  /* number on jersey */
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.font = `bold ${H*0.18}px 'Arial Narrow',Arial,sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(num, 0, H*0.04);

  /* arms (left) */
  const armL = Math.sin(phase + Math.PI) * 0.35;
  ctx.save();
  ctx.rotate(armL);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(-H*0.22, -H*0.05);
  ctx.quadraticCurveTo(-H*0.36, H*0.02, -H*0.33, H*0.16);
  ctx.quadraticCurveTo(-H*0.27, H*0.18, -H*0.22, H*0.14);
  ctx.quadraticCurveTo(-H*0.24, H*0.04, -H*0.16, -H*0.02);
  ctx.closePath();
  ctx.fill();
  /* forearm skin */
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.moveTo(-H*0.33, H*0.16);
  ctx.quadraticCurveTo(-H*0.38, H*0.24, -H*0.34, H*0.28);
  ctx.quadraticCurveTo(-H*0.28, H*0.29, -H*0.24, H*0.22);
  ctx.quadraticCurveTo(-H*0.27, H*0.18, -H*0.28, H*0.14);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  /* arms (right) */
  const armR = Math.sin(phase) * 0.35;
  ctx.save();
  ctx.rotate(armR);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(H*0.22, -H*0.05);
  ctx.quadraticCurveTo(H*0.36, H*0.02, H*0.33, H*0.16);
  ctx.quadraticCurveTo(H*0.27, H*0.18, H*0.22, H*0.14);
  ctx.quadraticCurveTo(H*0.24, H*0.04, H*0.16, -H*0.02);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.moveTo(H*0.33, H*0.16);
  ctx.quadraticCurveTo(H*0.38, H*0.24, H*0.34, H*0.28);
  ctx.quadraticCurveTo(H*0.28, H*0.29, H*0.24, H*0.22);
  ctx.quadraticCurveTo(H*0.27, H*0.18, H*0.28, H*0.14);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  /* neck */
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.ellipse(0, -H*0.18, H*0.08, H*0.06, 0, 0, Math.PI*2);
  ctx.fill();

  /* head */
  const headGrad = ctx.createRadialGradient(-H*0.06, -H*0.32, 0, 0, -H*0.28, H*0.18);
  headGrad.addColorStop(0, lighten(skin, 15));
  headGrad.addColorStop(1, darken(skin, 20));
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.ellipse(0, -H*0.28, H*0.15, H*0.17, 0, 0, Math.PI*2);
  ctx.fill();

  /* hair */
  ctx.fillStyle = '#1e0e04';
  ctx.beginPath();
  ctx.ellipse(0, -H*0.38, H*0.15, H*0.09, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(-H*0.12, -H*0.3, H*0.06, H*0.1, -0.4, 0, Math.PI*2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(H*0.12, -H*0.3, H*0.06, H*0.1, 0.4, 0, Math.PI*2);
  ctx.fill();

  /* eyes */
  ctx.fillStyle = 'rgba(0,0,0,0.65)';
  ctx.beginPath(); ctx.arc(-H*0.07, -H*0.27, H*0.025, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc( H*0.05, -H*0.27, H*0.025, 0, Math.PI*2); ctx.fill();

  /* name tag */
  const tagW = H * 0.95;
  const tagH = H * 0.18;
  const tagY = H * 0.58;
  ctx.fillStyle = 'rgba(0,0,0,0.78)';
  ctx.beginPath();
  ctx.roundRect(-tagW/2, tagY, tagW, tagH, H*0.04);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(-tagW/2, tagY, tagW*0.28, tagH, [H*0.04, 0, 0, H*0.04]);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${H*0.13}px Arial,sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name, H*0.02, tagY + tagH/2);

  /* ball near feet */
  if(hasBall){
    const bx = H*0.32, by = H*0.52;
    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.beginPath(); ctx.ellipse(bx, by+H*0.06, H*0.12, H*0.04, 0, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(bx, by, H*0.1, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#333'; ctx.lineWidth = H*0.015;
    ctx.beginPath(); ctx.arc(bx, by, H*0.1, 0, Math.PI*2); ctx.stroke();
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(bx, by, H*0.04, 0, Math.PI*2); ctx.fill();
  }

  ctx.restore();
}

/* colour helpers */
function lighten(hex:string, amt:number){
  const n=parseInt(hex.replace('#',''),16);
  const r=Math.min(255,((n>>16)&255)+amt);
  const g=Math.min(255,((n>>8)&255)+amt);
  const b=Math.min(255,(n&255)+amt);
  return `rgb(${r},${g},${b})`;
}
function darken(hex:string, amt:number){
  const n=parseInt(hex.replace('#',''),16);
  const r=Math.max(0,((n>>16)&255)-amt);
  const g=Math.max(0,((n>>8)&255)-amt);
  const b=Math.max(0,(n&255)-amt);
  return `rgb(${r},${g},${b})`;
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
  const [,setBall]   = useState({x:50,y:0,vx:0.45,vy:0.22});
  const [,setCamX]   = useState(50);
  const [homeScore,setHS]= useState(match.homeScore??0);
  const [awayScore,setAS]= useState(match.awayScore??0);
  const [minute,setMin]  = useState(match.minute??1);
  const [goalMsg,setGoal]= useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const frm       = useRef(0);
  const nearest   = useRef(0);
  const ballRef   = useRef({x:50,y:0,vx:0.45,vy:0.22});
  const camXRef   = useRef(50);
  const pposRef   = useRef(ppos);
  const stateRef  = useRef({homeScore:match.homeScore??0,awayScore:match.awayScore??0,minute:match.minute??1});

  useEffect(()=>{pposRef.current=ppos;},[ppos]);

  useEffect(()=>{
    setHS(match.homeScore??0);setAS(match.awayScore??0);
    setMin(match.minute??1);const p=initPlayers();setPpos(p);pposRef.current=p;frm.current=0;
  },[match.id]);

  /* ── RENDER LOOP ── */
  const render = useCallback(()=>{
    const canvas=canvasRef.current; if(!canvas)return;
    const ctx=canvas.getContext('2d'); if(!ctx)return;
    const W=canvas.width, H=canvas.height;
    const pp=pposRef.current;
    const bl=ballRef.current;
    const cx=camXRef.current;

    ctx.clearRect(0,0,W,H);

    /* ── STADIUM BACKGROUND ── */
    const bgGrad=ctx.createLinearGradient(0,0,0,H*0.3);
    bgGrad.addColorStop(0,'#040410');
    bgGrad.addColorStop(1,'#0e0e20');
    ctx.fillStyle=bgGrad;
    ctx.fillRect(0,0,W,H*0.32);

    /* flood lights glow */
    [[0.12,0.02],[0.5,0.01],[0.88,0.02]].forEach(([fx,fy])=>{
      const lg=ctx.createRadialGradient(W*fx,H*fy,0,W*fx,H*fy,W*0.15);
      lg.addColorStop(0,'rgba(255,248,210,0.18)');
      lg.addColorStop(1,'rgba(255,248,210,0)');
      ctx.fillStyle=lg; ctx.fillRect(0,0,W,H*0.3);
    });

    /* crowd rows */
    const crowdColors=['#ef4444','#3b82f6','#fbbf24','#ffffff','#818cf8','#34d399','#f472b6','#a78bfa'];
    for(let row=0;row<5;row++){
      for(let col=0;col<55;col++){
        const ci=(col*7+row*3)%crowdColors.length;
        const bx=col*(W/54)+(row%2)*(W/108);
        const by=H*0.04+row*(H*0.046);
        const br=Math.max(1.2,W*0.008);
        ctx.fillStyle=crowdColors[ci];
        ctx.globalAlpha=0.52+row*0.06;
        ctx.beginPath(); ctx.ellipse(bx,by,br,br*0.85,0,0,Math.PI*2); ctx.fill();
        /* head */
        ctx.fillStyle='#d4956a';
        ctx.beginPath(); ctx.ellipse(bx,by-br*1.1,br*0.62,br*0.7,0,0,Math.PI*2); ctx.fill();
      }
    }
    ctx.globalAlpha=1;

    /* stand railing */
    const railY=H*0.27;
    ctx.fillStyle='#1a1a2e';
    ctx.fillRect(0,railY,W,H*0.02);
    const railGrad=ctx.createLinearGradient(0,railY,0,railY+H*0.012);
    railGrad.addColorStop(0,'#3a3a5a');
    railGrad.addColorStop(1,'#1a1a2e');
    ctx.fillStyle=railGrad;
    ctx.fillRect(0,railY,W,H*0.012);

    /* ── PITCH ── */
    /* base green */
    ctx.fillStyle='#1d6e1d';
    ctx.fillRect(0,H*0.27,W,H*0.73);

    /* mowing stripes — trapezoid perspective */
    for(let i=0;i<12;i++){
      const t0=i/12, t1=(i+1)/12;
      const y0=H*0.28+t0*(H*0.92-H*0.28);
      const y1=H*0.28+t1*(H*0.92-H*0.28);
      const scX0=0.38+t0*0.85, scX1=0.38+t1*0.85;
      ctx.fillStyle=i%2===0?'#216b21':'#1b611b';
      ctx.beginPath();
      ctx.moveTo(W/2-W*scX0/2,y0); ctx.lineTo(W/2+W*scX0/2,y0);
      ctx.lineTo(W/2+W*scX1/2,y1); ctx.lineTo(W/2-W*scX1/2,y1);
      ctx.closePath(); ctx.fill();
    }

    /* stadium light on pitch */
    const pitchLight=ctx.createRadialGradient(W/2,H*0.5,0,W/2,H*0.5,W*0.6);
    pitchLight.addColorStop(0,'rgba(255,255,220,0.07)');
    pitchLight.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=pitchLight; ctx.fillRect(0,H*0.27,W,H*0.73);

    /* ── PITCH LINES ── */
    function pp2(wx:number,wy:number){return project(wx,wy,cx,W,H);}
    function pitchLine(pts:[number,number][]){
      if(!ctx)return;
      ctx.beginPath();
      pts.forEach(([wx,wy],i)=>{
        const {sx,sy}=pp2(wx,wy);
        i===0?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy);
      });
      ctx.stroke();
    }
    ctx.strokeStyle='rgba(255,255,255,0.88)';
    ctx.lineWidth=Math.max(1,W*0.003);
    const lines:[number,number][][]=[
      [[2,-38],[98,-38],[98,38],[2,38],[2,-38]],
      [[50,-38],[50,38]],
      [[2,-18],[18,-18],[18,18],[2,18]],
      [[82,-18],[98,-18],[98,18],[82,18]],
      [[2,-9],[7,-9],[7,9],[2,9]],
      [[93,-9],[98,-9],[98,9],[93,9]],
      [[0,-9],[2,-9]],[[0,9],[2,9]],[[0,-9],[0,9]],
      [[100,-9],[98,-9]],[[100,9],[98,9]],[[100,-9],[100,9]],
    ];
    lines.forEach(l=>pitchLine(l));

    /* center circle */
    ctx.beginPath();
    const segs=40;
    for(let i=0;i<=segs;i++){
      const a=i/segs*Math.PI*2;
      const {sx,sy}=pp2(50+Math.cos(a)*10, Math.sin(a)*10*0.44);
      i===0?ctx.moveTo(sx,sy):ctx.lineTo(sx,sy);
    }
    ctx.stroke();

    /* center spot */
    const cs=pp2(50,0);
    ctx.fillStyle='white'; ctx.beginPath();
    ctx.arc(cs.sx,cs.sy,Math.max(2,W*0.004),0,Math.PI*2); ctx.fill();

    /* penalty spots */
    [[12,0],[88,0]].forEach(([wx,wy])=>{
      const ps=pp2(wx,wy);
      ctx.fillStyle='white'; ctx.beginPath();
      ctx.arc(ps.sx,ps.sy,Math.max(1.5,W*0.003),0,Math.PI*2); ctx.fill();
    });

    /* ── PLAYERS (sorted back→front by y) ── */
    type PP2={id:number;team:number;x:number;y:number;dx:number;dy:number;nm:string;nu:string};
    const sorted=[...(pp as PP2[])].sort((a,b)=>a.y-b.y);
    sorted.forEach((p:PP2)=>{
      const idx=(pp as PP2[]).findIndex((q:PP2)=>q.id===p.id);
      const {sx,sy,scale}=pp2(p.x,p.y);
      const phase=(frm.current*0.14+p.id*1.3)%(Math.PI*2);
      const bd=Math.hypot(p.x-bl.x,p.y-bl.y);
      /* depth of field blur (far players) */
      if(scale<0.55){
        ctx.filter=`blur(${((0.55-scale)*4).toFixed(1)}px)`;
      }
      drawPlayer(
        ctx, sx, sy, scale*0.75,
        p.team===0?'#c8102e':'#003087',
        p.team===0?'#7a0000':'#001560',
        SKINS[p.id%SKINS.length],
        p.nu, p.nm,
        phase,
        idx===nearest.current&&bd<7,
        p.id===0||p.id===11
      );
      ctx.filter='none';
    });

    /* ── BALL ── */
    {
      const {sx,sy,scale}=pp2(bl.x,bl.y);
      const br=Math.max(2.5,scale*7);
      const spin=frm.current*0.09%(Math.PI*2);
      /* ground shadow */
      ctx.fillStyle='rgba(0,0,0,0.28)';
      ctx.beginPath(); ctx.ellipse(sx,sy+br*0.65,br*1.3,br*0.35,0,0,Math.PI*2); ctx.fill();
      /* ball sphere with 3-D radial gradient */
      const ballGrad=ctx.createRadialGradient(sx-br*0.32,sy-br*0.38,br*0.05,sx,sy,br);
      ballGrad.addColorStop(0,'#ffffff');
      ballGrad.addColorStop(0.4,'#f0f0f0');
      ballGrad.addColorStop(0.75,'#cccccc');
      ballGrad.addColorStop(1,'#888888');
      ctx.fillStyle=ballGrad;
      ctx.beginPath(); ctx.arc(sx,sy,br,0,Math.PI*2); ctx.fill();
      /* black pentagon patches — classic football pattern */
      ctx.save();
      ctx.translate(sx,sy);
      ctx.rotate(spin);
      ctx.fillStyle='#111111';
      /* center patch */
      ctx.beginPath();
      for(let i=0;i<5;i++){
        const a=i/5*Math.PI*2-Math.PI/2;
        i===0?ctx.moveTo(Math.cos(a)*br*0.32,Math.sin(a)*br*0.32):ctx.lineTo(Math.cos(a)*br*0.32,Math.sin(a)*br*0.32);
      }
      ctx.closePath(); ctx.fill();
      /* surrounding 5 patches */
      for(let i=0;i<5;i++){
        const a=i/5*Math.PI*2-Math.PI/2;
        const px=Math.cos(a)*br*0.62, py=Math.sin(a)*br*0.62;
        ctx.beginPath();
        for(let j=0;j<5;j++){
          const pa=(j/5)*Math.PI*2+a;
          const qx=px+Math.cos(pa)*br*0.22, qy=py+Math.sin(pa)*br*0.22;
          j===0?ctx.moveTo(qx,qy):ctx.lineTo(qx,qy);
        }
        ctx.closePath(); ctx.fill();
      }
      ctx.restore();
      /* shine spot */
      ctx.save();
      ctx.globalAlpha=0.55;
      const shine=ctx.createRadialGradient(sx-br*0.3,sy-br*0.35,0,sx-br*0.3,sy-br*0.35,br*0.45);
      shine.addColorStop(0,'rgba(255,255,255,0.85)');
      shine.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=shine;
      ctx.beginPath(); ctx.arc(sx,sy,br,0,Math.PI*2); ctx.fill();
      ctx.restore();
    }

    /* ── VIGNETTE ── */
    const vig=ctx.createRadialGradient(W/2,H*0.55,W*0.15,W/2,H*0.55,W*0.75);
    vig.addColorStop(0,'rgba(0,0,0,0)');
    vig.addColorStop(1,'rgba(0,0,0,0.65)');
    ctx.fillStyle=vig; ctx.fillRect(0,0,W,H);

    /* subtle scan-line effect */
    ctx.globalAlpha=0.025;
    for(let y=0;y<H;y+=3){
      ctx.fillStyle='#000';
      ctx.fillRect(0,y,W,1);
    }
    ctx.globalAlpha=1;
  }, []);

  /* ── GAME TICK ── */
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

      type PP={id:number;team:number;x:number;y:number;dx:number;dy:number;nm:string;nu:string};
      pposRef.current=(pposRef.current as PP[]).map((p:PP,i:number)=>{
        const bx=ballRef.current.x,by=ballRef.current.y;
        let{x,y,dx,dy}=p;let ndx=dx,ndy=dy;
        /* find nearest */
        let md=9999;
        (pposRef.current as PP[]).forEach((q:PP,j:number)=>{const d=Math.hypot(q.x-bx,q.y-by);if(d<md){md=d;nearest.current=j;}});
        if(i===nearest.current){
          const d=Math.hypot(bx-x,by-y);
          if(d>2.5){ndx=(bx-x)/d*0.5;ndy=(by-y)/d*0.4;}
        } else {
          ndx=dx+(Math.random()-0.5)*0.055;ndy=dy+(Math.random()-0.5)*0.055;
          ndx=Math.max(-0.5,Math.min(0.5,ndx));ndy=Math.max(-0.5,Math.min(0.5,ndy));
        }
        x+=ndx;y+=ndy;
        if(x<2||x>98){ndx=-ndx;x=Math.max(2,Math.min(98,x));}
        if(y<-37||y>37){ndy=-ndy;y=Math.max(-37,Math.min(37,y));}
        return{...p,x,y,dx:ndx,dy:ndy};
      });

      camXRef.current+=(ballRef.current.x-camXRef.current)*0.035;
      setCamX(camXRef.current);
      setBall({...ballRef.current});

      if(frm.current%60===0){
        stateRef.current.minute=Math.min(90,stateRef.current.minute+1);
        setMin(stateRef.current.minute);
      }
      if(frm.current>300&&frm.current%1800===0&&Math.random()<0.45){
        const home=Math.random()>0.5;
        if(home){stateRef.current.homeScore++;setHS(stateRef.current.homeScore);}
        else{stateRef.current.awayScore++;setAS(stateRef.current.awayScore);}
        const arr=home?HOME_NAMES:AWAY_NAMES;
        const scorer=arr[Math.floor(Math.random()*arr.length)];
        setGoal(`⚽ TOR! ${scorer}`);
        setTimeout(()=>setGoal(''),5000);
      }

      render();
      rafRef.current=requestAnimationFrame(tick);
    }
    rafRef.current=requestAnimationFrame(tick);
    return()=>cancelAnimationFrame(rafRef.current);
  },[playing,render]);

  /* resize canvas */
  const wrapRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const obs=new ResizeObserver(()=>{
      const c=canvasRef.current,w=wrapRef.current;
      if(!c||!w)return;
      c.width=w.clientWidth;
      c.height=Math.round(w.clientWidth*0.5625);
      render();
    });
    if(wrapRef.current)obs.observe(wrapRef.current);
    return()=>obs.disconnect();
  },[render]);

  return(
    <div ref={wrapRef} className="relative w-full rounded-2xl overflow-hidden border border-[#1a1a2a] bg-[#060810]"
      style={{paddingBottom:'56.25%'}}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"
        style={{imageRendering:'auto'}}/>

      {/* SCORE BAR */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-center pointer-events-none">
        <div className="flex items-stretch overflow-hidden rounded-b-2xl shadow-2xl"
          style={{backdropFilter:'blur(10px)',border:'1px solid rgba(255,255,255,0.08)'}}>
          <div className="flex items-center gap-2 px-5 py-2 bg-[#c8102e]">
            <span className="text-white text-xl leading-none">{match.homeTeam.emoji}</span>
            <span className="text-white font-black text-sm tracking-wider uppercase">{match.homeTeam.shortName}</span>
          </div>
          <div className="flex items-center px-6 py-1 bg-black/92">
            <span className="text-white font-black text-4xl tabular-nums tracking-widest">
              {homeScore}&nbsp;–&nbsp;{awayScore}
            </span>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-[#003087]">
            <span className="text-white font-black text-sm tracking-wider uppercase">{match.awayTeam.shortName}</span>
            <span className="text-white text-xl leading-none">{match.awayTeam.emoji}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM HUD */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <div className="flex items-end justify-between px-3 pb-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-black px-3 py-1.5 rounded-lg shadow-lg">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse inline-block"/>LIVE
            </div>
            <div className="bg-black/88 text-white text-xs font-black px-3 py-1.5 rounded-lg">{minute}'</div>
          </div>
          <div className="bg-black/78 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg">
            {match.competitionEmoji} {match.competition}
          </div>
        </div>
        <div className="bg-[#6c63ff]/90 text-white text-[11px] font-bold px-3 py-1 flex items-center gap-2">
          <span className="flex-shrink-0 font-black tracking-wide">⚽ SPORT TV</span>
          <span className="opacity-40">│</span>
          <span className="truncate">{match.homeTeam.name} vs {match.awayTeam.name} · {match.venue}</span>
        </div>
      </div>

      {goalMsg&&(
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <div className="bg-yellow-400 text-black font-black text-3xl px-12 py-5 rounded-2xl shadow-2xl animate-bounce border-4 border-yellow-600 tracking-wide">
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
          <p className="text-slate-500 text-sm">TV-Kamera · HD Broadcast · Live Chat</p>
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
