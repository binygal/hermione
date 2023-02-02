import { getTimeDiff, isSameDay } from '../common/extensions/date';
import PrettyTime from '../components/PrettyTime';
import SVGButton from '../components/SVGButton';
import { Record } from '../data/data.types';
import styles from './RecordEntry.module.css';
import deleteLogo from '../components/resources/delete-can.svg';
import editLogo from '../components/resources/edit.svg';
import ElapsingTime from '../components/ElapsingTime';

type RecordEntryProps = {
  record: Record,
  onEditClicked: () => void,
  onDeleteClicked: () => void
};

export default function RecordEntry(props: RecordEntryProps) {
  const { record, onEditClicked, onDeleteClicked } = props;
  const endTimeElement = record.endTime
    ? <PrettyTime time={record.endTime} mode={isSameDay(record.startTime, record.endTime) ? 'time' : 'date-and-time'} />
    : 'on going';
  const totalTime = getTimeDiff(record.startTime, record.endTime ?? 0);
  const summaryElement = !record.endTime ? null
    : (
      <div className={styles.summary}>
        total time
        {' '}
        <ElapsingTime hours={totalTime.hours} minutes={totalTime.minutes} size="small" />
      </div>
    );
  return (
    <div className={styles.container}>
      <div className={styles.timeContainer}>
        <PrettyTime time={record.startTime} mode="date-and-time" />
        -
        {endTimeElement}
        {record.endTime && <SVGButton svg={editLogo} onClick={onEditClicked} />}
        {record.endTime && <SVGButton svg={deleteLogo} onClick={onDeleteClicked} />}
      </div>
      {summaryElement}
    </div>
  );
}
