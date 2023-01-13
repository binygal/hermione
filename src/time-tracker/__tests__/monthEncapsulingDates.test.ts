import monthEncapsulingDates from '../monthEncapsulingDates';

test('should return the first day of the month when getting 1', () => {
  const mockToday = new Date(2022, 11, 5).getTime();
  const result = monthEncapsulingDates(1, mockToday);

  const firstDay = new Date(2022, 11, 1).getTime();
  const lastDay = new Date(2023, 0, 1).getTime();

  expect(result[0]).toEqual(firstDay);
  expect(result[1]).toEqual(lastDay);
});

test('should return the last month when first day of the month is later', () => {
  const mockToday = new Date(2022, 11, 5).getTime();
  const result = monthEncapsulingDates(15, mockToday);

  const firstDay = new Date(2022, 10, 15).getTime();
  const lastDay = new Date(2022, 11, 15).getTime();

  expect(result[0]).toEqual(firstDay);
  expect(result[1]).toEqual(lastDay);
});

test('should return the last month when first day of the month is before', () => {
  const mockToday = new Date(2022, 11, 20).getTime();
  const result = monthEncapsulingDates(15, mockToday);

  const firstDay = new Date(2022, 11, 15).getTime();
  const lastDay = new Date(2023, 0, 15).getTime();

  expect(result[0]).toEqual(firstDay);
  expect(result[1]).toEqual(lastDay);
});
