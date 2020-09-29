import faker from 'faker'

import { GetStorage } from '@/data/protocols'

export class GetStorageSpy implements GetStorage {
  key: string
  value = faker.random.objectElement()

  get (key: string): any {
    this.key = key
    return this.value
  }
}
