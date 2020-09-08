import { SetStorage } from '@/data/protocols'
import { SaveAccessToken } from '@/domain/usecases'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor (private readonly setStorage: SetStorage) {}

  save (accessToken: string): void {
    this.setStorage.set('accessToken', accessToken)
  }
}
