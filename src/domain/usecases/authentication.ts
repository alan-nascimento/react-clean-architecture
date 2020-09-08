import { AccountModel } from '@/domain/models/account-model'

export type AuthenticationParams = {
  email: string
  password: string
}

export interface Authentication {
  [x: string]: any

  auth: (params: AuthenticationParams) => Promise<AccountModel>
}
