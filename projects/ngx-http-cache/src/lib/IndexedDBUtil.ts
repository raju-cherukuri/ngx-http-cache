export const DATABASE_NAME = 'http-cache-db';

export class IndexedDBUtil<T> {
  private db: IDBDatabase | undefined;
  private objectStoreName: string = '';
  private keyPath: string = '';
  private version: number = 1;

  constructor() {
    this.version = Number(localStorage.getItem(DATABASE_NAME + '-version')) || this.version;
  }


  init(): Promise<void> {

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DATABASE_NAME, this.version);

      request.addEventListener('upgradeneeded', (ev) => {
        // @ts-ignore
        this.db = ev.target.result;
        if (!this.db?.objectStoreNames.contains(this.objectStoreName)) {
          this.db?.createObjectStore(this.objectStoreName, {keyPath: this.keyPath});
        }
      });

      request.addEventListener('success', (ev) => {
        // @ts-ignore
        this.db = ev.target.result;
        resolve();
      });

      request.addEventListener('error', (err) => {
        reject(err);
      });
    });
  }


  async setObjectStoreName(objectStoreName: string, keyPath: string, expiryTime: number): Promise<void> {
    this.objectStoreName = objectStoreName;
    this.keyPath = keyPath;

    const lastInitTime = Number(localStorage.getItem(DATABASE_NAME + '-init-time'));
    const currentTime = Date.now();
    if (lastInitTime && currentTime - lastInitTime > expiryTime) {
      indexedDB.deleteDatabase(DATABASE_NAME);
      localStorage.setItem(DATABASE_NAME + '-init-time', String(currentTime));
    }

    if (this.db) {
      this.db.close();
    }

    const request = indexedDB.open(DATABASE_NAME);
    let exists = false;
    request.onsuccess = (e) => {

      // @ts-ignore
      const db = e.target.result;
      exists = db.objectStoreNames.contains(this.objectStoreName);
      db.close();

      if (!exists) {
        this.version++;
        localStorage.setItem(DATABASE_NAME + '-version', String(this.version));
        this.init().then();
      }
    };
  }

  async getAll(): Promise<T[]> {
    await this.init();
    if (!this.db) {
      console.warn('Database not initialized getAll()');
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      // @ts-ignore
      if (!this.db?.objectStoreNames.contains(this.objectStoreName)) {
        this.db?.createObjectStore(this.objectStoreName, {keyPath: this.keyPath});
      }
      // @ts-ignore
      const transaction = this.db.transaction(this.objectStoreName, 'readonly');
      const store = transaction.objectStore(this.objectStoreName);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = (err) => {
        console.warn('Error occurred while getting all items', err);
        reject(err);
      };
    });
  }

  async addItem(item: T): Promise<void> {
    await this.init();
    if (!this.db) {
      console.warn('Database not initialized');
      return;
    }

    const transaction = this.db.transaction(this.objectStoreName, 'readwrite');
    const store = transaction.objectStore(this.objectStoreName);
    const request = store.add(item);

    request.onsuccess = () => {
      console.log('Successfully added an item');
    };
    request.onerror = (err) => {
      console.warn('Error occurred while adding an item', err);
    };
  }

  addItems(items: T[]): void {
    for (const item of items) {
      this.addItem(item);
    }
  }

  async getItem(id: number): Promise<void> {
    await this.init();
    if (!this.db) {
      console.warn('Database not initialized');
      return;
    }

    const transaction = this.db.transaction(this.objectStoreName, 'readonly');
    const store = transaction.objectStore(this.objectStoreName);
    const request = store.get(id);

    request.onsuccess = () => {
      console.log('Item:', request.result);
    };

    request.onerror = (err) => {
      console.warn('Error occurred while getting an item', err);
    };
  }

  async delete(id: number): Promise<void> {
    await this.init();
    if (!this.db) {
      console.warn('Database not initialized');
      return;
    }

    const transaction = this.db.transaction(this.objectStoreName, 'readwrite');
    const store = transaction.objectStore(this.objectStoreName);
    const request = store.delete(id);

    request.onsuccess = () => {
      console.log('Successfully deleted an item');
    };

    request.onerror = (err) => {
      console.warn('Error occurred while deleting an item', err);
    };
  }

  async update(item: T): Promise<void> {
    await this.init();
    if (!this.db) {
      console.warn('Database not initialized');
      return;
    }

    const transaction = this.db.transaction(this.objectStoreName, 'readwrite');
    const store = transaction.objectStore(this.objectStoreName);
    const request = store.put(item);

    request.onsuccess = () => {
      console.log('Successfully updated an item');
    };

    request.onerror = (err) => {
      console.warn('Error occurred while updating an item', err);
    };
  }
}
