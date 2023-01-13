import { TimeDiff } from '../common/extensions/date';
import styles from './MonthlySummary.module.css';

type MonthlySummaryProps = {
  monthlyRecord: TimeDiff
};

export default function MonthlySummary(props: MonthlySummaryProps) {
  const { monthlyRecord } = props;
  return (
    <div className={styles.container}>
      This month so far:
      {' '}
      {monthlyRecord.hours.toString().padStart(2, '0')}
      :
      {monthlyRecord.minutes.toString().padStart(2, '0')}
    </div>
  );
}
