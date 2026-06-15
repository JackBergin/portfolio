import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * "JB-SNAKE" — a grid snake in the same retro/brand style as JB-RUN. Steers
 * with arrows / WASD / swipe / on-screen D-pad. Theme colors are read from the
 * `-rgb` channel tokens so it tracks ink / paper mode, and everything is drawn
 * on one canvas (no per-frame React re-renders).
 */

const COLS = 20;
const ROWS = 15;
const CELL = 24;
const W = COLS * CELL; // 480
const H = ROWS * CELL; // 360
const STEP_START = 150; // ms per move
const STEP_MIN = 70;
const HISCORE_KEY = 'jbSnakeHighScore';

type Phase = 'ready' | 'running' | 'over';
interface Pt {
  x: number;
  y: number;
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

const SnakeGame: React.FC = () => {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scoreRef = useRef<HTMLSpanElement | null>(null);
  const hiRef = useRef<HTMLSpanElement | null>(null);
  const colorsRef = useRef<Colors | null>(null);
  const apiRef = useRef<{
    setDir: (x: number, y: number) => void;
    action: () => void;
  } | null>(null);

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
    let snake: Pt[] = [];
    let dir: Pt = { x: 1, y: 0 };
    let nextDir: Pt = { x: 1, y: 0 };
    let food: Pt = { x: 0, y: 0 };
    let score = 0;
    let step = STEP_START;
    let acc = 0;
    let last = performance.now();
    let raf = 0;
    let hiScore = 0;
    try {
      hiScore = parseInt(localStorage.getItem(HISCORE_KEY) || '0', 10) || 0;
    } catch {
      hiScore = 0;
    }

    const placeFood = () => {
      let p: Pt;
      do {
        p = {
          x: Math.floor(Math.random() * COLS),
          y: Math.floor(Math.random() * ROWS),
        };
      } while (snake.some((s) => s.x === p.x && s.y === p.y));
      food = p;
    };

    const reset = () => {
      const cy = Math.floor(ROWS / 2);
      snake = [
        { x: 5, y: cy },
        { x: 4, y: cy },
        { x: 3, y: cy },
      ];
      dir = { x: 1, y: 0 };
      nextDir = { x: 1, y: 0 };
      score = 0;
      step = STEP_START;
      acc = 0;
      placeFood();
    };

    const gameOver = () => {
      phase = 'over';
      if (score > hiScore) {
        hiScore = score;
        try {
          localStorage.setItem(HISCORE_KEY, String(hiScore));
        } catch {
          /* ignore */
        }
      }
    };

    const setDir = (x: number, y: number) => {
      // Ignore direct reversals (would instantly self-collide).
      if (x === -dir.x && y === -dir.y) return;
      nextDir = { x, y };
    };

    const action = () => {
      if (phase === 'ready' || phase === 'over') {
        reset();
        phase = 'running';
      }
    };

    const stepGame = () => {
      dir = nextDir;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

      if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
        gameOver();
        return;
      }

      const willGrow = head.x === food.x && head.y === food.y;
      const body = willGrow ? snake : snake.slice(0, -1);
      if (body.some((s) => s.x === head.x && s.y === head.y)) {
        gameOver();
        return;
      }

      snake.unshift(head);
      if (willGrow) {
        score += 1;
        step = Math.max(STEP_MIN, step - 4);
        placeFood();
      } else {
        snake.pop();
      }
    };

    const cellRect = (gx: number, gy: number, inset: number) => {
      ctx.fillRect(
        gx * CELL + inset,
        gy * CELL + inset,
        CELL - inset * 2,
        CELL - inset * 2
      );
    };
    const cellStroke = (gx: number, gy: number, inset: number) => {
      ctx.strokeRect(
        gx * CELL + inset + 1,
        gy * CELL + inset + 1,
        CELL - inset * 2 - 2,
        CELL - inset * 2 - 2
      );
    };

    const draw = (c: Colors) => {
      ctx.fillStyle = c.bg;
      ctx.fillRect(0, 0, W, H);

      // subtle grid
      ctx.strokeStyle = c.panel;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = CELL; x < W; x += CELL) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, H);
      }
      for (let y = CELL; y < H; y += CELL) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(W, y + 0.5);
      }
      ctx.stroke();

      // food
      ctx.fillStyle = c.a4;
      cellRect(food.x, food.y, 4);
      ctx.lineWidth = 3;
      ctx.strokeStyle = c.ink;
      cellStroke(food.x, food.y, 4);

      // snake
      snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? c.a1 : c.a3;
        cellRect(s.x, s.y, 2);
        ctx.lineWidth = 3;
        ctx.strokeStyle = c.ink;
        cellStroke(s.x, s.y, 2);
      });

      // score (top-right)
      ctx.fillStyle = c.ink;
      ctx.font = '700 15px "Space Mono", monospace';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      ctx.fillText(
        `HI ${String(hiScore).padStart(4, '0')}  ${String(score).padStart(
          4,
          '0'
        )}`,
        W - 12,
        12
      );

      // overlay modal
      if (phase !== 'running') {
        const bw = 320;
        const bh = 96;
        const bx = (W - bw) / 2;
        const by = H / 2 - bh / 2;

        ctx.fillStyle = c.ink;
        ctx.fillRect(bx + 6, by + 6, bw, bh);
        ctx.fillStyle = c.card;
        ctx.fillRect(bx, by, bw, bh);
        ctx.lineWidth = 4;
        ctx.strokeStyle = c.ink;
        ctx.strokeRect(bx + 2, by + 2, bw - 4, bh - 4);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = c.ink;
        ctx.font = '700 24px "Archivo Black", "Space Mono", sans-serif';
        ctx.fillText(
          phase === 'ready' ? 'JB-SNAKE' : 'GAME OVER',
          W / 2,
          by + 36
        );
        ctx.font = '700 12px "Space Mono", monospace';
        ctx.fillStyle = c.a1;
        ctx.fillText(
          phase === 'ready'
            ? 'ARROWS / SWIPE TO PLAY'
            : 'PRESS SPACE / TAP TO RETRY',
          W / 2,
          by + 66
        );
      }
    };

    reset();
    phase = 'ready';

    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      const c = colorsRef.current!;

      if (phase === 'running') {
        acc += dt;
        while (acc >= step) {
          acc -= step;
          stepGame();
          if (phase !== 'running') break;
        }
      }

      if (scoreRef.current)
        scoreRef.current.textContent = String(score).padStart(4, '0');
      if (hiRef.current)
        hiRef.current.textContent = String(hiScore).padStart(4, '0');

      draw(c);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onKey = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          e.preventDefault();
          setDir(0, -1);
          break;
        case 'ArrowDown':
        case 'KeyS':
          e.preventDefault();
          setDir(0, 1);
          break;
        case 'ArrowLeft':
        case 'KeyA':
          e.preventDefault();
          setDir(-1, 0);
          break;
        case 'ArrowRight':
        case 'KeyD':
          e.preventDefault();
          setDir(1, 0);
          break;
        case 'Space':
        case 'Enter':
          e.preventDefault();
          action();
          break;
      }
    };

    // Pointer: tap to start/restart, swipe to steer.
    let downX = 0;
    let downY = 0;
    let downT = 0;
    const onDown = (e: PointerEvent) => {
      downX = e.clientX;
      downY = e.clientY;
      downT = performance.now();
    };
    const onUp = (e: PointerEvent) => {
      const dx = e.clientX - downX;
      const dy = e.clientY - downY;
      const adx = Math.abs(dx);
      const ady = Math.abs(dy);
      if (adx < 24 && ady < 24 && performance.now() - downT < 400) {
        action();
        return;
      }
      if (adx > ady) setDir(dx > 0 ? 1 : -1, 0);
      else setDir(0, dy > 0 ? 1 : -1);
    };

    window.addEventListener('keydown', onKey);
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointerup', onUp);

    apiRef.current = { setDir, action };

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointerup', onUp);
      apiRef.current = null;
    };
  }, []);

  const dpad = (x: number, y: number) => apiRef.current?.setDir(x, y);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <span className="kicker text-ink/60">JB-SNAKE</span>
        <span className="kicker text-ink/60">
          HI <span ref={hiRef}>0000</span> · <span ref={scoreRef}>0000</span>
        </span>
      </div>

      <div className="rounded-2xl border-4 border-ink overflow-hidden bg-bg mx-auto w-full max-w-sm">
        <canvas
          ref={canvasRef}
          className="block w-full h-auto select-none touch-none"
          style={{ aspectRatio: `${W} / ${H}`, imageRendering: 'pixelated' }}
          aria-label="JB-SNAKE: a retro snake game. Use arrow keys or swipe to play."
          role="img"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="kicker text-ink/50">Arrows / WASD / swipe</span>
        <div className="grid grid-cols-3 gap-1.5 w-max">
          <span />
          <button
            type="button"
            className="chip chip--btn justify-center px-0 w-10 h-10"
            aria-label="Up"
            onClick={() => dpad(0, -1)}
          >
            <i className="fas fa-chevron-up" />
          </button>
          <span />
          <button
            type="button"
            className="chip chip--btn justify-center px-0 w-10 h-10"
            aria-label="Left"
            onClick={() => dpad(-1, 0)}
          >
            <i className="fas fa-chevron-left" />
          </button>
          <button
            type="button"
            className="chip chip--btn justify-center px-0 w-10 h-10"
            aria-label="Down"
            onClick={() => dpad(0, 1)}
          >
            <i className="fas fa-chevron-down" />
          </button>
          <button
            type="button"
            className="chip chip--btn justify-center px-0 w-10 h-10"
            aria-label="Right"
            onClick={() => dpad(1, 0)}
          >
            <i className="fas fa-chevron-right" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
