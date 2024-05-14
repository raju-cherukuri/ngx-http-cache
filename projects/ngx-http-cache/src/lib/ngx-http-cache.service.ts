import { Injectable } from '@angular/core';
import { IndexedDBUtil } from './IndexedDBUtil';

@Injectable({
  providedIn: 'root'
})
export class NgxHttpCacheService<T> {
  private util = new IndexedDBUtil<T>();

  async setStore(objectStoreName: string, keyPath: string, expiryTime: number): Promise<void> {
    this.util.setObjectStoreName(objectStoreName, keyPath, expiryTime).then();
  }

  getAll(): Promise<T[]> {
    return this.util.getAll();
  }

  addItems(payload: T[]): void {
    this.util.addItems(payload);
  }

  addItem(item: T): void {
    this.util.addItem(item);
  }

  getItem(id: number): void {
    this.util.getItem(id);
  }

  delete(id: number): void {
    this.util.delete(id);
  }

  update(item: T): void {
    this.util.update(item);
  }
}
