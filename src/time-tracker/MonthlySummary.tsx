import { TimeDiff } from "../common/extensions/date";
import styles from "./MonthlySummary.module.css";

type MonthlySummaryProps = {
  monthlyRecord: TimeDiff;
  timeToCompletion: TimeDiff;
};

export default function MonthlySummary(props: MonthlySummaryProps) {
  const { monthlyRecord, timeToCompletion } = props;
  const time = `${timeToCompletion.hours.toString().padStart(2, "0")}:${timeToCompletion.minutes
    .toString()
    .padStart(2, "0")}`;
  const timeToCompletionElement =
    timeToCompletion.hours === 0 && timeToCompletion.minutes === 0
      ? "You've passed the expected time"
      : `${time} are still needed this month`;
  return (
    <div className={styles.container}>
      <div className={styles.timeSoFar}>
        This month so far: {monthlyRecord.hours.toString().padStart(2, "0")}:
        {monthlyRecord.minutes.toString().padStart(2, "0")}
      </div>
      <div className={styles.remainingTime}>{timeToCompletionElement}</div>
    </div>
  );
}
