import { v4 } from 'uuid';
import { IRecordsRepository } from '../../data/RecordsRepository';
import { MockedInterface } from '../../test/TestingTypes';
import RecordsModel, { IRecordsModel } from '../RecordsModel';

describe('Records Model', () => {
  let repository: MockedInterface<IRecordsRepository>;
  let recordsModel: IRecordsModel;

  beforeEach(() => {
    repository = {
      createRecord: jest.fn(),
      deleteRecord: jest.fn(),
      getAllRecords: jest.fn(),
      getByKey: jest.fn(),
      getSingleRecord: jest.fn(),
      updateRecord: jest.fn(),
    };
    recordsModel = new RecordsModel(repository);
  });

  describe('getTotalTimeBetweenDates', () => {
    test('should return the right time according to 2 records', async () => {
      const firstRecordStartDate = (new Date(2022, 9, 5, 10, 0)).getTime();
      const firstRecordEndDate = (new Date(2022, 9, 5, 10, 55)).getTime();
      const secondRecordStartDate = (new Date(2022, 9, 10, 3, 15)).getTime();
      const secondRecordEndDate = (new Date(2022, 9, 10, 4, 23)).getTime();
      repository.getAllRecords.mockResolvedValue([
        { id: v4(), startTime: firstRecordStartDate, endTime: firstRecordEndDate },
        { id: v4(), startTime: secondRecordStartDate, endTime: secondRecordEndDate },
      ]);

      const startDate = (new Date(2022, 9, 1)).getTime();
      const endDate = (new Date(2022, 10, 1)).getTime();
      const timeDiff = await recordsModel.getTotalTimeBetweenDates(startDate, endDate);

      expect(timeDiff).toEqual({ hours: 2, minutes: 3 });
    });

    test.only('should return the right time according to 2 records when starts before start time', async () => {
      const firstRecordStartDate = (new Date(2022, 7, 31, 23, 55)).getTime();
      const firstRecordEndDate = (new Date(2022, 8, 1, 0, 55)).getTime();
      repository.getAllRecords.mockResolvedValue([
        { id: v4(), startTime: firstRecordStartDate, endTime: firstRecordEndDate },
      ]);

      const startDate = (new Date(2022, 8, 1)).getTime();
      const endDate = (new Date(2022, 9, 1)).getTime();
      const timeDiff = await recordsModel.getTotalTimeBetweenDates(startDate, endDate);

      expect(timeDiff).toEqual({ hours: 0, minutes: 55 });
    });
  });
});
