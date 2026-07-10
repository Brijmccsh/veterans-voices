/** mm:ss from seconds. */
export function formatTime(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, '0')}`;
}

export function durationLabel(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)} sec`;
  const m = Math.round(seconds / 60);
  return `${m} min`;
}
