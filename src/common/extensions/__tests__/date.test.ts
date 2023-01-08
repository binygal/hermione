import { getTimeDiff } from '../date';

describe('getTimeDiff', () => {
  test('should return 3 hours and 5 minutes according to the input', () => {
    const first = new Date(2022, 1, 25, 12, 43);
    const second = new Date(2022, 1, 25, 15, 48);
    const timeDiff = getTimeDiff(first.getTime(), second.getTime());
    expect(timeDiff).toEqual({ hours: 3, minutes: 5 });
  });
});
