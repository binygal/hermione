export type TimeDiff = {
  hours: number;
  minutes: number;
};

const SECONDS_PER_DAY = 86400000;

export function utcDate(year: number, month: number, day: number): Date {
  const date = new Date();
  date.setUTCFullYear(year);
  date.setUTCMonth(month);
  date.setUTCDate(day);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}

export function utcDateFromTimestamp(timestamp: number): Date {
  const date = new Date(timestamp);
  return utcDate(date.getFullYear(), date.getMonth(), date.getDate());
}

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

export function monthEncapsulingDates(
  firstDayOfMonth: number,
  today: number,
): [start: number, end: number] {
  const todayAsDate = new Date(today);
  const startingMonth = todayAsDate.getDate() < firstDayOfMonth
    ? todayAsDate.getMonth() - 1
    : todayAsDate.getMonth();
  const firstDay = utcDate(todayAsDate.getFullYear(), startingMonth, firstDayOfMonth);
  const lastDay = utcDate(todayAsDate.getFullYear(), startingMonth + 1, firstDayOfMonth);
  return [firstDay.getTime(), lastDay.getTime()];
}

export function numberOfDaysBetweenDates(lhDate: number, rhDate: number): number {
  const firstDateNormalized = utcDateFromTimestamp(lhDate);
  const secondDateNormalized = utcDateFromTimestamp(rhDate);

  return (secondDateNormalized.getTime() - firstDateNormalized.getTime()) / SECONDS_PER_DAY;
}

export function numberOfWorkingDaysInMonth(date: number, firstDayOfMonth: number): number {
  const [startOfMonth, endOfMonth] = monthEncapsulingDates(firstDayOfMonth, date);
  const firstDate = utcDateFromTimestamp(startOfMonth);
  const lastDate = utcDateFromTimestamp(endOfMonth);

  const numberOfDaysInPeriod = numberOfDaysBetweenDates(startOfMonth, endOfMonth);

  const firstWeekDay = firstDate.getDay();
  const firstWeekDays = 7 - firstWeekDay;
  const firstWeekWorkingDays = Math.max(0, firstWeekDays - 2);
  const lastWeekDay = lastDate.getDay();
  const lastWeekWorkingDays = Math.max(0, Math.min(5, lastWeekDay));

  const middleWeeksDays = ((numberOfDaysInPeriod - firstWeekDays - lastWeekDay) / 7) * 5;
  return firstWeekWorkingDays + lastWeekWorkingDays + middleWeeksDays;
}

export function convertDateToDateString(date: Date): string {
  return `${date.getFullYear()}-${
    date.getMonth().toString().padStart(2, '0')}-${
    date.getDate().toString().padStart(2, '0')}`;
}
