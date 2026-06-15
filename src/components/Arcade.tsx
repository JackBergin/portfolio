import React, { useState } from 'react';
import RunnerGame from './RunnerGame';
import SnakeGame from './SnakeGame';

type GameId = 'run' | 'snake';

const games: { id: GameId; label: string; icon: string }[] = [
  { id: 'run', label: 'JB-RUN', icon: 'fa-person-running' },
  { id: 'snake', label: 'JB-SNAKE', icon: 'fa-staff-snake' },
];

/**
 * The arcade cabinet — a single screen with a game selector. Only the active
 * game mounts at a time, so just one animation loop ever runs.
 */
const Arcade: React.FC = () => {
  const [active, setActive] = useState<GameId>('run');

  return (
    <div className="card card--shadow w-full max-w-2xl mx-auto flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="kicker text-ink/60">
          <i className="fas fa-gamepad mr-2" />
          Arcade
        </span>
        <div className="flex gap-2">
          {games.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setActive(g.id)}
              className={`chip chip--btn ${
                active === g.id ? 'chip--active' : ''
              }`}
              aria-pressed={active === g.id}
            >
              <i className={`fas ${g.icon}`} />
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {active === 'run' ? <RunnerGame /> : <SnakeGame />}
    </div>
  );
};

export default Arcade;
