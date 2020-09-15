import axios from 'axios'

import { mockAxios, mockHttpResponse } from '@/infra/test'
import { mockPostRequest } from '@/data/test'

import { AxiosHttpClient } from './axios-http-client'

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
  describe('post', () => {
    it('should call axios.post with correct values', async () => {
      const { sut, mockedAxios } = makeSut()
      const request = mockPostRequest()

      await sut.post(request)

      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    it('should return correct response on axios.post', () => {
      const { sut, mockedAxios } = makeSut()

      const promise = sut.post(mockPostRequest())

      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })

    it('should return the correct error on axios.post', () => {
      const { sut, mockedAxios } = makeSut()

      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })

      const promise = sut.post(mockPostRequest())

      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })
})
