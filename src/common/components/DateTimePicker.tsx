import "cally";
import { CalendarDate } from "cally";
import { RefObject, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Popup from "./Popup";

type DateTimePickerProps = {
  onDateChange: (date: Date) => void;
  value?: Date;
  dateFormatter?: (date: Date) => string;
};

const timePickerClassNames =
  "bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 " +
  "focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 " +
  "dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

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
  useOnClickOutside(openPickerRef as RefObject<HTMLDivElement>, () => setIsPickerOpen(false));

  return (
    <div>
      <button
        className="input input-bordered w-full max-w-xs"
        onClick={() => setIsPickerOpen((state) => !state)}
        ref={buttonRef}
      >
        {value ? dateFormatter(value) : NO_DATE_VALUE}
      </button>
      <Popup ref={openPickerRef} title="Select a date" shouldShow={isPickerOpen}>
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
          <input
            type="time"
            id="time"
            className={timePickerClassNames}
            value={`${String(value?.getHours() ?? 0).padStart(2, "0")}:${String(value?.getMinutes() ?? 0).padStart(
              2,
              "0"
            )}`}
            required
            onChange={(e) => {
              const [hours, minutes] = e.target.value
                .split(":")
                .map(Number)
                .map((number) => (Number.isFinite(number) ? number : 0));
              const date = new Date(value || Date.now());
              date.setHours(hours);
              date.setMinutes(minutes);
              onDateChange(date);
            }}
          />
        </calendar-date>
      </Popup>
    </div>
  );
}
