import { DBStructure, SettingsObject } from '../data/data.types';
import { IDBConnector } from '../data/LocalDBConnector';

const SETTINGS_TABLE = 'settings';
const SETTINGS_DEFAULT_KEY = 'settings_default';

export interface ISettingsRepository {
  updateSettings(settings: SettingsObject): Promise<void>
  get(): Promise<SettingsObject>
}

export default class SettingsRepository implements ISettingsRepository {
  private dbConnector: IDBConnector<DBStructure>;

  constructor(dbConnector: IDBConnector<DBStructure>) {
    this.dbConnector = dbConnector;
  }

  get(): Promise<SettingsObject> {
    return this.dbConnector.getByKey(SETTINGS_TABLE, SETTINGS_DEFAULT_KEY);
  }

  updateSettings(settings: SettingsObject): Promise<void> {
    return this.dbConnector.update(SETTINGS_TABLE, settings);
  }
}
