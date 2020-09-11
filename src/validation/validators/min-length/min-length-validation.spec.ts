import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors'

import { MinLengthValidation } from './min-length-validation'

const makeSut = (field: string): MinLengthValidation => {
  return new MinLengthValidation(field, 5)
}

describe('MinLengthValidation', () => {
  it('should return an error if values is invalid', () => {
    const field = faker.database.column()

    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(4) })

    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return false if values is valid', () => {
    const field = faker.database.column()

    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })

    expect(error).toBeFalsy()
  })

  it('should return false if field does not exists in schema', () => {
    const sut = makeSut(faker.database.column())
    const error = sut.validate({ [faker.database.column()]: faker.random.alphaNumeric(5) })

    expect(error).toBeFalsy()
  })
})
