export type Record = {
  id: string;
  startTime: number;
  endTime?: number;
};

export type SettingsObject = {
  id: string;
  firstDayOfMonth: number;
  numberOfHoursPerDay: number
};

export type Vacation = {
  id: string;
  vacationDate: number;
};

export type DBStructure = {
  records: Record;
  settings: SettingsObject;
  vacations: Vacation;
};
