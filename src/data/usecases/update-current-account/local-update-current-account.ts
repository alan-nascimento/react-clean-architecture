import { SetStorage } from '@/data/protocols'
import { AccountModel } from '@/domain/models'
import { UnexpectedError } from '@/domain/errors'
import { UpdateCurrentAccount } from '@/domain/usecases'

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor (private readonly setStorage: SetStorage) {}

  save (account: AccountModel): void {
    if (!account?.accessToken) throw new UnexpectedError()

    this.setStorage.set('account', JSON.stringify(account))
  }
}
