import {
  getTimeDiff, monthEncapsulingDates, numberOfDaysBetweenDates, numberOfWorkingDaysInMonth,
} from '../date';

describe('getTimeDiff', () => {
  test('should return 3 hours and 5 minutes according to the input', () => {
    const first = new Date(2022, 1, 25, 12, 43);
    const second = new Date(2022, 1, 25, 15, 48);
    const timeDiff = getTimeDiff(first.getTime(), second.getTime());
    expect(timeDiff).toEqual({ hours: 3, minutes: 5 });
  });

  test('should return 3 hours and 5 minutes according to the input', () => {
    const first = new Date(2022, 0, 31, 23, 40);
    const second = new Date(2022, 1, 1, 2, 45);
    const timeDiff = getTimeDiff(first.getTime(), second.getTime());
    expect(timeDiff).toEqual({ hours: 3, minutes: 5 });
  });
});

describe('encapsulating dates of month', () => {
  test('should return the first day of the month when getting 1', () => {
    const mockToday = Date.UTC(2022, 11, 5);
    const result = monthEncapsulingDates(1, mockToday);

    const firstDay = Date.UTC(2022, 11, 1);
    const lastDay = Date.UTC(2023, 0, 1);

    expect(result[0]).toEqual(firstDay);
    expect(result[1]).toEqual(lastDay);
  });

  test('should return the last month when first day of the month is later', () => {
    const mockToday = Date.UTC(2022, 11, 5);
    const result = monthEncapsulingDates(15, mockToday);

    const firstDay = Date.UTC(2022, 10, 15);
    const lastDay = Date.UTC(2022, 11, 15);

    expect(result[0]).toEqual(firstDay);
    expect(result[1]).toEqual(lastDay);
  });

  test('should return the last month when first day of the month is before', () => {
    const mockToday = Date.UTC(2022, 11, 20);
    const result = monthEncapsulingDates(15, mockToday);

    const firstDay = Date.UTC(2022, 11, 15);
    const lastDay = Date.UTC(2023, 0, 15);

    expect(result[0]).toEqual(firstDay);
    expect(result[1]).toEqual(lastDay);
  });

  test('should return the first day of Jan when day in Jan provided', () => {
    const date = new Date(Date.UTC(2023, 0, 5));
    const firstDayOfTheMonth = 1;
    const result = monthEncapsulingDates(firstDayOfTheMonth, date.getTime());

    const firstDay = Date.UTC(2023, 0, 1);
    const lastDay = Date.UTC(2023, 1, 1);

    expect(result[0]).toEqual(firstDay);
    expect(result[1]).toEqual(lastDay);
  });
});

describe('number of dayes between dates', () => {
  test('should return 3 for the right input', () => {
    const firstDate = new Date(2023, 0, 14, 10, 5);
    const secondDate = new Date(2023, 0, 17, 8, 43);
    const result = numberOfDaysBetweenDates(firstDate.getTime(), secondDate.getTime());

    expect(result).toBe(3);
  });
});

describe('number of working day on a month', () => {
  test('should return 23 for January 2023 counting from the 1st', () => {
    const date = new Date(2023, 0, 5);
    const firstDayOfTheMonth = 1;
    const result = numberOfWorkingDaysInMonth(date.getTime(), firstDayOfTheMonth);

    expect(result).toBe(23);
  });
});
