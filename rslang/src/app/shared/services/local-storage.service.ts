import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject } from 'rxjs';

import { AbstractStorageService } from './abstract-storage.service';
import { ChangesStorage } from '../models/change-storage.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService extends AbstractStorageService {
  private readonly storage: Storage;
  changes$ = new Subject<ChangesStorage>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Record<string, unknown> = {},
  ) {
    super();
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
    return this.storage.getItem(key);
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
    this.changes$.next({
      type: 'remove',
      key,
    });
  }

  setItem(key: string, value: string): void {
    this.storage.setItem(key, value);
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
