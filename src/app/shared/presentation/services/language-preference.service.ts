import { Injectable } from '@angular/core';

const STORAGE_KEY = 'tc_lang';

@Injectable({ providedIn: 'root' })
export class LanguagePreferenceService {
  getStoredOrDefault(): string {
    return localStorage.getItem(STORAGE_KEY) ?? 'es';
  }

  persist(lang: string): void {
    localStorage.setItem(STORAGE_KEY, lang);
  }
}
