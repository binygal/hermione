import { SettingsObject } from './data.types';

/* eslint-disable @typescript-eslint/naming-convention */
type MigrationFunction = (db:IDBDatabase) => Promise<void>;

export interface IDBMigrator {
  migrate(db: IDBDatabase, version: number): Promise<void>;
}

async function initial_1(db: IDBDatabase): Promise<void> {
  const store = db.createObjectStore('records', { keyPath: 'id' });
  store.createIndex('startTime', 'startTime', { unique: false });
  const settingsStore = db.createObjectStore('settings', { keyPath: 'id' });
  const initialSettings: SettingsObject = {
    firstDayOfMonth: 1,
    id: 'settings_default',
    numberOfHoursPerDay: 9,
  };
  settingsStore.add(initialSettings);
}

export default class LocalDBMigrator implements IDBMigrator {
  async migrate(db: IDBDatabase, version: number): Promise<void> {
    const migrationData: (MigrationFunction | undefined)[] = [
      undefined,
      initial_1,
    ];
    for (let i = db.version; i <= version; i += 1) {
      const migrationCode = migrationData[i];
      if (migrationCode != null) {
        migrationCode(db);
      }
    }
  }
}
