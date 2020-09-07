import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors'

import { EmailValidation } from './email-validator'

type SutTypes = {
  sut: EmailValidation
}

const makeSut = (): SutTypes => {
  const sut = new EmailValidation(faker.random.words())

  return {
    sut
  }
}

describe('EmailValidation', () => {
  it('should return an error if email is invalid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.random.words())

    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return an error if email is valid', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.internet.email())

    expect(error).toBeFalsy()
  })

  it('should return falsy if email is empty', () => {
    const { sut } = makeSut()
    const error = sut.validate('')

    expect(error).toBeFalsy()
  })
})
