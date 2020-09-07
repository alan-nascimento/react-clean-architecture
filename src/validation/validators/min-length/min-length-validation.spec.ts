import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors'

import { MinLengthValidation } from './min-length-validation'

const makeSut = (): MinLengthValidation => {
  return new MinLengthValidation(faker.database.column(), 5)
}

describe('MinLengthValidation', () => {
  it('should return an error if values is invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(4))

    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return false if values is valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.alphaNumeric(5))

    expect(error).toBeFalsy()
  })
})
