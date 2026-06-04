import { useState, useRef, useEffect, useCallback } from 'react';
import { Pencil, Eraser, Square, Circle, Minus, Download, Trash2, RotateCcw, RotateCw, Pipette, PaintBucket } from 'lucide-react';

type Tool = 'pencil' | 'brush' | 'eraser' | 'line' | 'rect' | 'circle' | 'fill' | 'picker';

const PALETTE = [
  '#000000','#ffffff','#c8102e','#003087','#1a7a1a','#f59e0b',
  '#6c63ff','#ff6600','#00aaff','#aa00ff','#ff0066','#00cc88',
  '#d4956a','#c07840','#8b5530','#e8bb88','#1a0a02','#2c1a08',
  '#333333','#666666','#999999','#cccccc','#ffe4c4','#ffd700',
];

const SIZES = [1, 2, 4, 6, 10, 16, 24];

export default function SpielerZeichnen() {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const overlayRef   = useRef<HTMLCanvasElement>(null); // for shape preview
  const [tool, setTool]     = useState<Tool>('pencil');
  const [color, setColor]   = useState('#c8102e');
  const [size, setSize]     = useState(4);
  const [drawing, setDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [future,  setFuture]  = useState<ImageData[]>([]);
  const [startPt, setStartPt] = useState({ x: 0, y: 0 });
  const lastPt = useRef({ x: 0, y: 0 });

  const W = 320, H = 480;

  /* init canvas */
  useEffect(() => {
    const c = canvasRef.current!;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);
    /* starter guide outline */
    ctx.strokeStyle = '#dddddd';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    /* head */
    ctx.beginPath(); ctx.ellipse(W/2, H*0.14, 38, 46, 0, 0, Math.PI*2); ctx.stroke();
    /* torso */
    ctx.beginPath(); ctx.roundRect(W/2-52, H*0.26, 104, 130, 8); ctx.stroke();
    /* left arm */
    ctx.beginPath(); ctx.roundRect(W/2-82, H*0.27, 30, 100, 8); ctx.stroke();
    /* right arm */
    ctx.beginPath(); ctx.roundRect(W/2+52, H*0.27, 30, 100, 8); ctx.stroke();
    /* left leg */
    ctx.beginPath(); ctx.roundRect(W/2-50, H*0.52, 40, 140, 8); ctx.stroke();
    /* right leg */
    ctx.beginPath(); ctx.roundRect(W/2+10, H*0.52, 40, 140, 8); ctx.stroke();
    ctx.setLineDash([]);
    saveHistory();
  }, []);

  function getCtx()  { return canvasRef.current!.getContext('2d')!; }
  function getOCtx() { return overlayRef.current!.getContext('2d')!; }

  function saveHistory() {
    const ctx = getCtx();
    const snap = ctx.getImageData(0, 0, W, H);
    setHistory(h => [...h.slice(-30), snap]);
    setFuture([]);
  }

  function undo() {
    if (history.length < 2) return;
    const prev = history[history.length - 2];
    const curr = history[history.length - 1];
    getCtx().putImageData(prev, 0, 0);
    setHistory(h => h.slice(0, -1));
    setFuture(f => [curr, ...f.slice(0, 20)]);
  }
  function redo() {
    if (!future.length) return;
    const next = future[0];
    getCtx().putImageData(next, 0, 0);
    setFuture(f => f.slice(1));
    setHistory(h => [...h, next]);
  }

  function getPos(e: React.PointerEvent | React.TouchEvent): { x: number; y: number } {
    const rect = canvasRef.current!.getBoundingClientRect();
    const scaleX = W / rect.width;
    const scaleY = H / rect.height;
    if ('touches' in e) {
      const t = e.touches[0];
      return { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY };
    }
    return { x: ((e as React.PointerEvent).clientX - rect.left) * scaleX,
             y: ((e as React.PointerEvent).clientY - rect.top)  * scaleY };
  }

  /* flood fill */
  function floodFill(x: number, y: number, fillColor: string) {
    const ctx = getCtx();
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    const idx = (Math.round(y) * W + Math.round(x)) * 4;
    const [tr, tg, tb, ta] = [d[idx], d[idx+1], d[idx+2], d[idx+3]];
    const fc = parseInt(fillColor.replace('#',''), 16);
    const [fr, fg, fb] = [(fc>>16)&255, (fc>>8)&255, fc&255];
    if (tr===fr && tg===fg && tb===fb) return;
    const stack = [Math.round(x), Math.round(y)];
    while (stack.length) {
      const cy = stack.pop()!, cx = stack.pop()!;
      if (cx<0||cx>=W||cy<0||cy>=H) continue;
      const i = (cy*W+cx)*4;
      if (d[i]!==tr||d[i+1]!==tg||d[i+2]!==tb||d[i+3]!==ta) continue;
      d[i]=fr; d[i+1]=fg; d[i+2]=fb; d[i+3]=255;
      stack.push(cx-1,cy, cx+1,cy, cx,cy-1, cx,cy+1);
    }
    ctx.putImageData(img, 0, 0);
  }

  function drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  }

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    const pt = getPos(e);
    setDrawing(true);
    lastPt.current = pt;
    setStartPt(pt);

    const ctx = getCtx();
    ctx.lineCap = 'round';
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
      ctx.lineWidth   = tool === 'brush'  ? size * 2.2 : size;
      ctx.globalAlpha = 1;
      ctx.beginPath(); ctx.moveTo(pt.x, pt.y);
    }
  }, [tool, color, size]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!drawing) return;
    e.preventDefault();
    const pt = getPos(e);
    const ctx = getCtx();
    const oct = getOCtx();

    if (tool === 'pencil' || tool === 'brush' || tool === 'eraser') {
      ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
      ctx.lineWidth   = tool === 'brush'  ? size * 2.2 : size;
      ctx.lineTo(pt.x, pt.y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pt.x, pt.y);
    } else {
      /* shape preview on overlay */
      oct.clearRect(0, 0, W, H);
      oct.strokeStyle = color;
      oct.lineWidth = size;
      oct.lineCap = 'round';
      if (tool === 'line') {
        drawLine(oct, startPt.x, startPt.y, pt.x, pt.y);
      } else if (tool === 'rect') {
        oct.strokeRect(startPt.x, startPt.y, pt.x - startPt.x, pt.y - startPt.y);
      } else if (tool === 'circle') {
        oct.beginPath();
        oct.ellipse(
          (startPt.x + pt.x)/2, (startPt.y + pt.y)/2,
          Math.abs(pt.x - startPt.x)/2, Math.abs(pt.y - startPt.y)/2,
          0, 0, Math.PI*2
        );
        oct.stroke();
      }
    }
    lastPt.current = pt;
  }, [drawing, tool, color, size, startPt]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!drawing) return;
    e.preventDefault();
    const pt = getPos(e);
    const ctx = getCtx();
    const oct = getOCtx();

    if (tool === 'line') {
      ctx.strokeStyle = color; ctx.lineWidth = size; ctx.lineCap = 'round';
      drawLine(ctx, startPt.x, startPt.y, pt.x, pt.y);
    } else if (tool === 'rect') {
      ctx.strokeStyle = color; ctx.lineWidth = size;
      ctx.strokeRect(startPt.x, startPt.y, pt.x - startPt.x, pt.y - startPt.y);
    } else if (tool === 'circle') {
      ctx.strokeStyle = color; ctx.lineWidth = size;
      ctx.beginPath();
      ctx.ellipse(
        (startPt.x + pt.x)/2, (startPt.y + pt.y)/2,
        Math.abs(pt.x - startPt.x)/2, Math.abs(pt.y - startPt.y)/2,
        0, 0, Math.PI*2
      );
      ctx.stroke();
    }
    oct.clearRect(0, 0, W, H);
    setDrawing(false);
    saveHistory();
  }, [drawing, tool, color, size, startPt]);

  function clearCanvas() {
    const ctx = getCtx();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);
    saveHistory();
  }

  function download() {
    const a = document.createElement('a');
    a.href = canvasRef.current!.toDataURL('image/png');
    a.download = 'mein-spieler.png';
    a.click();
  }

  const tools: { id: Tool; icon: React.ReactNode; label: string }[] = [
    { id: 'pencil', icon: <Pencil size={18}/>,      label: 'Stift' },
    { id: 'brush',  icon: <span className="text-base font-black">B</span>, label: 'Pinsel' },
    { id: 'eraser', icon: <Eraser size={18}/>,       label: 'Radierer' },
    { id: 'line',   icon: <Minus size={18}/>,         label: 'Linie' },
    { id: 'rect',   icon: <Square size={18}/>,        label: 'Rechteck' },
    { id: 'circle', icon: <Circle size={18}/>,        label: 'Kreis' },
    { id: 'fill',   icon: <PaintBucket size={18}/>,   label: 'Füllen' },
    { id: 'picker', icon: <Pipette size={18}/>,       label: 'Farbe wählen' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-3 pb-safe-nav md:pb-8 pt-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#6c63ff]/20 border border-[#6c63ff]/30 flex items-center justify-center">
          <Pencil size={20} className="text-[#6c63ff]"/>
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">Spieler zeichnen</h1>
          <p className="text-slate-500 text-sm">Zeichne deinen Spieler frei</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">

        {/* ── CANVAS AREA ── */}
        <div className="flex-1 flex flex-col items-center gap-3">

          {/* top toolbar: undo/redo/clear/save */}
          <div className="flex items-center gap-2 w-full max-w-sm">
            <button onClick={undo} title="Rückgängig"
              className="w-10 h-10 rounded-xl bg-[#12121a] border border-[#22223a] hover:border-slate-500 flex items-center justify-center text-slate-400 transition-all active:scale-90">
              <RotateCcw size={16}/>
            </button>
            <button onClick={redo} title="Wiederholen"
              className="w-10 h-10 rounded-xl bg-[#12121a] border border-[#22223a] hover:border-slate-500 flex items-center justify-center text-slate-400 transition-all active:scale-90">
              <RotateCw size={16}/>
            </button>
            <button onClick={clearCanvas} title="Leeren"
              className="w-10 h-10 rounded-xl bg-[#12121a] border border-[#22223a] hover:border-red-500/50 flex items-center justify-center text-slate-400 transition-all active:scale-90">
              <Trash2 size={16}/>
            </button>
            <div className="flex-1"/>
            <button onClick={download}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6c63ff] hover:bg-[#5a52e8] text-white text-sm font-bold transition-all active:scale-95">
              <Download size={15}/> Speichern
            </button>
          </div>

          {/* canvas */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#22223a] shadow-2xl"
            style={{ width: '100%', maxWidth: 320, aspectRatio: '320/480', touchAction: 'none' }}>
            <canvas ref={canvasRef} width={W} height={H}
              className="absolute inset-0 w-full h-full"
              style={{ cursor: tool==='eraser'?'cell':tool==='picker'?'crosshair':tool==='fill'?'copy':'crosshair', imageRendering:'pixelated' }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}/>
            {/* overlay for shape preview */}
            <canvas ref={overlayRef} width={W} height={H}
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ imageRendering:'pixelated' }}/>
          </div>

          {/* help text */}
          <p className="text-slate-600 text-xs text-center">
            Die gestrichelten Linien zeigen die Körperform — male darüber!
          </p>
        </div>

        {/* ── SIDEBAR: tools + colors ── */}
        <div className="lg:w-56 flex flex-col gap-4">

          {/* TOOLS */}
          <div className="bg-[#12121a] border border-[#22223a] rounded-2xl p-3">
            <p className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-wider">Werkzeuge</p>
            <div className="grid grid-cols-4 lg:grid-cols-2 gap-1.5">
              {tools.map(t=>(
                <button key={t.id} onClick={()=>setTool(t.id)}
                  title={t.label}
                  className={`flex flex-col items-center gap-1 py-2 px-1 rounded-xl text-xs font-semibold transition-all ${
                    tool===t.id
                      ? 'bg-[#6c63ff] text-white'
                      : 'bg-[#1a1a27] text-slate-400 hover:bg-[#22223a] hover:text-white'
                  }`}>
                  {t.icon}
                  <span className="text-[9px] leading-none">{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SIZE */}
          <div className="bg-[#12121a] border border-[#22223a] rounded-2xl p-3">
            <p className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-wider">Stärke</p>
            <div className="flex flex-wrap gap-1.5">
              {SIZES.map(s=>(
                <button key={s} onClick={()=>setSize(s)}
                  className={`flex items-center justify-center rounded-lg transition-all ${
                    size===s ? 'bg-[#6c63ff]' : 'bg-[#1a1a27] hover:bg-[#22223a]'
                  }`}
                  style={{ width: 32, height: 32 }}>
                  <div className="rounded-full bg-white" style={{ width: Math.min(s*1.5, 22), height: Math.min(s*1.5, 22) }}/>
                </button>
              ))}
            </div>
          </div>

          {/* CURRENT COLOR */}
          <div className="bg-[#12121a] border border-[#22223a] rounded-2xl p-3">
            <p className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-wider">Aktuelle Farbe</p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl border-2 border-[#22223a] flex-shrink-0"
                style={{ background: color }}/>
              <div className="flex-1">
                <label className="w-full h-10 rounded-xl overflow-hidden block cursor-pointer border border-[#22223a]">
                  <input type="color" value={color} onChange={e=>setColor(e.target.value)}
                    className="w-full h-full cursor-pointer scale-110"/>
                </label>
                <p className="text-slate-500 text-[10px] mt-1 font-mono">{color}</p>
              </div>
            </div>
          </div>

          {/* PALETTE */}
          <div className="bg-[#12121a] border border-[#22223a] rounded-2xl p-3">
            <p className="text-slate-400 text-xs font-bold mb-2 uppercase tracking-wider">Palette</p>
            <div className="grid grid-cols-6 lg:grid-cols-4 gap-1.5">
              {PALETTE.map(c=>(
                <button key={c} onClick={()=>setColor(c)}
                  className={`w-full aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                    color===c ? 'border-white scale-110 shadow-[0_0_0_2px_#6c63ff]' : 'border-transparent'
                  }`}
                  style={{ background: c==='#ffffff'?'#f0f0f0':c }}/>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
