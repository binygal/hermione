import PrettyTime from '../components/PrettyTime';
import { Record } from '../data/data.types';
import styles from './RecordEntry.module.css';

type RecordEntryProps = {
  record: Record
};

export default function RecordEntry(props: RecordEntryProps) {
  const { record } = props;
  const endTimeElement = record.endTime ? <PrettyTime time={record.endTime} mode="time" /> : 'on going';
  return (
    <div className={styles.container}>
      <PrettyTime time={record.startTime} mode="date" />
      <div className={styles.timeContainer}>
        <PrettyTime time={record.startTime} mode="time" />
        -
        {endTimeElement}
      </div>
    </div>
  );
}
