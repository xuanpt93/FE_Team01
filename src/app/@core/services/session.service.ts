import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
/**
 * Session storage service
 * Provides methods to get, set, remove, clear session storage items.
 */
export class SessionService {
  /**
   * set session storage item
   *
   * @param key
   * @param value
   */
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * get session storage item
   *
   * @param key
   */
  getItem(key: string): any {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  }

  /**
   * remove session storage item
   *
   * @param key
   */
  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * remove all session storage items
   */
  clear() {
    localStorage.clear();
  }

}
