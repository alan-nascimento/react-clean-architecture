import { AccountModel } from '@/domain/models'

export interface UpdateCurrentAccount {
  save: (account: AccountModel) => void
}
