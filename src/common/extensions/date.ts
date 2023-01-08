export type TimeDiff = {
  hours: number;
  minutes: number;
};

export function getTimeDiff(lh: number, rh: number): TimeDiff {
  const diffMs = rh - lh;
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
  return { hours: diffHrs, minutes: diffMins };
}
