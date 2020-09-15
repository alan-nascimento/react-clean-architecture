import faker from 'faker'

import { HttpPostParams, HttpPostClient, HttpResponse, HttpStatusCode, HttpGetClient, HttpGetParams } from '@/data/protocols'

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})

export const mockGetRequest = (): HttpPostParams => ({
  url: faker.internet.url()
})

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string
  body?: any
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.body

    return Promise.resolve(this.response)
  }
}

export class HttpGetClientSpy<R> implements HttpGetClient<R> {
  url: string
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async get (params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url

    return Promise.resolve(this.response)
  }
}
