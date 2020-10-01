import { HttpClient } from '@/data/protocols/http'
import { makeAxiosHttpClient } from '@/main/factories/http'
import { makeLocalStorageAdapter } from '@/main/factories/cache'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'

export const makeAuthorizeHttpClientDecorator = (): HttpClient => {
  return new AuthorizeHttpClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}
