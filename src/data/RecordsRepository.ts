import { DBStructure, Record } from './data.types';
import { IDBConnector } from './LocalDBConnector';

export interface IRecordsRepository {
  createRecord(record: Record): Promise<void>
  getSingleRecord(selector: (record: Record) => boolean): Promise<Record | undefined>
  getAllRecords(filter?: (record: Record) => boolean): Promise<Record[]>
  updateRecord(record: Record): Promise<void>
  getByKey(key: string): Promise<Record>;
  deleteRecord(key: string): Promise<void>;
}

const RECORDS_TABLE = 'records';

export default class RecordsRepository implements IRecordsRepository {
  private dbConnector: IDBConnector<DBStructure>;

  constructor(dbConnector: IDBConnector<DBStructure>) {
    this.dbConnector = dbConnector;
  }

  deleteRecord(key: string): Promise<void> {
    return this.dbConnector.delete(RECORDS_TABLE, key);
  }

  getByKey(key: string): Promise<Record> {
    return this.dbConnector.getByKey(RECORDS_TABLE, key);
  }

  getAllRecords(filter?: (record: Record) => boolean): Promise<Record[]> {
    return this.dbConnector.getMany(RECORDS_TABLE, filter ?? (() => true));
  }

  getSingleRecord(selector: (record: Record) => boolean): Promise<Record | undefined> {
    return this.dbConnector.get(RECORDS_TABLE, selector);
  }

  async createRecord(record: Record): Promise<void> {
    await this.dbConnector.create(RECORDS_TABLE, record);
  }

  async updateRecord(record: Record): Promise<void> {
    await this.dbConnector.update(RECORDS_TABLE, record);
  }
}
