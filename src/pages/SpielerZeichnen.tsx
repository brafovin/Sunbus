import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Pencil, Eraser, Square, Circle, Minus, Download, Trash2,
  RotateCcw, RotateCw, Pipette, PaintBucket, Brush, Move
} from 'lucide-react';

type Tool = 'pencil' | 'brush' | 'eraser' | 'line' | 'rect' | 'circle'
          | 'fill' | 'picker' | 'spray' | 'move';

const PALETTE = [
  '#000000','#1a1a1a','#333333','#555555','#888888','#aaaaaa','#cccccc','#ffffff',
  '#c8102e','#ff4444','#ff8800','#ffcc00','#ffe066','#ffd700',
  '#1a7a1a','#00cc44','#00aaff','#003087','#6c63ff','#aa00ff',
  '#ff0066','#ff69b4','#d4956a','#8b5530','#c07840','#e8bb88',
];

const SIZES = [1, 2, 4, 7, 12, 20, 32];

const W = 480;
const H = 640;

export default function SpielerZeichnen() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);

  const [tool, setTool]     = useState<Tool>('pencil');
  const [color, setColor]   = useState('#000000');
  const [size,  setSize]    = useState(4);
  const [drawing, setDrawing] = useState(false);
  const historyRef = useRef<ImageData[]>([]);
  const futureRef  = useRef<ImageData[]>([]);
  const [startPt, setStartPt] = useState({ x: 0, y: 0 });
  const sprayRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  function getCtx()  { return canvasRef.current!.getContext('2d')!; }
  function getOCtx() { return overlayRef.current!.getContext('2d')!; }

  /* ── init ── */
  useEffect(() => {
    const ctx = getCtx();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);
    drawGuide(ctx);
    const snap = ctx.getImageData(0, 0, W, H);
    historyRef.current = [snap];
    futureRef.current = [];
  }, []);

  function drawGuide(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    /* head */
    ctx.beginPath(); ctx.ellipse(W/2, H*0.12, 52, 64, 0, 0, Math.PI*2); ctx.stroke();
    /* neck */
    ctx.beginPath(); ctx.moveTo(W/2-18, H*0.18); ctx.lineTo(W/2-18, H*0.225);
    ctx.moveTo(W/2+18, H*0.18); ctx.lineTo(W/2+18, H*0.225); ctx.stroke();
    /* torso */
    ctx.beginPath(); ctx.roundRect(W/2-66, H*0.225, 132, 160, 10); ctx.stroke();
    /* left arm */
    ctx.beginPath(); ctx.roundRect(W/2-108, H*0.23, 42, 130, 12); ctx.stroke();
    /* right arm */
    ctx.beginPath(); ctx.roundRect(W/2+66,  H*0.23, 42, 130, 12); ctx.stroke();
    /* left leg */
    ctx.beginPath(); ctx.roundRect(W/2-62, H*0.41, 52, 180, 12); ctx.stroke();
    /* right leg */
    ctx.beginPath(); ctx.roundRect(W/2+10, H*0.41, 52, 180, 12); ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  function saveHistory() {
    const snap = getCtx().getImageData(0, 0, W, H);
    historyRef.current = [...historyRef.current.slice(-40), snap];
    futureRef.current = [];
  }

  function undo() {
    const h = historyRef.current;
    if (h.length < 2) return;
    const prev = h[h.length - 2];
    const curr = h[h.length - 1];
    getCtx().putImageData(prev, 0, 0);
    futureRef.current = [curr, ...futureRef.current.slice(0, 30)];
    historyRef.current = h.slice(0, -1);
  }

  function redo() {
    const f = futureRef.current;
    if (!f.length) return;
    const next = f[0];
    getCtx().putImageData(next, 0, 0);
    historyRef.current = [...historyRef.current, next];
    futureRef.current = f.slice(1);
  }

  function getPos(e: React.PointerEvent): { x: number; y: number } {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (W / rect.width),
      y: (e.clientY - rect.top)  * (H / rect.height),
    };
  }

  /* flood fill */
  function floodFill(x: number, y: number, fc: string) {
    const ctx = getCtx();
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    const xi = Math.round(x), yi = Math.round(y);
    const idx = (yi * W + xi) * 4;
    const [tr, tg, tb, ta] = [d[idx], d[idx+1], d[idx+2], d[idx+3]];
    const hex = parseInt(fc.replace('#',''), 16);
    const [fr, fg, fb] = [(hex>>16)&255, (hex>>8)&255, hex&255];
    if (tr===fr && tg===fg && tb===fb) return;
    const stack = [xi, yi];
    while (stack.length) {
      const cy = stack.pop()!, cx = stack.pop()!;
      if (cx < 0 || cx >= W || cy < 0 || cy >= H) continue;
      const i = (cy * W + cx) * 4;
      if (d[i]!==tr||d[i+1]!==tg||d[i+2]!==tb||d[i+3]!==ta) continue;
      d[i]=fr; d[i+1]=fg; d[i+2]=fb; d[i+3]=255;
      stack.push(cx-1,cy, cx+1,cy, cx,cy-1, cx,cy+1);
    }
    ctx.putImageData(img, 0, 0);
  }

  /* spray paint */
  function doSpray(x: number, y: number) {
    const ctx = getCtx();
    ctx.fillStyle = color;
    const radius = size * 3;
    const density = Math.ceil(size * 4);
    for (let i = 0; i < density; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * radius;
      ctx.fillRect(x + r * Math.cos(angle), y + r * Math.sin(angle), 1.5, 1.5);
    }
  }

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    canvasRef.current!.setPointerCapture(e.pointerId);
    const pt = getPos(e);
    setDrawing(true);
    setStartPt(pt);

    const ctx = getCtx();
    ctx.lineCap  = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'picker') {
      const img = ctx.getImageData(Math.round(pt.x), Math.round(pt.y), 1, 1).data;
      setColor(`#${[img[0],img[1],img[2]].map(v=>v.toString(16).padStart(2,'0')).join('')}`);
      setTool('pencil');
      return;
    }
    if (tool === 'fill') {
      floodFill(pt.x, pt.y, color);
      saveHistory();
      return;
    }
    if (tool === 'pencil' || tool === 'brush' || tool === 'eraser') {
      ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
      ctx.lineWidth   = tool === 'brush'  ? size * 2.5 : size;
      ctx.beginPath(); ctx.moveTo(pt.x, pt.y);
    }
    if (tool === 'spray') {
      doSpray(pt.x, pt.y);
      sprayRef.current = setInterval(() => {
        /* nothing — only spray on move */
      }, 30);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool, color, size]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!drawing) return;
    e.preventDefault();
    const pt  = getPos(e);
    const ctx = getCtx();
    const oct = getOCtx();

    if (tool === 'pencil' || tool === 'brush' || tool === 'eraser') {
      ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
      ctx.lineWidth   = tool === 'brush'  ? size * 2.5 : size;
      ctx.lineTo(pt.x, pt.y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pt.x, pt.y);
    } else if (tool === 'spray') {
      doSpray(pt.x, pt.y);
    } else {
      oct.clearRect(0, 0, W, H);
      oct.strokeStyle = color;
      oct.lineWidth   = size;
      oct.lineCap     = 'round';
      if (tool === 'line') {
        oct.beginPath(); oct.moveTo(startPt.x, startPt.y); oct.lineTo(pt.x, pt.y); oct.stroke();
      } else if (tool === 'rect') {
        oct.strokeRect(startPt.x, startPt.y, pt.x - startPt.x, pt.y - startPt.y);
      } else if (tool === 'circle') {
        oct.beginPath();
        oct.ellipse(
          (startPt.x+pt.x)/2, (startPt.y+pt.y)/2,
          Math.abs(pt.x-startPt.x)/2, Math.abs(pt.y-startPt.y)/2,
          0, 0, Math.PI*2
        );
        oct.stroke();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawing, tool, color, size, startPt]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!drawing) return;
    e.preventDefault();
    const pt  = getPos(e);
    const ctx = getCtx();
    const oct = getOCtx();

    if (tool === 'line') {
      ctx.strokeStyle = color; ctx.lineWidth = size; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(startPt.x, startPt.y); ctx.lineTo(pt.x, pt.y); ctx.stroke();
    } else if (tool === 'rect') {
      ctx.strokeStyle = color; ctx.lineWidth = size;
      ctx.strokeRect(startPt.x, startPt.y, pt.x - startPt.x, pt.y - startPt.y);
    } else if (tool === 'circle') {
      ctx.strokeStyle = color; ctx.lineWidth = size;
      ctx.beginPath();
      ctx.ellipse(
        (startPt.x+pt.x)/2, (startPt.y+pt.y)/2,
        Math.abs(pt.x-startPt.x)/2, Math.abs(pt.y-startPt.y)/2,
        0, 0, Math.PI*2
      );
      ctx.stroke();
    }
    if (sprayRef.current) { clearInterval(sprayRef.current); sprayRef.current = null; }
    oct.clearRect(0, 0, W, H);
    setDrawing(false);
    saveHistory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawing, tool, color, size, startPt]);

  function clearCanvas() {
    const ctx = getCtx();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);
    drawGuide(ctx);
    saveHistory();
  }

  function download() {
    const a = document.createElement('a');
    a.href = canvasRef.current!.toDataURL('image/png');
    a.download = 'meine-figur.png';
    a.click();
  }

  const cursor =
    tool === 'eraser' ? 'cell' :
    tool === 'picker' ? 'crosshair' :
    tool === 'fill'   ? 'copy' :
    tool === 'move'   ? 'grab' : 'crosshair';

  type ToolDef = { id: Tool; icon: React.ReactNode; label: string };
  const toolDefs: ToolDef[] = [
    { id: 'pencil', icon: <Pencil size={17}/>,      label: 'Stift' },
    { id: 'brush',  icon: <Brush  size={17}/>,      label: 'Pinsel' },
    { id: 'eraser', icon: <Eraser size={17}/>,      label: 'Radierer' },
    { id: 'spray',  icon: <span className="text-base">💨</span>, label: 'Spray' },
    { id: 'line',   icon: <Minus  size={17}/>,      label: 'Linie' },
    { id: 'rect',   icon: <Square size={17}/>,      label: 'Rechteck' },
    { id: 'circle', icon: <Circle size={17}/>,      label: 'Kreis' },
    { id: 'fill',   icon: <PaintBucket size={17}/>, label: 'Füllen' },
    { id: 'picker', icon: <Pipette size={17}/>,     label: 'Pipette' },
    { id: 'move',   icon: <Move   size={17}/>,      label: 'Bewegen' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-3 pb-24 md:pb-8 pt-5">

      {/* header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 rounded-xl bg-[#6c63ff]/20 border border-[#6c63ff]/30 flex items-center justify-center">
          <Pencil size={20} className="text-[#6c63ff]"/>
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">Figuren zeichnen</h1>
          <p className="text-slate-500 text-sm">Zeichne deine eigene Figur</p>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-4">

        {/* ── CANVAS ── */}
        <div className="flex-1 flex flex-col items-center gap-3">

          {/* action bar */}
          <div className="flex items-center gap-2 w-full">
            <button onClick={undo} title="Rückgängig (Ctrl+Z)"
              className="w-10 h-10 rounded-xl bg-[#12121a] border border-[#22223a] hover:border-slate-500 flex items-center justify-center text-slate-400 transition active:scale-90">
              <RotateCcw size={16}/>
            </button>
            <button onClick={redo} title="Wiederholen (Ctrl+Y)"
              className="w-10 h-10 rounded-xl bg-[#12121a] border border-[#22223a] hover:border-slate-500 flex items-center justify-center text-slate-400 transition active:scale-90">
              <RotateCw size={16}/>
            </button>
            <button onClick={clearCanvas} title="Alles löschen"
              className="w-10 h-10 rounded-xl bg-[#12121a] border border-red-900/50 hover:border-red-500 flex items-center justify-center text-slate-400 hover:text-red-400 transition active:scale-90">
              <Trash2 size={16}/>
            </button>
            <div className="flex-1"/>
            {/* current color preview */}
            <div className="w-10 h-10 rounded-xl border-2 border-[#22223a] flex-shrink-0" style={{ background: color }}/>
            <label className="w-10 h-10 rounded-xl overflow-hidden border border-[#22223a] cursor-pointer flex items-center justify-center bg-[#12121a] text-slate-400 hover:border-slate-500 transition">
              <span className="text-[11px] font-bold">Farbe</span>
              <input type="color" value={color} onChange={e => setColor(e.target.value)} className="opacity-0 absolute pointer-events-none"/>
            </label>
            <button onClick={download}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6c63ff] hover:bg-[#5a52e8] text-white text-sm font-bold transition active:scale-95">
              <Download size={15}/> Speichern
            </button>
          </div>

          {/* the canvas */}
          <div
            className="relative rounded-2xl overflow-hidden border-2 border-[#22223a] shadow-2xl bg-white"
            style={{ width: '100%', maxWidth: 480, aspectRatio: `${W}/${H}`, touchAction: 'none' }}
          >
            <canvas
              ref={canvasRef} width={W} height={H}
              className="absolute inset-0 w-full h-full"
              style={{ cursor, imageRendering: 'pixelated' }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={e => { if (drawing) onPointerUp(e); }}
            />
            <canvas
              ref={overlayRef} width={W} height={H}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          <p className="text-slate-600 text-xs text-center">
            Graue gestrichelte Linien = Körper-Hilfslinien · male einfach drüber
          </p>
        </div>

        {/* ── SIDEBAR ── */}
        <div className="xl:w-52 flex flex-col gap-3">

          {/* TOOLS */}
          <div className="bg-[#12121a] border border-[#22223a] rounded-2xl p-3">
            <p className="text-slate-500 text-[10px] font-bold mb-2 uppercase tracking-widest">Werkzeuge</p>
            <div className="grid grid-cols-5 xl:grid-cols-2 gap-1.5">
              {toolDefs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTool(t.id)}
                  title={t.label}
                  className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl text-[9px] font-semibold transition-all active:scale-95 ${
                    tool === t.id
                      ? 'bg-[#6c63ff] text-white shadow-[0_0_12px_#6c63ff80]'
                      : 'bg-[#1a1a27] text-slate-400 hover:bg-[#22223a] hover:text-white'
                  }`}
                >
                  {t.icon}
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div className="bg-[#12121a] border border-[#22223a] rounded-2xl p-3">
            <p className="text-slate-500 text-[10px] font-bold mb-2 uppercase tracking-widest">Stärke</p>
            <div className="grid grid-cols-7 xl:grid-cols-4 gap-1.5">
              {SIZES.map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`aspect-square rounded-lg flex items-center justify-center transition-all active:scale-95 ${
                    size === s ? 'bg-[#6c63ff]' : 'bg-[#1a1a27] hover:bg-[#22223a]'
                  }`}
                >
                  <div
                    className="rounded-full bg-white"
                    style={{ width: Math.min(s * 1.4, 20), height: Math.min(s * 1.4, 20) }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* COLOR PICKER */}
          <div className="bg-[#12121a] border border-[#22223a] rounded-2xl p-3">
            <p className="text-slate-500 text-[10px] font-bold mb-2 uppercase tracking-widest">Farbe</p>
            <label className="block w-full h-12 rounded-xl overflow-hidden cursor-pointer border border-[#22223a] mb-2">
              <input
                type="color" value={color}
                onChange={e => setColor(e.target.value)}
                className="w-full h-full cursor-pointer scale-125"
              />
            </label>
            <p className="text-slate-500 text-[10px] font-mono text-center">{color.toUpperCase()}</p>
          </div>

          {/* PALETTE */}
          <div className="bg-[#12121a] border border-[#22223a] rounded-2xl p-3">
            <p className="text-slate-500 text-[10px] font-bold mb-2 uppercase tracking-widest">Palette</p>
            <div className="grid grid-cols-8 xl:grid-cols-5 gap-1">
              {PALETTE.map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  title={c}
                  className={`aspect-square rounded-md border-2 transition-all hover:scale-110 active:scale-95 ${
                    color === c
                      ? 'border-white shadow-[0_0_0_2px_#6c63ff]'
                      : 'border-transparent'
                  }`}
                  style={{ background: c === '#ffffff' ? '#f0f0f0' : c }}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
