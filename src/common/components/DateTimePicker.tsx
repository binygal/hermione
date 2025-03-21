import "cally";
import { CalendarDate } from "cally";
import { RefObject, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Popup from "./Popup";
import { TimePicker } from "./TimePicker";

type DateTimePickerProps = {
  onDateChange: (date: Date) => void;
  value?: Date;
  dateFormatter?: (date: Date) => string;
};

/**
 * parses ISO-8601 date string to a Date object
 * @param date the given date
 * @returns The date in an object
 */
function parseISODate(date: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

const NO_DATE_VALUE = "--/--/---- --:--";

export default function DateTimePicker(props: DateTimePickerProps) {
  const { value, onDateChange, dateFormatter = (date) => date.toISOString() } = props;
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const openPickerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(openPickerRef as RefObject<HTMLDivElement>, () => {
    setIsPickerOpen(false);
  });

  return (
    <Popup
      ref={openPickerRef}
      shouldShow={isPickerOpen}
      content={
        <>
          <calendar-date
            className="cally"
            onchange={(eve) => {
              if (!(eve.target instanceof CalendarDate)) {
                return;
              }
              const date = parseISODate(eve.target.value);
              date.setHours(value?.getHours() || 0);
              date.setMinutes(value?.getMinutes() || 0);
              onDateChange(date);
            }}
          >
            <svg
              aria-label="Previous"
              className="fill-current size-4"
              slot="previous"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M15.75 19.5 8.25 12l7.5-7.5"></path>
            </svg>
            <svg
              aria-label="Next"
              className="fill-current size-4"
              slot="next"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
            </svg>
            <calendar-month></calendar-month>
          </calendar-date>
          <TimePicker
            onTimeChanged={(time) => {
              const clonedDate = new Date(value || Date.now());
              clonedDate.setHours(time.hours);
              clonedDate.setMinutes(time.minutes);
              onDateChange(clonedDate);
            }}
            value={{ hours: value?.getHours() ?? 9, minutes: value?.getMinutes() ?? 0 }}
          />
          <button className="btn btn-primary w-full m-0" onClick={() => setIsPickerOpen(false)}>
            Done
          </button>
        </>
      }
    >
      <button
        className="input input-bordered w-full max-w-xs"
        onClick={() => setIsPickerOpen((state) => !state)}
        ref={buttonRef}
      >
        {value ? dateFormatter(value) : NO_DATE_VALUE}
      </button>
    </Popup>
  );
}
