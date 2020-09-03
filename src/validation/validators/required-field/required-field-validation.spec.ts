import faker from 'faker'

import { RequiredFieldError } from '@/validation/errors'

import { RequiredFieldValidation } from './required-field-validation'

type SutTypes = {
  sut: RequiredFieldValidation
}

const makeSut = (): SutTypes => {
  const sut = new RequiredFieldValidation(faker.database.column())

  return {
    sut
  }
}

describe('RequiredFieldValidation', () => {
  it('should return an error if field is empty', () => {
    const { sut } = makeSut()
    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })

  it('should return falsy if field is not empty', () => {
    const { sut } = makeSut()
    const error = sut.validate(faker.random.words())

    expect(error).toBeFalsy()
  })
})
