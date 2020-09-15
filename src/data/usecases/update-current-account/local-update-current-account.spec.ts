import { SetStorage } from '@/data/protocols'
import { SetStorageMock } from '@/data/test'

import { LocalUpdateCurrentAccount } from './local-update-current-account'
import { mockAccountModel } from '@/domain/test'

type SutTypes = {
  sut: LocalUpdateCurrentAccount
  setStorageMock: SetStorage
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalUpdateCurrentAccount(setStorageMock)

  return {
    sut,
    setStorageMock
  }
}

describe('LocalUpdateCurrentAccount', () => {
  it('should call SetStorage with correct value', () => {
    const { sut, setStorageMock } = makeSut()
    const account = mockAccountModel()

    sut.save(account)

    expect(setStorageMock.key).toBe('account')
    expect(setStorageMock.value).toEqual(JSON.stringify(account))
  })

  it('should throw if SetStorage throws', () => {
    const { sut, setStorageMock } = makeSut()

    jest.spyOn(setStorageMock, 'set').mockReturnValueOnce(undefined)

    const promise = sut.save(mockAccountModel())

    expect(promise).toBe(undefined)
  })
})
