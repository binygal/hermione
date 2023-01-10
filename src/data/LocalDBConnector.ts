import { IDBProvider } from './LocalDBProvider';

export interface IDBConnector<T extends Record<string, any>> {
  create<V extends keyof T>(table: V, data: T[V]): Promise<void>;
  get<V extends keyof T>(
    table: V,
    selector: (item: T[V]) => boolean,
  ): Promise<T[V] | undefined>;
  getMany<V extends keyof T>(
    table: V,
    selector: (item:T[V]) => boolean,
  ): Promise<T[V][]>;
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
    const cursor = await this.openCursor(table);
    const result = await this.filterWithCursor<V>(cursor, selector, { single: true });
    return result[0];
  }

  private filterWithCursor<V extends keyof T>(
    cursor: IDBRequest<IDBCursorWithValue | null>,
    selector: (item: T[V]) => boolean,
    options: { single: boolean } = { single: false },
  ): PromiseLike<T[V][]> {
    return new Promise((resolve, reject) => {
      const result: T[V][] = [];
      const onSuccessCallback = () => {
        const currentItem = cursor.result?.value;
        if (cursor.result?.value == null) {
          resolve(result);
          return;
        }

        if (selector(currentItem)) {
          result.push(currentItem);
          if (options.single) {
            cursor.removeEventListener('success', onSuccessCallback);
            resolve(result);
            return;
          }
        }

        cursor.result?.continue();
      };

      cursor.addEventListener('success', onSuccessCallback);
      cursor.addEventListener('error', (e) => {
        reject(e);
      });
    });
  }

  private async openCursor(table: string | number | symbol) {
    const tableName = table.toString();
    const db = await this.connector.getDB();
    const transaction = db.transaction(tableName, 'readonly');
    const objectStore = transaction.objectStore(tableName);
    const cursor = objectStore.openCursor(undefined, 'prev');
    return cursor;
  }

  async getMany<V extends keyof T>(table: V, selector: (item: T[V]) => boolean): Promise<T[V][]> {
    const cursor = await this.openCursor(table);
    return this.filterWithCursor(cursor, selector);
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
