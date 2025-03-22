import { CalendarMulti } from "cally";

type MultiDatesPickerProps = {
  selectedDates: Date[];
  onDatesChange: (dates: Date[]) => void;
};

export default function MultiDatesPicker(props: MultiDatesPickerProps) {
  const { selectedDates, onDatesChange } = props;
  const selectedDatesString = selectedDates.map((date) => date.toISOString().split("T")[0]);
  return (
    <calendar-multi
      className="cally"
      value={selectedDatesString.join(" ")}
      onchange={(eve) => {
        if (!(eve.target instanceof CalendarMulti)) {
          return;
        }
        const dates = eve.target.value
          .split(" ")
          .filter((item) => /\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/.test(item))
          .map((dateString) => new Date(dateString));
        onDatesChange(dates);
      }}
    >
      <calendar-month></calendar-month>
    </calendar-multi>
  );
}
