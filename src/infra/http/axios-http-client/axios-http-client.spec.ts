import axios from 'axios'

import { mockHttpRequest } from '@/data/test'
import { AxiosHttpClient } from '@/infra/http'
import { mockAxios, mockHttpResponse } from '@/infra/test'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()

  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  it('should call axios with correct values', async () => {
    const request = mockHttpRequest()
    const { sut, mockedAxios } = makeSut()

    await sut.request(request)

    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      data: request.body,
      headers: request.headers,
      method: request.method
    })
  })

  it('should return correct response', async () => {
    const { sut, mockedAxios } = makeSut()
    const httpResponse = await sut.request(mockHttpRequest())
    const axiosResponse = await mockedAxios.request.mock.results[0].value

    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })

  it('should return correct error', () => {
    const { sut, mockedAxios } = makeSut()

    mockedAxios.request.mockRejectedValueOnce({
      response: mockHttpResponse()
    })

    const promise = sut.request(mockHttpRequest())

    expect(promise).toEqual(mockedAxios.request.mock.results[0].value)
  })
})
