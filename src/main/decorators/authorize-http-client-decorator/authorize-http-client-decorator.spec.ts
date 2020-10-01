import faker from 'faker'

import { HttpRequest } from '@/data/protocols/http'
import { mockAccountModel } from '@/domain/test'
import { mockHttpRequest, GetStorageSpy, HttpClientSpy } from '@/data/test'

import { AuthorizeHttpClientDecorator } from './authorize-http-client-decorator'

type SutTypes = {
  sut: AuthorizeHttpClientDecorator
  getStorageSpy: GetStorageSpy
  httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpClientSpy = new HttpClientSpy()
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy)

  return {
    sut,
    getStorageSpy,
    httpClientSpy
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  it('should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()

    await sut.request(mockHttpRequest())

    expect(getStorageSpy.key).toBe('account')
  })

  it('should not add headers if GetStorage is invalid', async () => {
    const { sut, httpClientSpy } = makeSut()

    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
      headers: {
        field: faker.random.words()
      }
    }

    await sut.request(httpRequest)

    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.method).toBe(httpRequest.method)
    expect(httpClientSpy.headers).toEqual(httpRequest.headers)
  })

  it('should add headers to HttpClient', async () => {
    const { sut, getStorageSpy, httpClientSpy } = makeSut()

    getStorageSpy.value = mockAccountModel()

    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete'])
    }

    await sut.request(httpRequest)
    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.method).toBe(httpRequest.method)
    expect(httpClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  it('should merge headers to HttpClient', async () => {
    const { sut, getStorageSpy, httpClientSpy } = makeSut()

    getStorageSpy.value = mockAccountModel()

    const field = faker.random.words()
    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'post', 'put', 'delete']),
      headers: {
        field
      }
    }

    await sut.request(httpRequest)

    expect(httpClientSpy.url).toBe(httpRequest.url)
    expect(httpClientSpy.method).toBe(httpRequest.method)
    expect(httpClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  it('should return the same result as HttpClient', async () => {
    const { sut, httpClientSpy } = makeSut()
    const httpResponse = await sut.request(mockHttpRequest())

    expect(httpResponse).toEqual(httpClientSpy.response)
  })
})
