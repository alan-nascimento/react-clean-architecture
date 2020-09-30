import 'jest-localstorage-mock'

import faker from 'faker'

import { AccountModel } from '@/domain/models'

import { LocalStorageAdapter } from './local-storage-adapter'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeAll(() => {
    localStorage.clear()
  })

  it('should call localStorage.setItem with correct values', () => {
    const sut = makeSut()

    const key = faker.database.column()
    const value = faker.random.objectElement<AccountModel>()

    sut.set(key, value)

    expect(localStorage.setItem).toHaveBeenCalledWith(key, JSON.stringify(value))
  })

  it('should call localStorage.removeItem if value is null', () => {
    const sut = makeSut()
    const key = faker.database.column()

    sut.set(key, undefined)

    expect(localStorage.removeItem).toHaveBeenCalledWith(key)
  })

  it('should call localStorage.getItem with correct value', () => {
    const sut = makeSut()

    const key = faker.database.column()
    const value = faker.random.objectElement<AccountModel>()

    const getItemSpy = jest.spyOn(localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(value))

    const obj = sut.get(key)

    expect(obj).toEqual(value)
    expect(getItemSpy).toHaveBeenCalledWith(key)
  })
})
