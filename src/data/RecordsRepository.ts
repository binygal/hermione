import { DBStructure, Record } from './data.types';
import { IDBConnector } from './LocalDBConnector';

export interface IRecordsRepository {
  createRecord(record: Record): Promise<void>
  getSingleRecord(selector: (record: Record) => boolean): Promise<Record | undefined>
  updateRecord(record: Record): Promise<void>
}

const RECORDS_TABLE = 'records';

export default class RecordsRepository implements IRecordsRepository {
  private dbConnector: IDBConnector<DBStructure>;

  constructor(dbConnector: IDBConnector<DBStructure>) {
    this.dbConnector = dbConnector;
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
