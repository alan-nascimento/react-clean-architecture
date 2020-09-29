import axios, { AxiosResponse } from 'axios'

import { HttpPostParams, HttpResponse, HttpPostClient, HttpGetParams } from '@/data/protocols'

export class AxiosHttpClient implements HttpPostClient {
  async post (params: HttpPostParams): Promise<HttpResponse> {
    let response: AxiosResponse

    try {
      response = await axios.post(params.url, params.body)
    } catch (err) {
      response = err.response
    }

    return this.adapt(response)
  }

  async get (params: HttpGetParams): Promise<HttpResponse> {
    let response: AxiosResponse

    try {
      response = await axios.get(params.url, { headers: params.headers })
    } catch (err) {
      response = err.response
    }

    return this.adapt(response)
  }

  private adapt (response: AxiosResponse): HttpResponse {
    return {
      statusCode: response.status,
      body: response.data
    }
  }
}
