import React, { useRef, useState, useEffect } from 'react';
import { RotateCcw, CheckCircle2, Sparkles, Pencil } from 'lucide-react';
import { sounds } from '../utils/audio';

interface TracingCanvasProps {
  digit: number;
  onComplete: () => void;
}

export const TracingCanvas: React.FC<TracingCanvasProps> = ({ digit, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#2563eb'); // blue crayon

  const colors = [
    { name: 'Blauw', hex: '#2563eb' },
    { name: 'Rood', hex: '#dc2626' },
    { name: 'Groen', hex: '#16a34a' },
    { name: 'Paars', hex: '#9333ea' },
    { name: 'Oranje', hex: '#ea580c' },
  ];

  // Draw background guidelines on canvas
  const drawGuidelines = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);

    // School notebook horizontal helper lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);

    // Top line
    ctx.beginPath();
    ctx.moveTo(20, height * 0.2);
    ctx.lineTo(width - 20, height * 0.2);
    ctx.stroke();

    // Mid line
    ctx.beginPath();
    ctx.moveTo(20, height * 0.5);
    ctx.lineTo(width - 20, height * 0.5);
    ctx.stroke();

    // Baseline (solid)
    ctx.setLineDash([]);
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(20, height * 0.82);
    ctx.lineTo(width - 20, height * 0.82);
    ctx.stroke();

    // Faint dashed trace guideline of digit
    ctx.font = `bold ${Math.round(height * 0.65)}px 'Fredoka', 'Lexend', cursive, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(`${digit}`, width / 2, height * 0.48);

    // Stroke outline
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#94a3b8';
    ctx.setLineDash([8, 8]);
    ctx.strokeText(`${digit}`, width / 2, height * 0.48);
    ctx.setLineDash([]);

    // Green start dot indicator
    const startPositions: Record<number, { x: number; y: number }> = {
      0: { x: width * 0.5, y: height * 0.22 },
      1: { x: width * 0.42, y: height * 0.35 },
      2: { x: width * 0.38, y: height * 0.28 },
      3: { x: width * 0.38, y: height * 0.28 },
      4: { x: width * 0.58, y: height * 0.24 },
      5: { x: width * 0.55, y: height * 0.25 },
      6: { x: width * 0.52, y: height * 0.25 },
    };

    const start = startPositions[digit] || { x: width * 0.5, y: height * 0.3 };

    // Draw glowing green start dot
    ctx.beginPath();
    ctx.arc(start.x, start.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = '#22c55e';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // Small label "Start"
    ctx.font = 'bold 12px Lexend, sans-serif';
    ctx.fillStyle = '#15803d';
    ctx.fillText('START', start.x, start.y - 16);
  };

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use display size for crisp rendering on high-DPI displays / Chromebooks
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);
    drawGuidelines(ctx, rect.width, rect.height);
    setHasDrawn(false);
  };

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [digit]);

  // Touch / mouse handling
  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else if ('clientX' in e) {
      return {
        x: (e as React.MouseEvent).clientX - rect.left,
        y: (e as React.MouseEvent).clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    const { x, y } = getPos(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getPos(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.preventDefault();
    setIsDrawing(false);
  };

  const handleClear = () => {
    sounds.playClick();
    initCanvas();
  };

  const handleFinish = () => {
    sounds.playCorrect();
    onComplete();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto bg-white rounded-3xl p-5 shadow-lg border-4 border-amber-200">
      <div className="flex items-center justify-between w-full mb-3 px-2">
        <div className="flex items-center gap-2">
          <Pencil className="w-6 h-6 text-amber-500" />
          <span className="font-display font-bold text-lg text-slate-800">
            Schrijf het cijfer <span className="text-2xl text-blue-600">{digit}</span>
          </span>
        </div>

        {/* Color pickers */}
        <div className="flex items-center gap-1.5 bg-amber-50 p-1.5 rounded-full border border-amber-200">
          {colors.map((c) => (
            <button
              key={c.name}
              onClick={() => {
                sounds.playClick();
                setSelectedColor(c.hex);
              }}
              style={{ backgroundColor: c.hex }}
              className={`w-7 h-7 rounded-full transition-transform ${
                selectedColor === c.hex ? 'scale-125 ring-2 ring-slate-800 ring-offset-2' : 'hover:scale-110 opacity-80'
              }`}
              title={c.name}
              aria-label={`Kleur ${c.name}`}
            />
          ))}
        </div>
      </div>

      <div className="relative w-full h-72 sm:h-80 bg-amber-50/40 rounded-2xl border-2 border-dashed border-amber-300 overflow-hidden cursor-crosshair touch-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        {!hasDrawn && (
          <div className="absolute inset-x-0 bottom-4 text-center pointer-events-none">
            <span className="bg-amber-100/90 text-amber-900 font-reading text-sm px-4 py-1.5 rounded-full shadow-sm">
              ✍️ Begin bij de groene stip en trek het cijfer over!
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between w-full mt-4 gap-3">
        <button
          onClick={handleClear}
          className="chromebook-btn flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-semibold text-base transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Opnieuw wissen
        </button>

        <button
          onClick={handleFinish}
          disabled={!hasDrawn}
          className={`chromebook-btn flex items-center gap-2 px-7 py-3 rounded-2xl font-display font-bold text-lg shadow-md transition-all ${
            hasDrawn
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-emerald-200 hover:scale-105'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          Klaar! Goed gedaan 👍
        </button>
      </div>
    </div>
  );
};
