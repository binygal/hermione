import { Record, Vacation } from '../../data/data.types';
import RecordExtensions from '../../data/RecordExtensions';
import { IRecordsRepository } from '../../data/RecordsRepository';
import { ISettingsRepository } from '../../settings/SettingsRepository';
import { IVacationsRepository } from '../../vacation-picker/VacationsRepository';
import {
  getTimeDiff, monthEncapsulingDates, numberOfWorkingDaysInMonth, TimeDiff,
} from '../extensions/date';

export interface IRecordsModel {
  createRecord(record: Record): Promise<void>;
  updateRecord(record: Record): Promise<void>;
  currentOnGoingRecord: Promise<Record | undefined>
  createOrSealRecord(): Promise<void>
  getCurrentMonthRecords(): Promise<Record[]>
  getAllRecords(): Promise<Record[]>
  getRecord(key: string): Promise<Record>
  deleteRecord(key: string): Promise<void>
  isCurrentlyRunning: Promise<boolean>
  getTotalRecordsTimeBetweenDates(startingDate: number, endingDate: number): Promise<TimeDiff>;
  expectedHoursPerMonth(): Promise<number>;
}

export default class RecordsModel implements IRecordsModel {
  private recordsRepository: IRecordsRepository;

  private settingsRepository: ISettingsRepository;

  private vacationsRepository: IVacationsRepository;

  constructor(
    recordsRepository: IRecordsRepository,
    settingsRepository: ISettingsRepository,
    vacationsRepository: IVacationsRepository,
  ) {
    this.recordsRepository = recordsRepository;
    this.settingsRepository = settingsRepository;
    this.vacationsRepository = vacationsRepository;
  }

  private async getCurrentMonthVacations(): Promise<Vacation[]> {
    const settings = await this.settingsRepository.get();
    const { firstDayOfMonth } = settings;
    const [startOfMonth, endOfMonth] = monthEncapsulingDates(firstDayOfMonth, Date.now());
    return this.vacationsRepository
      .getMany((v) => v.vacationDate >= startOfMonth && v.vacationDate < endOfMonth);
  }

  async expectedHoursPerMonth(): Promise<number> {
    const settings = await this.settingsRepository.get();
    const workingDays = numberOfWorkingDaysInMonth(Date.now(), settings.firstDayOfMonth);
    const vacations = await this.getCurrentMonthVacations();
    return (workingDays - vacations.length) * settings.numberOfHoursPerDay;
  }

  async getTotalRecordsTimeBetweenDates(
    startingDate: number,
    endingDate: number,
  ): Promise<TimeDiff> {
    const records = await this.recordsRepository
      .getAllRecords(
        (r) => (r.startTime < endingDate) && !!r.endTime && (r.endTime > startingDate),
      );

    const result = records
      .map((r) => {
        const startTime = Math.max(r.startTime, startingDate);
        const endTime = Math.min(r.endTime!, endingDate);
        return getTimeDiff(startTime, endTime);
      }).reduce((accu, timeDiff) => accu + timeDiff.minutes + (timeDiff.hours * 60), 0);
    return { hours: Math.floor(result / 60), minutes: result % 60 };
  }

  deleteRecord(key: string): Promise<void> {
    return this.recordsRepository.deleteRecord(key);
  }

  updateRecord(record: Record): Promise<void> {
    return this.recordsRepository.updateRecord(record);
  }

  getRecord(key: string): Promise<Record> {
    return this.recordsRepository.getByKey(key);
  }

  getAllRecords(): Promise<Record[]> {
    return this.recordsRepository.getAllRecords();
  }

  getCurrentMonthRecords(): Promise<Record[]> {
    const today = new Date();
    const firstOfTheMonth = new Date(today.getFullYear(), today.getMonth(), 1).getTime();
    return this.recordsRepository.getAllRecords(((r) => !r.endTime || r.endTime > firstOfTheMonth));
  }

  get isCurrentlyRunning(): Promise<boolean> {
    return this.currentOnGoingRecord.then((onGoingRecord) => onGoingRecord != null);
  }

  async createOrSealRecord(): Promise<void> {
    const currentRecord = await this.currentOnGoingRecord;
    if (currentRecord == null) {
      return this.createRecord(RecordExtensions.now());
    }
    const updatedRecord: Record = { ...currentRecord, endTime: Date.now() };
    return this.recordsRepository.updateRecord(updatedRecord);
  }

  createRecord(record: Record): Promise<void> {
    return this.recordsRepository.createRecord(record);
  }

  get currentOnGoingRecord() {
    return this.recordsRepository.getSingleRecord((r) => r.endTime == null);
  }
}
