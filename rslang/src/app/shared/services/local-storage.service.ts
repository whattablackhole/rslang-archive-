import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';

import { StorageChanges } from '../models/change-storage.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly storage: Storage;
  private prefix = 'rslang4_';
  changes$ = new Subject<StorageChanges>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Record<string, unknown> = {},
  ) {
    if (isPlatformBrowser(this.platformId) && this.isLocalStorageSupported) {
      this.storage = window.localStorage;
    }
  }

  get length(): number {
    return this.storage.length;
  }

  clear(): void {
    this.storage.clear();
  }

  getItem(key: string): string | null {
    return this.storage.getItem(this.prefix + key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    this.storage.removeItem(this.prefix + key);
    this.changes$.next({
      type: 'remove',
      key,
    });
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(this.prefix + key, value);
    this.changes$.next({
      type: 'set',
      key,
      value,
    });
  }

  get isLocalStorageSupported(): boolean {
    return !!this.storage;
  }
}
