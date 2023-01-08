/* eslint-disable @typescript-eslint/naming-convention */
type MigrationFunction = (db:IDBDatabase) => void;

export interface IDBMigrator {
  migrate(db: IDBDatabase, version: number): Promise<void>;
}

function initial_1(db: IDBDatabase): void {
  const store = db.createObjectStore('records', { keyPath: 'id' });
  store.createIndex('startTime', 'startTime', { unique: false });
}

export default class LocalDBMigrator implements IDBMigrator {
  async migrate(db: IDBDatabase, version: number): Promise<void> {
    const migrationData: (MigrationFunction | undefined)[] = [
      undefined,
      initial_1,
    ];
    for (let i = 1; i <= version; i += 1) {
      const migrationCode = migrationData[i];
      if (migrationCode != null) {
        migrationCode(db);
      }
    }
  }
}
