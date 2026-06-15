import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * "JB-RUN" — a retro endless runner in the spirit of Chrome's offline dino.
 * The JB monogram hops over incoming obstacles; score and speed ramp up the
 * longer you survive. Everything is drawn on a single canvas so there are no
 * per-frame React re-renders, and colors are pulled from the theme tokens so
 * it adapts to ink / paper mode.
 */

const W = 640;
const H = 220;
const GROUND_Y = H - 44;
const PLAYER_SIZE = 38;
const PLAYER_X = 64;
const GRAVITY = 2600; // px/s^2
const JUMP_V = 880; // px/s
const BASE_SPEED = 320; // px/s
const HISCORE_KEY = 'jbRunHighScore';

type Phase = 'ready' | 'running' | 'over';

interface Obstacle {
  x: number;
  w: number;
  h: number;
  color: string;
}

interface Cloud {
  x: number;
  y: number;
  s: number;
}

interface Colors {
  bg: string;
  ink: string;
  card: string;
  panel: string;
  a1: string;
  a2: string;
  a3: string;
  a4: string;
}

const RunnerGame: React.FC = () => {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scoreRef = useRef<HTMLSpanElement | null>(null);
  const hiRef = useRef<HTMLSpanElement | null>(null);
  const colorsRef = useRef<Colors | null>(null);

  // Re-read theme tokens whenever the palette flips so the game restyles live.
  // We read the raw `-rgb` channel vars (plain "r g b" values) and build the
  // color ourselves — reading `--ink` directly can return an unresolved
  // `rgb(var(--ink-rgb))`, which is an invalid canvas color.
  useEffect(() => {
    const read = (name: string, fallback: string) => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
      return v ? `rgb(${v})` : fallback;
    };
    colorsRef.current = {
      bg: read('--bg-rgb', 'rgb(247 244 236)'),
      ink: read('--ink-rgb', 'rgb(32 29 24)'),
      card: read('--card-rgb', 'rgb(255 253 248)'),
      panel: read('--panel-rgb', 'rgb(239 234 224)'),
      a1: read('--a1-rgb', 'rgb(226 92 51)'),
      a2: read('--a2-rgb', 'rgb(61 95 208)'),
      a3: read('--a3-rgb', 'rgb(46 158 91)'),
      a4: read('--a4-rgb', 'rgb(239 201 63)'),
    };
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = false;

    let phase: Phase = 'ready';
    let playerY = GROUND_Y - PLAYER_SIZE;
    let vy = 0;
    let onGround = true;
    let speed = BASE_SPEED;
    let score = 0;
    let hiScore = 0;
    try {
      hiScore = parseInt(localStorage.getItem(HISCORE_KEY) || '0', 10) || 0;
    } catch {
      hiScore = 0;
    }
    let obstacles: Obstacle[] = [];
    let nextGap = 320;
    let distSinceSpawn = 0;
    let groundScroll = 0;
    let clouds: Cloud[] = [
      { x: 120, y: 46, s: 0.4 },
      { x: 360, y: 80, s: 0.55 },
      { x: 560, y: 38, s: 0.3 },
    ];
    let raf = 0;
    let last = performance.now();

    const accents = ['a2', 'a3', 'a1', 'a4'] as const;

    const reset = () => {
      playerY = GROUND_Y - PLAYER_SIZE;
      vy = 0;
      onGround = true;
      speed = BASE_SPEED;
      score = 0;
      obstacles = [];
      nextGap = 320;
      distSinceSpawn = 0;
    };

    const spawn = () => {
      const c = colorsRef.current;
      const tall = Math.random() > 0.7;
      const h = tall ? 52 + Math.random() * 16 : 30 + Math.random() * 16;
      const w = 18 + Math.random() * 16;
      const accent = accents[Math.floor(Math.random() * accents.length)];
      obstacles.push({ x: W + 20, w, h, color: c ? (c as any)[accent] : '#3d5fd0' });
      // Gap shrinks as speed climbs, with jitter, but always clears a jump.
      const minGap = Math.max(180, 520 - speed * 0.4);
      nextGap = minGap + Math.random() * 200;
      distSinceSpawn = 0;
    };

    const jump = () => {
      if (phase === 'ready') {
        phase = 'running';
        reset();
        vy = -JUMP_V;
        onGround = false;
        return;
      }
      if (phase === 'over') {
        phase = 'running';
        reset();
        vy = -JUMP_V;
        onGround = false;
        return;
      }
      if (onGround) {
        vy = -JUMP_V;
        onGround = false;
      }
    };

    const gameOver = () => {
      phase = 'over';
      if (score > hiScore) {
        hiScore = Math.floor(score);
        try {
          localStorage.setItem(HISCORE_KEY, String(hiScore));
        } catch {
          /* ignore */
        }
      }
    };

    const drawPlayer = (c: Colors) => {
      const x = PLAYER_X;
      const y = playerY;
      ctx.fillStyle = c.a1;
      ctx.fillRect(x, y, PLAYER_SIZE, PLAYER_SIZE);
      ctx.lineWidth = 3;
      ctx.strokeStyle = c.ink;
      ctx.strokeRect(x + 1.5, y + 1.5, PLAYER_SIZE - 3, PLAYER_SIZE - 3);
      ctx.fillStyle = '#fffdf8';
      ctx.font = '700 15px "Space Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('JB', x + PLAYER_SIZE / 2, y + PLAYER_SIZE / 2 + 1);
    };

    const draw = (c: Colors) => {
      ctx.clearRect(0, 0, W, H);

      // clouds
      ctx.fillStyle = c.panel;
      clouds.forEach((cl) => {
        ctx.fillRect(cl.x, cl.y, 34, 10);
        ctx.fillRect(cl.x + 8, cl.y - 8, 20, 10);
      });

      // ground line + dashes
      ctx.strokeStyle = c.ink;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(W, GROUND_Y);
      ctx.stroke();
      ctx.fillStyle = c.ink;
      const dashGap = 28;
      const dashW = 12;
      // Normalize the scroll into [0, dashGap) and tile across the full width
      // (starting one gap off-screen left) so dashes never leave bare road.
      const shift = ((groundScroll % dashGap) + dashGap) % dashGap;
      for (let x = shift - dashGap; x < W; x += dashGap) {
        ctx.fillRect(x, GROUND_Y + 8, dashW, 3);
      }

      // obstacles
      obstacles.forEach((o) => {
        ctx.fillStyle = o.color;
        ctx.fillRect(o.x, GROUND_Y - o.h, o.w, o.h);
        ctx.lineWidth = 3;
        ctx.strokeStyle = c.ink;
        ctx.strokeRect(o.x + 1.5, GROUND_Y - o.h + 1.5, o.w - 3, o.h - 3);
      });

      drawPlayer(c);

      // score (top-right, mono retro)
      ctx.fillStyle = c.ink;
      ctx.font = '700 16px "Space Mono", monospace';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillText(
        `HI ${String(Math.floor(hiScore)).padStart(5, '0')}  ${String(
          Math.floor(score)
        ).padStart(5, '0')}`,
        W - 16,
        14
      );

      // overlays — drawn on a retro "modal" so text always contrasts the
      // screen regardless of ink / paper theme.
      if (phase !== 'running') {
        const bw = 320;
        const bh = 96;
        const bx = (W - bw) / 2;
        const by = H / 2 - bh / 2 - 4;

        ctx.fillStyle = c.ink; // hard shadow
        ctx.fillRect(bx + 6, by + 6, bw, bh);
        ctx.fillStyle = c.card; // panel face
        ctx.fillRect(bx, by, bw, bh);
        ctx.lineWidth = 4;
        ctx.strokeStyle = c.ink;
        ctx.strokeRect(bx + 2, by + 2, bw - 4, bh - 4);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = c.ink;
        ctx.font = '700 26px "Archivo Black", "Space Mono", sans-serif';
        ctx.fillText(
          phase === 'ready' ? 'JB-RUN' : 'GAME OVER',
          W / 2,
          by + 36
        );
        ctx.font = '700 12px "Space Mono", monospace';
        ctx.fillStyle = c.a1;
        ctx.fillText(
          phase === 'ready'
            ? 'PRESS SPACE / TAP TO JUMP'
            : 'PRESS SPACE / TAP TO RETRY',
          W / 2,
          by + 66
        );
      }
    };

    const loop = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const c = colorsRef.current!;

      if (phase === 'running') {
        score += dt * 14;
        speed = BASE_SPEED + Math.min(score * 0.7, 380);
        groundScroll = (groundScroll - speed * dt) % W;

        // physics
        vy += GRAVITY * dt;
        playerY += vy * dt;
        if (playerY >= GROUND_Y - PLAYER_SIZE) {
          playerY = GROUND_Y - PLAYER_SIZE;
          vy = 0;
          onGround = true;
        }

        // spawn + move obstacles
        distSinceSpawn += speed * dt;
        if (distSinceSpawn >= nextGap) spawn();
        obstacles.forEach((o) => (o.x -= speed * dt));
        obstacles = obstacles.filter((o) => o.x + o.w > -20);

        // collisions (slightly forgiving hitbox)
        const pad = 5;
        const px = PLAYER_X + pad;
        const py = playerY + pad;
        const ps = PLAYER_SIZE - pad * 2;
        for (const o of obstacles) {
          if (
            px < o.x + o.w &&
            px + ps > o.x &&
            py < GROUND_Y &&
            py + ps > GROUND_Y - o.h
          ) {
            gameOver();
            break;
          }
        }

        // drift clouds
        clouds.forEach((cl) => {
          cl.x -= speed * 0.15 * dt;
          if (cl.x < -40) cl.x = W + Math.random() * 80;
        });
      } else {
        groundScroll = (groundScroll - BASE_SPEED * 0.25 * dt) % W;
      }

      if (scoreRef.current)
        scoreRef.current.textContent = String(Math.floor(score)).padStart(5, '0');
      if (hiRef.current)
        hiRef.current.textContent = String(Math.floor(hiScore)).padStart(5, '0');

      draw(c);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'Enter') {
        e.preventDefault();
        jump();
      }
    };
    const onPointer = (e: Event) => {
      e.preventDefault();
      jump();
    };

    window.addEventListener('keydown', onKey);
    canvas.addEventListener('pointerdown', onPointer);

    // expose jump for the on-screen button
    (canvas as any).__jump = jump;

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
      canvas.removeEventListener('pointerdown', onPointer);
    };
  }, []);

  const handleButton = () => {
    const canvas = canvasRef.current as any;
    if (canvas && typeof canvas.__jump === 'function') canvas.__jump();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <span className="kicker text-ink/60">JB-RUN</span>
        <span className="kicker text-ink/60">
          HI <span ref={hiRef}>00000</span> · <span ref={scoreRef}>00000</span>
        </span>
      </div>

      <div className="rounded-2xl border-4 border-ink overflow-hidden bg-bg">
        <canvas
          ref={canvasRef}
          className="block w-full h-auto select-none touch-none"
          style={{ aspectRatio: `${W} / ${H}`, imageRendering: 'pixelated' }}
          aria-label="JB-RUN: a retro endless runner. Press space or tap to jump."
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button type="button" className="btn" onClick={handleButton}>
          <i className="fas fa-arrow-up" /> Jump
        </button>
        <span className="kicker text-ink/50">
          Space / ↑ / tap the screen to hop
        </span>
      </div>
    </div>
  );
};

export default RunnerGame;
