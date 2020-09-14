import { HttpResponse } from './http-response'

export type HttpPostParams = {
  url: string
  body?: any
}

export interface HttpPostClient<R = any> {
  post: (params: HttpPostParams) => Promise<HttpResponse<R>>
}
