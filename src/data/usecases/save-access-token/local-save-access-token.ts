import { SetStorage } from '@/data/protocols'
import { UnexpectedError } from '@/domain/errors'
import { SaveAccessToken } from '@/domain/usecases'

export class LocalSaveAccessToken implements SaveAccessToken {
  constructor (private readonly setStorage: SetStorage) {}

  save (accessToken: string): void {
    if (!accessToken) throw new UnexpectedError()

    this.setStorage.set('accessToken', accessToken)
  }
}
