import axios, { AxiosResponse } from 'axios'

import { HttpPostParams, HttpResponse, HttpPostClient } from '@/data/protocols'

export class AxiosHttpClient implements HttpPostClient {
  async post (params: HttpPostParams): Promise<HttpResponse> {
    let httpResponse: AxiosResponse

    try {
      httpResponse = await axios.post(params.url, params.body)
    } catch (err) {
      httpResponse = err.response
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}
