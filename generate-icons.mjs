import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';

function generateIcon(size, path) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0a0a0f';
  ctx.fillRect(0, 0, size, size);

  // Purple circle
  const cx = size / 2, cy = size / 2, r = size * 0.42;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = '#6c63ff';
  ctx.fill();

  // Soccer ball emoji text
  ctx.font = `${size * 0.45}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('⚽', cx, cy + size * 0.03);

  writeFileSync(path, canvas.toBuffer('image/png'));
  console.log(`Generated ${path}`);
}

generateIcon(192, 'public/pwa-192.png');
generateIcon(512, 'public/pwa-512.png');
