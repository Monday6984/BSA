import { useEffect, useState } from 'react';

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

function getParts(target: number): CountdownParts {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isComplete: diff === 0,
  };
}

/** Live countdown to an ISO date. Returns null when no date is set. */
export function useCountdown(targetIso: string | null): CountdownParts | null {
  const target = targetIso ? new Date(targetIso).getTime() : null;
  const [parts, setParts] = useState(() => (target === null ? null : getParts(target)));

  useEffect(() => {
    if (target === null) return;
    const tick = () => {
      const next = getParts(target);
      setParts(next);
      return next.isComplete;
    };
    // Freeze at zero once the target passes — no need to keep ticking.
    if (tick()) return;
    const id = window.setInterval(() => {
      if (tick()) window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return target === null ? null : parts;
}
