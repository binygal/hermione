export default function monthEncapsulingDates(
  firstDayOfMonth: number,
  today: number,
): [start: number, end: number] {
  const todayAsDate = new Date(today);
  const startingMonth = todayAsDate.getDate() < firstDayOfMonth
    ? todayAsDate.getMonth() - 1
    : todayAsDate.getMonth();
  const firstDay = new Date(todayAsDate.getFullYear(), startingMonth, firstDayOfMonth);
  const lastDay = new Date(todayAsDate.getFullYear(), startingMonth + 1, firstDayOfMonth);
  return [firstDay.getTime(), lastDay.getTime()];
}
