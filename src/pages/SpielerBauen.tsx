import { useState, useRef, useEffect } from 'react';
import { Download, RotateCcw, User } from 'lucide-react';

/* ── Options ── */
const SKIN_TONES  = ['#f5c99a','#e8a870','#d4874a','#b06030','#8b4a20','#5c2e0e'];
const HAIR_COLORS = ['#1a0a02','#2c1a08','#4a2c10','#8b5e1a','#c8a020','#e0c040','#d44020','#222222','#cc2244','#4466cc'];
const HAIR_STYLES = ['kurz','lang','glatze','locken','afro','zopf'];
const JERSEY_COLORS = [
  '#c8102e','#003087','#ffffff','#000000','#1a7a1a','#f59e0b',
  '#6c63ff','#ff6600','#00aaff','#aa00ff','#ff0066','#00cc88',
];
const SHORTS_COLORS = [
  '#000000','#ffffff','#1a1a2a','#c8102e','#003087','#1a7a1a',
  '#f59e0b','#6c63ff','#333333','#8b0000','#001a4d','#333300',
];
const SOCK_COLORS   = ['#ffffff','#000000','#c8102e','#003087','#1a7a1a','#f59e0b'];
const BOOT_COLORS   = ['#111111','#ffffff','#c8102e','#f59e0b','#00aaff','#aa00ff'];
const BODY_TYPES    = ['normal','breit','schlank'];

interface PlayerConfig {
  skin: string;
  hairColor: string;
  hairStyle: string;
  jerseyColor: string;
  jerseyColor2: string; // sleeve color
  shortsColor: string;
  sockColor: string;
  bootColor: string;
  number: string;
  name: string;
  bodyType: string;
  beard: boolean;
  armband: boolean;
  gloves: boolean;
}

const DEFAULT: PlayerConfig = {
  skin: '#f5c99a',
  hairColor: '#1a0a02',
  hairStyle: 'kurz',
  jerseyColor: '#c8102e',
  jerseyColor2: '#ffffff',
  shortsColor: '#000000',
  sockColor: '#ffffff',
  bootColor: '#111111',
  number: '10',
  name: 'SPIELER',
  bodyType: 'normal',
  beard: false,
  armband: false,
  gloves: false,
};

/* ── Canvas player preview ── */
function drawPreview(canvas: HTMLCanvasElement, cfg: PlayerConfig, frame: number) {
  const ctx = canvas.getContext('2d')!;
  if (!ctx) return;
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  /* subtle background */
  const bg = ctx.createRadialGradient(W/2, H/2, 10, W/2, H/2, W*0.7);
  bg.addColorStop(0, '#1a1a2e');
  bg.addColorStop(1, '#0a0a15');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  /* pitch circle under feet */
  ctx.fillStyle = 'rgba(34,100,34,0.35)';
  ctx.beginPath();
  ctx.ellipse(W/2, H*0.85, W*0.38, H*0.07, 0, 0, Math.PI*2);
  ctx.fill();

  const phase = frame * 0.08;
  const s = Math.sin(phase);
  const c = Math.cos(phase);
  const LA =  s * 0.42;
  const RA = -s * 0.42;
  const AA =  c * 0.32;

  /* scale */
  const bw = cfg.bodyType === 'breit' ? 1.18 : cfg.bodyType === 'schlank' ? 0.84 : 1.0;
  const TH = H * 0.72; // figure height
  const cx = W / 2;
  const baseY = H * 0.82;

  function L(hex: string, a: number) {
    const n = parseInt(hex.replace('#',''), 16);
    const r = Math.min(255, ((n>>16)&255) + a);
    const g = Math.min(255, ((n>>8)&255) + a);
    const b = Math.min(255, (n&255) + a);
    return `rgb(${r},${g},${b})`;
  }
  function D(hex: string, a: number) { return L(hex, -a); }

  /* shadow */
  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.ellipse(cx + TH*0.04, baseY + TH*0.015, TH*0.22*bw, TH*0.04, 0.1, 0, Math.PI*2);
  ctx.fill();
  ctx.restore();

  /* ── draw one leg ── */
  function drawLeg(side: number, thighA: number, shinBend: number) {
    const ox = cx + side * TH * 0.065 * bw;
    const oy = baseY - TH * 0.36;
    ctx.save();
    ctx.translate(ox, oy);

    /* thigh */
    ctx.save();
    ctx.rotate(thighA);
    const tl = TH * 0.25, tw = TH * 0.082 * bw;
    const tg = ctx.createLinearGradient(-tw, 0, tw, tl);
    tg.addColorStop(0, L(cfg.shortsColor, 8));
    tg.addColorStop(1, D(cfg.shortsColor, 30));
    ctx.fillStyle = tg;
    ctx.beginPath();
    ctx.moveTo(-tw*0.7, 0);
    ctx.quadraticCurveTo(-tw, tl*0.5, -tw*0.55, tl);
    ctx.quadraticCurveTo(0, tl*1.04, tw*0.55, tl);
    ctx.quadraticCurveTo(tw, tl*0.5, tw*0.7, 0);
    ctx.closePath(); ctx.fill();

    /* shin */
    ctx.translate(0, tl);
    ctx.rotate(shinBend);
    const sl = TH * 0.22, sw = TH * 0.065 * bw;
    ctx.fillStyle = D(cfg.shortsColor, 20);
    ctx.beginPath();
    ctx.moveTo(-sw*0.7, 0);
    ctx.quadraticCurveTo(-sw, sl*0.5, -sw*0.5, sl);
    ctx.quadraticCurveTo(0, sl*1.04, sw*0.5, sl);
    ctx.quadraticCurveTo(sw, sl*0.5, sw*0.7, 0);
    ctx.closePath(); ctx.fill();

    /* sock */
    ctx.fillStyle = cfg.sockColor;
    ctx.beginPath();
    ctx.roundRect(-sw*0.72, sl*0.5, sw*1.44, sl*0.42, sw*0.3);
    ctx.fill();
    /* sock stripe */
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.beginPath();
    ctx.roundRect(-sw*0.7, sl*0.52, sw*1.4, sl*0.07, sw*0.2);
    ctx.fill();

    /* boot */
    const bootG = ctx.createRadialGradient(-sw*0.2, sl*0.95, 0, 0, sl*0.9, sw*1.3);
    bootG.addColorStop(0, L(cfg.bootColor, 20));
    bootG.addColorStop(1, D(cfg.bootColor, 15));
    ctx.fillStyle = bootG;
    ctx.beginPath();
    ctx.ellipse(sw*0.05, sl*0.96, sw*1.2, sw*0.45, 0.18, 0, Math.PI*2);
    ctx.fill();
    /* boot shine */
    ctx.save(); ctx.globalAlpha=0.22; ctx.fillStyle='#fff';
    ctx.beginPath(); ctx.ellipse(-sw*0.3, sl*0.88, sw*0.35, sw*0.16, 0.3, 0, Math.PI*2); ctx.fill();
    ctx.restore();

    ctx.restore(); ctx.restore();
  }

  /* back leg */
  drawLeg(1, RA, RA < 0 ? RA * 0.6 : 0);

  /* shorts */
  const sy0 = baseY - TH*0.36;
  const sg = ctx.createLinearGradient(cx - TH*0.2*bw, sy0, cx + TH*0.12*bw, sy0 + TH*0.16);
  sg.addColorStop(0, L(cfg.shortsColor, 16));
  sg.addColorStop(1, D(cfg.shortsColor, 28));
  ctx.fillStyle = sg;
  ctx.beginPath();
  ctx.moveTo(cx - TH*0.19*bw, sy0);
  ctx.bezierCurveTo(cx - TH*0.22*bw, sy0 + TH*0.08, cx - TH*0.18*bw, sy0 + TH*0.16, cx - TH*0.11*bw, sy0 + TH*0.18);
  ctx.lineTo(cx + TH*0.11*bw, sy0 + TH*0.18);
  ctx.bezierCurveTo(cx + TH*0.18*bw, sy0 + TH*0.16, cx + TH*0.22*bw, sy0 + TH*0.08, cx + TH*0.19*bw, sy0);
  ctx.closePath(); ctx.fill();

  /* jersey */
  const jy = baseY - TH*0.74;
  const jg = ctx.createLinearGradient(cx - TH*0.26*bw, jy, cx + TH*0.14*bw, jy + TH*0.42);
  jg.addColorStop(0,   L(cfg.jerseyColor, 35));
  jg.addColorStop(0.3, L(cfg.jerseyColor, 12));
  jg.addColorStop(0.7, cfg.jerseyColor);
  jg.addColorStop(1,   D(cfg.jerseyColor, 38));
  ctx.fillStyle = jg;
  ctx.beginPath();
  ctx.moveTo(cx - TH*0.24*bw, jy + TH*0.08);
  ctx.bezierCurveTo(cx - TH*0.28*bw, jy + TH*0.2, cx - TH*0.26*bw, jy + TH*0.35, cx - TH*0.19*bw, TH*0.24 + jy + TH*0.14);
  ctx.lineTo(cx - TH*0.11*bw, sy0);
  ctx.lineTo(cx + TH*0.11*bw, sy0);
  ctx.lineTo(cx + TH*0.19*bw, TH*0.24 + jy + TH*0.14);
  ctx.bezierCurveTo(cx + TH*0.26*bw, jy + TH*0.35, cx + TH*0.28*bw, jy + TH*0.2, cx + TH*0.24*bw, jy + TH*0.08);
  ctx.bezierCurveTo(cx + TH*0.16*bw, jy, cx + TH*0.07*bw, jy - TH*0.02, cx, jy - TH*0.02);
  ctx.bezierCurveTo(cx - TH*0.07*bw, jy - TH*0.02, cx - TH*0.16*bw, jy, cx - TH*0.24*bw, jy + TH*0.08);
  ctx.fill();

  /* sleeve color band */
  ctx.save(); ctx.globalAlpha = 0.55; ctx.fillStyle = cfg.jerseyColor2;
  /* left sleeve top */
  ctx.beginPath();
  ctx.moveTo(cx - TH*0.24*bw, jy + TH*0.08);
  ctx.bezierCurveTo(cx - TH*0.28*bw, jy + TH*0.16, cx - TH*0.28*bw, jy + TH*0.26, cx - TH*0.25*bw, jy + TH*0.3);
  ctx.lineTo(cx - TH*0.18*bw, jy + TH*0.26);
  ctx.bezierCurveTo(cx - TH*0.2*bw, jy + TH*0.16, cx - TH*0.18*bw, jy + TH*0.08, cx - TH*0.16*bw, jy + TH*0.05);
  ctx.closePath(); ctx.fill();
  /* right sleeve */
  ctx.beginPath();
  ctx.moveTo(cx + TH*0.24*bw, jy + TH*0.08);
  ctx.bezierCurveTo(cx + TH*0.28*bw, jy + TH*0.16, cx + TH*0.28*bw, jy + TH*0.26, cx + TH*0.25*bw, jy + TH*0.3);
  ctx.lineTo(cx + TH*0.18*bw, jy + TH*0.26);
  ctx.bezierCurveTo(cx + TH*0.2*bw, jy + TH*0.16, cx + TH*0.18*bw, jy + TH*0.08, cx + TH*0.16*bw, jy + TH*0.05);
  ctx.closePath(); ctx.fill();
  ctx.restore();

  /* jersey sheen */
  ctx.save(); ctx.globalAlpha = 0.1;
  const sh = ctx.createLinearGradient(cx - TH*0.22*bw, jy, cx - TH*0.04*bw, jy + TH*0.3);
  sh.addColorStop(0, '#fff'); sh.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = sh;
  ctx.beginPath();
  ctx.moveTo(cx - TH*0.22*bw, jy + TH*0.08);
  ctx.bezierCurveTo(cx - TH*0.26*bw, jy + TH*0.18, cx - TH*0.22*bw, jy + TH*0.3, cx - TH*0.14*bw, jy + TH*0.36);
  ctx.lineTo(cx - TH*0.04*bw, jy + TH*0.36);
  ctx.bezierCurveTo(cx - TH*0.08*bw, jy + TH*0.2, cx - TH*0.06*bw, jy + TH*0.08, cx - TH*0.05*bw, jy + TH*0.02);
  ctx.closePath(); ctx.fill();
  ctx.restore();

  /* number */
  ctx.fillStyle = 'rgba(255,255,255,0.92)';
  ctx.font = `bold ${TH * 0.14}px Arial,sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(cfg.number, cx, jy + TH*0.22);

  /* ── ARMS ── */
  function drawArm(side: number, angle: number) {
    const ax = cx + side * TH * 0.26 * bw;
    const ay = jy + TH * 0.1;
    ctx.save(); ctx.translate(ax, ay); ctx.rotate(angle);
    const aw = TH*0.08*bw, al = TH*0.21;
    /* upper arm */
    const ag = ctx.createLinearGradient(0,0,aw,al);
    ag.addColorStop(0, L(cfg.jerseyColor, 8)); ag.addColorStop(1, D(cfg.jerseyColor, 25));
    ctx.fillStyle = ag;
    ctx.beginPath();
    ctx.roundRect(side>0 ? 0 : -aw, 0, aw, al, aw*0.42);
    ctx.fill();
    /* sleeve stripe */
    ctx.save(); ctx.globalAlpha=0.5; ctx.fillStyle=cfg.jerseyColor2;
    ctx.beginPath(); ctx.roundRect(side>0 ? 0 : -aw, 0, aw, al*0.35, [aw*0.42,aw*0.42,0,0]); ctx.fill();
    ctx.restore();
    /* forearm */
    ctx.translate(0, al); ctx.rotate(angle * 0.22);
    const fw = TH*0.062*bw, fl = TH*0.15;
    const fg = ctx.createLinearGradient(0,0,fw,fl);
    fg.addColorStop(0, L(cfg.skin, 12)); fg.addColorStop(1, D(cfg.skin, 18));
    ctx.fillStyle = fg;
    ctx.beginPath(); ctx.roundRect(side>0?0:-fw, 0, fw, fl, fw*0.42); ctx.fill();
    /* armband */
    if (cfg.armband && side === -1) {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath(); ctx.roundRect(side>0?0:-fw, fl*0.15, fw, fl*0.18, fw*0.2); ctx.fill();
    }
    /* gloves */
    if (cfg.gloves) {
      ctx.fillStyle = '#222';
      ctx.beginPath(); ctx.ellipse(side>0?fw*0.5:-fw*0.5, fl, fw*0.52, fw*0.55, 0.2, 0, Math.PI*2); ctx.fill();
    }
    ctx.restore();
  }
  drawArm(-1, -AA);
  drawArm( 1,  AA);

  /* front leg */
  drawLeg(-1, LA, LA > 0 ? -LA * 0.55 : 0);

  /* neck */
  const neckY = jy - TH*0.04;
  const ng = ctx.createLinearGradient(cx-TH*0.07, neckY, cx+TH*0.05, neckY+TH*0.1);
  ng.addColorStop(0, L(cfg.skin, 10)); ng.addColorStop(1, D(cfg.skin, 12));
  ctx.fillStyle = ng;
  ctx.beginPath(); ctx.roundRect(cx - TH*0.07, neckY, TH*0.14, TH*0.1, TH*0.03); ctx.fill();

  /* ── HEAD ── */
  const hr  = TH * 0.148;
  const hcy = jy - TH*0.21;
  const hg2 = ctx.createRadialGradient(cx - hr*0.3, hcy - hr*0.3, hr*0.04, cx, hcy, hr);
  hg2.addColorStop(0, L(cfg.skin, 28)); hg2.addColorStop(0.5, L(cfg.skin, 8));
  hg2.addColorStop(1, D(cfg.skin, 28));
  ctx.fillStyle = hg2;
  ctx.beginPath(); ctx.ellipse(cx, hcy, hr, hr*1.1, 0, 0, Math.PI*2); ctx.fill();

  /* ear */
  ctx.fillStyle = D(cfg.skin, 10);
  ctx.beginPath(); ctx.ellipse(cx - hr*0.95, hcy + hr*0.05, hr*0.12, hr*0.2, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx + hr*0.95, hcy + hr*0.05, hr*0.12, hr*0.2, 0, 0, Math.PI*2); ctx.fill();

  /* beard */
  if (cfg.beard) {
    ctx.save(); ctx.globalAlpha = 0.65; ctx.fillStyle = cfg.hairColor;
    ctx.beginPath(); ctx.ellipse(cx, hcy + hr*0.45, hr*0.7, hr*0.48, 0, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  }

  /* eyes */
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.beginPath(); ctx.ellipse(cx - hr*0.32, hcy - hr*0.08, hr*0.22, hr*0.1, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx + hr*0.32, hcy - hr*0.08, hr*0.22, hr*0.1, 0, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#111';
  ctx.beginPath(); ctx.ellipse(cx - hr*0.32, hcy - hr*0.07, hr*0.11, hr*0.12, 0, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx + hr*0.32, hcy - hr*0.07, hr*0.11, hr*0.12, 0, 0, Math.PI*2); ctx.fill();
  /* eye shine */
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.beginPath(); ctx.arc(cx - hr*0.28, hcy - hr*0.12, hr*0.04, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(cx + hr*0.36, hcy - hr*0.12, hr*0.04, 0, Math.PI*2); ctx.fill();
  /* nose */
  ctx.fillStyle = D(cfg.skin, 16);
  ctx.beginPath(); ctx.ellipse(cx, hcy + hr*0.12, hr*0.1, hr*0.07, 0, 0, Math.PI*2); ctx.fill();
  /* mouth */
  ctx.strokeStyle = D(cfg.skin, 22); ctx.lineWidth = hr*0.06;
  ctx.beginPath(); ctx.arc(cx, hcy + hr*0.3, hr*0.22, 0.15, Math.PI - 0.15); ctx.stroke();

  /* ── HAIR ── */
  const hairStyleFn: Record<string, ()=>void> = {
    kurz: () => {
      ctx.fillStyle = cfg.hairColor;
      ctx.beginPath(); ctx.ellipse(cx, hcy - hr*0.52, hr*1.04, hr*0.62, 0, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx - hr*0.84, hcy - hr*0.08, hr*0.35, hr*0.68, -0.3, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx + hr*0.84, hcy - hr*0.08, hr*0.35, hr*0.68,  0.3, 0, Math.PI*2); ctx.fill();
    },
    lang: () => {
      ctx.fillStyle = cfg.hairColor;
      ctx.beginPath(); ctx.ellipse(cx, hcy - hr*0.5, hr*1.05, hr*0.65, 0, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.roundRect(cx - hr*1.05, hcy - hr*0.1, hr*0.28, hr*1.5, hr*0.12); ctx.fill();
      ctx.beginPath(); ctx.roundRect(cx + hr*0.77, hcy - hr*0.1, hr*0.28, hr*1.5, hr*0.12); ctx.fill();
    },
    glatze: () => {
      /* subtle shine on bald head */
      ctx.save(); ctx.globalAlpha=0.18; ctx.fillStyle='#fff';
      ctx.beginPath(); ctx.ellipse(cx - hr*0.28, hcy - hr*0.42, hr*0.38, hr*0.22, -0.4, 0, Math.PI*2); ctx.fill();
      ctx.restore();
    },
    locken: () => {
      ctx.fillStyle = cfg.hairColor;
      for (let i = 0; i < 9; i++) {
        const a = (i / 9) * Math.PI * 2 - Math.PI*0.3;
        const r = i < 5 ? hr*1.08 : hr*0.82;
        ctx.beginPath(); ctx.arc(cx + Math.cos(a)*r*0.55, hcy - hr*0.3 + Math.sin(a)*r*0.35, hr*0.32, 0, Math.PI*2); ctx.fill();
      }
    },
    afro: () => {
      ctx.fillStyle = cfg.hairColor;
      ctx.beginPath(); ctx.ellipse(cx, hcy - hr*0.18, hr*1.45, hr*1.3, 0, 0, Math.PI*2); ctx.fill();
    },
    zopf: () => {
      ctx.fillStyle = cfg.hairColor;
      ctx.beginPath(); ctx.ellipse(cx, hcy - hr*0.52, hr*1.04, hr*0.62, 0, 0, Math.PI*2); ctx.fill();
      /* pony tail */
      ctx.beginPath(); ctx.roundRect(cx - hr*0.14, hcy - hr*0.55, hr*0.28, hr*1.9, hr*0.12); ctx.fill();
      ctx.beginPath(); ctx.ellipse(cx, hcy + hr*1.35, hr*0.22, hr*0.22, 0, 0, Math.PI*2); ctx.fill();
    },
  };
  (hairStyleFn[cfg.hairStyle] || hairStyleFn['kurz'])();

  /* name label */
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  const lblW = TH * 0.72, lblH = TH * 0.12;
  ctx.beginPath(); ctx.roundRect(cx - lblW/2, baseY + TH*0.03, lblW, lblH, 3); ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = `bold ${TH*0.09}px Arial,sans-serif`;
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(cfg.name, cx, baseY + TH*0.03 + lblH/2);
}

/* ── Swatch picker ── */
function Swatches({ colors, value, onChange, label }:
  { colors:string[]; value:string; onChange:(c:string)=>void; label:string }) {
  return (
    <div className="mb-3">
      <p className="text-slate-400 text-xs font-semibold mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {colors.map(c=>(
          <button key={c} onClick={()=>onChange(c)}
            className={`w-7 h-7 rounded-lg border-2 transition-all ${value===c?'border-white scale-110':'border-transparent hover:scale-105'}`}
            style={{background:c === '#ffffff' ? '#f8f8f8' : c, boxShadow: value===c ? '0 0 0 2px #6c63ff' : 'none'}}/>
        ))}
        {/* custom color */}
        <label className="w-7 h-7 rounded-lg border-2 border-dashed border-slate-600 hover:border-slate-400 flex items-center justify-center cursor-pointer text-slate-500 text-xs transition-colors" title="Eigene Farbe">
          +
          <input type="color" value={value} onChange={e=>onChange(e.target.value)} className="sr-only"/>
        </label>
      </div>
    </div>
  );
}

/* ── Toggle ── */
function Toggle({ label, value, onChange }:{ label:string; value:boolean; onChange:(v:boolean)=>void }) {
  return (
    <button onClick={()=>onChange(!value)}
      className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold transition-all ${
        value ? 'bg-[#6c63ff]/20 border-[#6c63ff]/50 text-[#6c63ff]' : 'bg-[#12121a] border-[#22223a] text-slate-400'
      }`}>
      <span className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${value?'bg-[#6c63ff] border-[#6c63ff]':'border-slate-500'}`}>
        {value && <span className="text-white text-[9px]">✓</span>}
      </span>
      {label}
    </button>
  );
}

export default function SpielerBauen() {
  const [cfg, setCfg] = useState<PlayerConfig>({ ...DEFAULT });
  const [frame, setFrame] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const [saved, setSaved] = useState(false);

  /* animation loop */
  useEffect(() => {
    function tick() {
      setFrame(f => f + 1);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* draw */
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    drawPreview(c, cfg, frame);
  }, [cfg, frame]);

  function set<K extends keyof PlayerConfig>(k: K, v: PlayerConfig[K]) {
    setCfg(p => ({ ...p, [k]: v }));
  }

  function download() {
    const c = canvasRef.current; if (!c) return;
    const a = document.createElement('a');
    a.href = c.toDataURL('image/png');
    a.download = `spieler-${cfg.name || 'custom'}.png`;
    a.click();
    setSaved(true); setTimeout(() => setSaved(false), 2000);
  }

  function reset() { setCfg({ ...DEFAULT }); }

  const section = (title: string) => (
    <p className="text-white font-black text-sm mt-4 mb-2 flex items-center gap-2">
      <span className="w-1 h-4 rounded bg-[#6c63ff] inline-block"/>
      {title}
    </p>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 pb-safe-nav md:pb-8 pt-6">
      {/* header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-[#6c63ff]/20 border border-[#6c63ff]/30 flex items-center justify-center">
          <User size={20} className="text-[#6c63ff]"/>
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">Spieler bauen</h1>
          <p className="text-slate-500 text-sm">Erstelle deinen eigenen Spieler</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* PREVIEW */}
        <div className="lg:w-72 flex-shrink-0">
          <div className="sticky top-4">
            <canvas ref={canvasRef} width={280} height={380}
              className="w-full rounded-2xl border border-[#22223a]"/>
            <div className="flex gap-2 mt-3">
              <button onClick={download}
                className="flex-1 flex items-center justify-center gap-2 bg-[#6c63ff] hover:bg-[#5a52e8] text-white font-bold text-sm py-2.5 rounded-xl transition-all active:scale-95">
                <Download size={15}/>
                {saved ? 'Gespeichert!' : 'Speichern'}
              </button>
              <button onClick={reset}
                className="w-11 flex items-center justify-center bg-[#12121a] border border-[#22223a] hover:border-slate-500 text-slate-400 rounded-xl transition-all">
                <RotateCcw size={15}/>
              </button>
            </div>
          </div>
        </div>

        {/* EDITOR */}
        <div className="flex-1 bg-[#12121a] border border-[#22223a] rounded-2xl p-4 overflow-y-auto" style={{maxHeight:'78vh'}}>

          {section('Name & Nummer')}
          <div className="flex gap-2 mb-3">
            <div className="flex-1">
              <p className="text-slate-500 text-xs mb-1">Name</p>
              <input type="text" value={cfg.name} maxLength={12}
                onChange={e=>set('name', e.target.value.toUpperCase())}
                className="w-full bg-[#1a1a27] border border-[#22223a] rounded-xl px-3 py-2 text-sm text-white font-bold focus:outline-none focus:border-[#6c63ff]/50"/>
            </div>
            <div className="w-20">
              <p className="text-slate-500 text-xs mb-1">Nummer</p>
              <input type="number" value={cfg.number} min={1} max={99}
                onChange={e=>set('number', e.target.value)}
                className="w-full bg-[#1a1a27] border border-[#22223a] rounded-xl px-3 py-2 text-sm text-white font-bold text-center focus:outline-none focus:border-[#6c63ff]/50"/>
            </div>
          </div>

          {section('Körper')}
          <p className="text-slate-400 text-xs font-semibold mb-1.5">Körpertyp</p>
          <div className="flex gap-2 mb-3">
            {BODY_TYPES.map(b=>(
              <button key={b} onClick={()=>set('bodyType',b)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize transition-all border ${cfg.bodyType===b?'bg-[#6c63ff] border-[#6c63ff] text-white':'bg-[#1a1a27] border-[#22223a] text-slate-400 hover:border-slate-500'}`}>
                {b}
              </button>
            ))}
          </div>
          <Swatches label="Hautfarbe" colors={SKIN_TONES} value={cfg.skin} onChange={v=>set('skin',v)}/>

          {section('Gesicht & Haare')}
          <p className="text-slate-400 text-xs font-semibold mb-1.5">Frisur</p>
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            {HAIR_STYLES.map(h=>(
              <button key={h} onClick={()=>set('hairStyle',h)}
                className={`py-2 rounded-xl text-xs font-bold capitalize transition-all border ${cfg.hairStyle===h?'bg-[#6c63ff] border-[#6c63ff] text-white':'bg-[#1a1a27] border-[#22223a] text-slate-400 hover:border-slate-500'}`}>
                {h}
              </button>
            ))}
          </div>
          <Swatches label="Haarfarbe" colors={HAIR_COLORS} value={cfg.hairColor} onChange={v=>set('hairColor',v)}/>
          <div className="flex gap-2 mb-2">
            <Toggle label="Bart" value={cfg.beard} onChange={v=>set('beard',v)}/>
          </div>

          {section('Trikot')}
          <Swatches label="Trikot Hauptfarbe" colors={JERSEY_COLORS} value={cfg.jerseyColor} onChange={v=>set('jerseyColor',v)}/>
          <Swatches label="Ärmel-/Akzentfarbe" colors={JERSEY_COLORS} value={cfg.jerseyColor2} onChange={v=>set('jerseyColor2',v)}/>
          <Swatches label="Shorts" colors={SHORTS_COLORS} value={cfg.shortsColor} onChange={v=>set('shortsColor',v)}/>
          <Swatches label="Stutzen" colors={SOCK_COLORS} value={cfg.sockColor} onChange={v=>set('sockColor',v)}/>
          <Swatches label="Schuhe" colors={BOOT_COLORS} value={cfg.bootColor} onChange={v=>set('bootColor',v)}/>

          {section('Extras')}
          <div className="flex flex-wrap gap-2">
            <Toggle label="Kapitänsbinde" value={cfg.armband} onChange={v=>set('armband',v)}/>
            <Toggle label="Torwart-Handschuhe" value={cfg.gloves} onChange={v=>set('gloves',v)}/>
          </div>
        </div>
      </div>
    </div>
  );
}
