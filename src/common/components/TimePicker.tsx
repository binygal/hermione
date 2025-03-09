type Time = {
  hours: number;
  minutes: number;
};

type TimePickerProps = {
  onTimeChanged: (time: Time) => void;
  value: Time;
};

function validateNumberAndNotify(value: string, min: number, max: number, notify: (value: number) => void) {
  const targetValue = Number(value);
  const enforcedNumberValue = !isNaN(targetValue) ? targetValue : min;
  const clampedValue = Math.min(max, Math.max(min, enforcedNumberValue));
  notify(clampedValue);
}

export function TimePicker(props: TimePickerProps) {
  const { onTimeChanged, value } = props;
  return (
    <div className="flex items-center">
      <input
        value={String(value.hours).padStart(2, "0")}
        type="number"
        min="0"
        max="23"
        className="input inline flex-1"
        onChange={(e) => {
          validateNumberAndNotify(e.target.value, 0, 23, (newValue) =>
            onTimeChanged({ hours: newValue, minutes: value.minutes })
          );
        }}
      />
      :
      <input
        value={String(value.minutes).padStart(2, "0")}
        type="number"
        min="0"
        max="23"
        className="input inline flex-1"
        onChange={(e) => {
          validateNumberAndNotify(e.target.value, 0, 59, (newValue) =>
            onTimeChanged({ hours: value.hours, minutes: newValue })
          );
        }}
      />
    </div>
  );
}
