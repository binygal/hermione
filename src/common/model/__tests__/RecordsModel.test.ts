import { v4 } from 'uuid';
import { IRecordsRepository } from '../../../data/RecordsRepository';
import { ISettingsRepository } from '../../../settings/SettingsRepository';
import { IVacationsRepository } from '../../../vacation-picker/VacationsRepository';
import RecordsModel, { IRecordsModel } from '../RecordsModel';

describe('Records Model', () => {
  let repository: jest.Mocked<IRecordsRepository>;
  let settingsRepository: jest.Mocked<ISettingsRepository>;
  let vacationsRepository: jest.Mocked<IVacationsRepository>;
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
    settingsRepository = {
      get: jest.fn(),
      updateSettings: jest.fn(),
    };
    vacationsRepository = {
      getAll: jest.fn(),
      add: jest.fn(),
      getMany: jest.fn(),
      remove: jest.fn(),
    };
    recordsModel = new RecordsModel(repository, settingsRepository, vacationsRepository);
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
      const timeDiff = await recordsModel.getTotalRecordsTimeBetweenDates(startDate, endDate);

      expect(timeDiff).toEqual({ hours: 2, minutes: 3 });
    });

    test('should return the right time according to 2 records when starts before start time', async () => {
      const firstRecordStartDate = (new Date(2022, 7, 31, 23, 55)).getTime();
      const firstRecordEndDate = (new Date(2022, 8, 1, 0, 55)).getTime();
      repository.getAllRecords.mockResolvedValue([
        { id: v4(), startTime: firstRecordStartDate, endTime: firstRecordEndDate },
      ]);

      const startDate = (new Date(2022, 8, 1)).getTime();
      const endDate = (new Date(2022, 9, 1)).getTime();
      const timeDiff = await recordsModel.getTotalRecordsTimeBetweenDates(startDate, endDate);

      expect(timeDiff).toEqual({ hours: 0, minutes: 55 });
    });
  });
});
