import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrowserStorageService {
  private storage: Storage | null;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.storage = isPlatformBrowser(this.platformId) ? localStorage : null;
  }
  getItem(key: string): string | null {
    return this.storage ? this.storage.getItem(key) : null;
  }
  setItem(key: string, value: string): void {
    if (this.storage) {
      this.storage.setItem(key, value);
    }
  }
  clear(): void {
    if (this.storage) {
      this.storage.clear();
    }
  }
}
