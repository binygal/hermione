import { SettingsObject } from './data.types';

type MigrationFunction = (db:IDBDatabase) => Promise<void>;

export interface IDBMigrator {
  migrate(db: IDBDatabase, version: number, oldVersion: number): Promise<void>;
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

async function vacations_2(db: IDBDatabase): Promise<void> {
  const store = db.createObjectStore('vacations', { keyPath: 'id' });
  store.createIndex('vacationDate', 'vacationDate', { unique: false });
}

export default class LocalDBMigrator implements IDBMigrator {
  async migrate(db: IDBDatabase, version: number, oldVersion: number): Promise<void> {
    const migrationData: (MigrationFunction | undefined)[] = [
      undefined,
      initial_1,
      vacations_2,
    ];
    for (let i = oldVersion; i <= version; i += 1) {
      const migrationCode = migrationData[i];
      if (migrationCode != null) {
        migrationCode(db);
      }
    }
  }
}
