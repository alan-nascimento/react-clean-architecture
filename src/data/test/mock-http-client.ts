import { HttpResponse, HttpStatusCode } from '../protocols/http/http-response'
import { HttpPostClient, HttpPostParams } from '../protocols/http/http-post-client'

export class HttpPostClientSpy implements HttpPostClient {
  url?: string
  body?: object
  response: HttpResponse = {
    statusCode: HttpStatusCode.noContent
  }

  async post (params: HttpPostParams): Promise<HttpResponse> {
    this.url = params.url
    this.body = params.body

    return Promise.resolve(this.response)
  }
}
