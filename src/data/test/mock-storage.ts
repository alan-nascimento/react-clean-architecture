import { SetStorage } from '@/data/protocols'

export class SetStorageSpy implements SetStorage {
  key: string
  value: any

  set (key: string, value: any): void {
    this.key = key
    this.value = value
  }
}
