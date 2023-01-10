import { Record } from '../data/data.types';
import RecordExtensions from '../data/RecordExtensions';
import { IRecordsRepository } from '../data/RecordsRepository';

export interface IRecordsModel {
  createRecord(record: Record): Promise<void>;
  currentOnGoingRecord: Promise<Record | undefined>
  createOrSealRecord(): Promise<void>
  getCurrentMonthRecords(): Promise<Record[]>
  getAllRecords(): Promise<Record[]>
  isCurrentlyRunning: Promise<boolean>
}

export default class RecordsModel implements IRecordsModel {
  private recordsRepository: IRecordsRepository;

  constructor(recordsRepository: IRecordsRepository) {
    this.recordsRepository = recordsRepository;
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
