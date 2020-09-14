import { AccountModel } from '@/domain/models/account-model'
import { HttpStatusCode, HttpPostClient } from '@/data/protocols'
import { AuthenticationParams, Authentication } from '@/domain/usecases/authentication'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AccountModel>
  ) {}

  async auth (params: AuthenticationParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
