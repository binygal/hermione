export type Record = {
  id: string;
  startTime: number;
  endTime?: number;
};

export type DBStructure = {
  records: Record
};
