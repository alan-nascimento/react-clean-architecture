import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { AddAccountParams, AddAccount } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params: AddAccountParams
  callsCount = 0

  async add (params: AddAccountParams): Promise<AccountModel> {
    this.params = params
    this.callsCount++

    return Promise.resolve(this.account)
  }
}
