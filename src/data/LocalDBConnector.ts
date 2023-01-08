import { IDBProvider } from './LocalDBProvider';

export interface IDBConnector<T extends Record<string, any>> {
  create<V extends keyof T>(table: V, data: T[V]): Promise<void>;
  get<V extends keyof T>(
    table: V,
    selector: (item: T[V]) => boolean,
  ): Promise<T[V] | undefined>;
  update<V extends keyof T>(table: V, data: T[V]): Promise<void>;
}

function promisifyRequest(request: IDBRequest): Promise<void> {
  return new Promise((resolve, reject) => {
    request.addEventListener('success', () => {
      resolve();
    }, { once: true });
    request.addEventListener('error', (e) => {
      reject(e);
    }, { once: true });
  });
}

export default class LocalDBConnector<T extends Record<string, any>> implements IDBConnector<T> {
  private connector:IDBProvider;

  constructor(connector: IDBProvider) {
    this.connector = connector;
  }

  async create<V extends keyof T>(table: V, data: T[V]): Promise<void> {
    const tableName = table.toString();
    const db = await this.connector.getDB();
    const transaction = db.transaction(tableName, 'readwrite');
    const objectStore = transaction.objectStore(tableName);
    const request = objectStore.add(data);
    return promisifyRequest(request);
  }

  async get<V extends keyof T>(
    table: V,
    selector: (item: T[V]) => boolean,
  ): Promise<T[V] | undefined> {
    const tableName = table.toString();
    const db = await this.connector.getDB();
    const transaction = db.transaction(tableName, 'readonly');
    const objectStore = transaction.objectStore(tableName);
    const cursor = objectStore.openCursor(undefined, 'prev');
    return new Promise((resolve, reject) => {
      const onSuccessCallback = () => {
        const currentItem = cursor.result?.value;
        if (cursor.result?.value == null) {
          resolve(undefined);
          return;
        }

        if (selector(currentItem)) {
          resolve(currentItem);
          cursor.removeEventListener('success', onSuccessCallback);
          return;
        }

        cursor.result?.continue();
      };

      cursor.addEventListener('success', onSuccessCallback);
      cursor.addEventListener('error', (e) => {
        reject(e);
      });
    });
  }

  async update<V extends keyof T>(table: V, data: T[V]): Promise<void> {
    const tableName = table.toString();
    const db = await this.connector.getDB();
    const transaction = db.transaction(tableName, 'readwrite');
    const objectStore = transaction.objectStore(tableName);
    const request = objectStore.put(data);
    return promisifyRequest(request);
  }
}
