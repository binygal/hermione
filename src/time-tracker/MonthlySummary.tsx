import { TimeDiff } from '../common/extensions/date';

type MonthlySummaryProps = {
  monthlyRecord: TimeDiff
};

export default function MonthlySummary(props: MonthlySummaryProps) {
  const { monthlyRecord } = props;
  return (
    <div>
      This month so far:
      {' '}
      {monthlyRecord.hours}
      :
      {monthlyRecord.minutes}
    </div>
  );
}
