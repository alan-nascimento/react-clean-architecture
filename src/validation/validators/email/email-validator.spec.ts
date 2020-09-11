import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors'

import { EmailValidation } from './email-validator'

type SutTypes = {
  sut: EmailValidation
}

const makeSut = (field: string): SutTypes => {
  const sut = new EmailValidation(field)

  return {
    sut
  }
}

describe('EmailValidation', () => {
  it('should return an error if email is invalid', () => {
    const field = faker.database.column()

    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: faker.random.words() })

    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return an error if email is valid', () => {
    const field = faker.database.column()

    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: faker.internet.email() })

    expect(error).toBeFalsy()
  })

  it('should return falsy if email is empty', () => {
    const field = faker.database.column()

    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: '' })

    expect(error).toBeFalsy()
  })
})
