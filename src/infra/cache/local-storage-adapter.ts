import { SetStorage } from '@/data/protocols'

export class LocalStorageAdapter implements SetStorage {
  key: string;
  value: any;

  set (key: string, value: string): void {
    localStorage.setItem(key, value)
  }
}
