import { SetStorage, GetStorage } from '@/data/protocols'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  get (key: string): any {
    return JSON.parse(localStorage.getItem(key))
  }

  set (key: string, value: object): void {
    return value ? localStorage.setItem(key, JSON.stringify(value)) : localStorage.removeItem(key)
  }
}
