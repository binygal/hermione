import { useState } from "react";
import DateTimePicker from "../common/components/DateTimePicker";
import { dateFormatter } from "../common/extensions/date";
import MainActionButton from "../components/MainActionButton";

type PickStartTimeProps = {
  onStartTimePicked: (startTime: Date) => void;
};

export default function PickStartTime(props: PickStartTimeProps) {
  const { onStartTimePicked } = props;
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  return (
    <div>
      <h1>Start time</h1>
      <DateTimePicker onDateChange={setSelectedDate} dateFormatter={dateFormatter} value={selectedDate} />
      <MainActionButton title="Start from picked time" onClick={() => onStartTimePicked(selectedDate)} />
    </div>
  );
}
