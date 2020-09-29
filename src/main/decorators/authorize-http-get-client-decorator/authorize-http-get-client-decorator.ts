import { AccountModel } from '@/domain/models'
import { GetStorage, HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols'

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor (
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async get (params: HttpGetParams): Promise<HttpResponse> {
    const account: AccountModel = this.getStorage.get('account')

    if (account?.accessToken) {
      Object.assign(params, {
        headers: Object.assign(params.headers || {}, {
          'x-access-token': account.accessToken
        })
      })
    }

    const httpResponse = await this.httpGetClient.get(params)

    return httpResponse
  }
}
