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

export function convertDateToInputString(date: Date): string {
  return date.toISOString().substring(0, date.toISOString().length - 1);
}

export function convertInputStringToTimestamp(inputString: string): number {
  const date = new Date(inputString);
  return date.getTime();
}

export function isSameDay(lh: number, rh: number): boolean {
  const firstDate = new Date(lh);
  const secondDate = new Date(rh);
  return firstDate.getDay() === secondDate.getDay()
  && firstDate.getMonth() === secondDate.getMonth()
  && firstDate.getFullYear() === secondDate.getFullYear();
}
