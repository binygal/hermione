import { TimeDiff } from '../common/extensions/date';
import styles from './DailySummary.module.css';

export type DailySummaryProps = {
  time: TimeDiff
};

export default function DailySummary(props: DailySummaryProps) {
  const { time } = props;
  return (
    <div className={styles.container}>
      Total time today:
      {' '}
      {time.hours.toString().padStart(2, '0')}
      :
      {time.minutes.toString().padStart(2, '0')}
    </div>
  );
}
