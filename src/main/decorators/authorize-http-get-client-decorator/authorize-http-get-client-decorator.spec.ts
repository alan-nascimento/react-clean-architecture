import faker from 'faker'

import { HttpGetParams } from '@/data/protocols'
import { mockAccountModel } from '@/domain/test'
import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from '@/data/test'

import { AuthorizeHttpGetClientDecorator } from './authorize-http-get-client-decorator'

type SutTypes = {
  sut: AuthorizeHttpGetClientDecorator
  getStorageSpy: GetStorageSpy
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpGetClientSpy()

  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy, httpGetClientSpy)

  return {
    sut,
    getStorageSpy,
    httpGetClientSpy
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  it('should call GetStorage with correct value', async () => {
    const { sut, getStorageSpy } = makeSut()

    await sut.get(mockGetRequest())

    expect(getStorageSpy.key).toBe('account')
  })

  it('should not add headers if getStorage is invalid', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.words()
      }
    }

    await sut.get(httpRequest)

    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers)
  })

  it('should add headers to HttpGetClient', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut()

    getStorageSpy.value = mockAccountModel()

    const httpRequest: HttpGetParams = {
      url: faker.internet.url()
    }

    await sut.get(httpRequest)

    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  it('should merge headers to HttpGetClient', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = makeSut()
    const field = faker.random.words()

    getStorageSpy.value = mockAccountModel()

    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field
      }
    }

    await sut.get(httpRequest)

    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual({
      field,
      'x-access-token': getStorageSpy.value.accessToken
    })
  })

  it('should return the same result as HttpGetClient', async () => {
    const { sut, httpGetClientSpy } = makeSut()

    const httpResponse = await sut.get(mockGetRequest())

    expect(httpResponse).toEqual(httpGetClientSpy.response)
  })
})
