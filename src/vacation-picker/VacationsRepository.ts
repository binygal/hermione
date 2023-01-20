import { DBStructure, Vacation } from '../data/data.types';
import { IDBConnector } from '../data/LocalDBConnector';

export interface IVacationsRepository {
  add(vacation: Vacation): Promise<void>;
  remove(id: string): Promise<void>;
  getAll(): Promise<Vacation[]>
  getMany(filter: (vacation:Vacation) => boolean): Promise<Vacation[]>;
}

const VACATIONS_TABLE_NAME = 'vacations';

export default class VacationsRepository implements IVacationsRepository {
  private dbConnector: IDBConnector<DBStructure>;

  constructor(dbConnector: IDBConnector<DBStructure>) {
    this.dbConnector = dbConnector;
  }

  getMany(filter: (vacation: Vacation) => boolean): Promise<Vacation[]> {
    return this.dbConnector.getMany(VACATIONS_TABLE_NAME, filter);
  }

  getAll(): Promise<Vacation[]> {
    return this.dbConnector.getMany(VACATIONS_TABLE_NAME, () => true);
  }

  add(vacation: Vacation): Promise<void> {
    return this.dbConnector.create(VACATIONS_TABLE_NAME, vacation);
  }

  remove(id: string): Promise<void> {
    return this.dbConnector.delete(VACATIONS_TABLE_NAME, id);
  }
}
