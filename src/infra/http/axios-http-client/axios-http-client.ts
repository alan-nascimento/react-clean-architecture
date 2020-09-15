import axios, { AxiosResponse } from 'axios'

import { HttpPostParams, HttpResponse, HttpPostClient } from '@/data/protocols'

export class AxiosHttpClient implements HttpPostClient {
  async post (params: HttpPostParams): Promise<HttpResponse> {
    let response: AxiosResponse

    try {
      response = await axios.post(params.url, params.body)
    } catch (err) {
      response = err.response
    }

    return {
      statusCode: response.status,
      body: response.data
    }
  }
}
