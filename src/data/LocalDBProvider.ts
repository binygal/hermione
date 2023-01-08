import LocalDBMigrator from './LocalDBMigrator';

export interface IDBProvider {
  getDB(): Promise<IDBDatabase>
}

const DB_NAME = 'HERMONINI_TIME_TRACKER_DB';
const LATEST_DB_VERSION = 1;

export default class LocalDBProvider implements IDBProvider {
  private db?: IDBDatabase;

  private dbState: 'not-initialized' | 'ready' | 'faulted' = 'not-initialized';

  constructor() {
    this.clearAllFaultListeners = this.clearAllFaultListeners.bind(this);
    this.setFaultedState = this.setFaultedState.bind(this);
    this.getDB = this.getDB.bind(this);
  }

  private setFaultedState() {
    this.dbState = 'faulted';
    this.clearAllFaultListeners();
  }

  private clearAllFaultListeners() {
    this.db?.removeEventListener('abort', this.setFaultedState);
    this.db?.removeEventListener('error', this.setFaultedState);
    this.db?.removeEventListener('close', this.setFaultedState);
  }

  async getDB(): Promise<IDBDatabase> {
    if (this.db != null && this.dbState === 'ready') {
      return this.db;
    }
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(DB_NAME, LATEST_DB_VERSION);
      request.addEventListener('success', (e) => {
        if (e.target instanceof IDBOpenDBRequest) {
          this.db = e.target.result;
          this.db.addEventListener('abort', this.setFaultedState, { once: true });
          this.db.addEventListener('close', this.setFaultedState, { once: true });
          this.db.addEventListener('error', this.setFaultedState, { once: true });
          this.dbState = 'ready';
          resolve(this.db);
        } else {
          reject();
        }
      }, { once: true });
      request.addEventListener('error', () => {
        this.dbState = 'faulted';
      }, { once: true });
      request.addEventListener('upgradeneeded', (e) => {
        if (e.target instanceof IDBOpenDBRequest) {
          const migrationManager = new LocalDBMigrator();
          migrationManager.migrate(e.target.result, LATEST_DB_VERSION);
        }
      });
    });
  }
}
