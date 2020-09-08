import faker from 'faker'

import { SetStorage } from '@/data/protocols'
import { SetStorageMock } from '@/data/test'

import { LocalSaveAccessToken } from './local-save-access-token'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorage
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)

  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  it('should call SetStorage with correct value', () => {
    const { sut, setStorageMock } = makeSut()
    const accessToken = faker.random.uuid()

    sut.save(accessToken)

    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })

  it('should throw if SetStorage throws', () => {
    const { sut, setStorageMock } = makeSut()

    jest.spyOn(setStorageMock, 'set').mockReturnValueOnce(undefined)

    const promise = sut.save(faker.random.uuid())

    expect(promise).toBe(undefined)
  })
})
