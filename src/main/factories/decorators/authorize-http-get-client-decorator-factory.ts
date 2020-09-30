import { HttpGetClient } from '@/data/protocols'
import { makeAxiosHttpClient } from '@/main/factories/http'
import { makeLocalStorageAdapter } from '@/main/factories/cache'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'

export const makeAuthorizeHttpGetClientDecorator = (): HttpGetClient => {
  return new AuthorizeHttpGetClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}
