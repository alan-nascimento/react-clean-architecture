import faker from 'faker'

import { RequiredFieldError } from '@/validation/errors'

import { RequiredFieldValidation } from './required-field-validation'

type SutTypes = {
  sut: RequiredFieldValidation
}

const makeSut = (field: string): SutTypes => {
  const sut = new RequiredFieldValidation(field)

  return {
    sut
  }
}

describe('RequiredFieldValidation', () => {
  it('should return an error if field is empty', () => {
    const field = faker.database.column()

    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: '' })

    expect(error).toEqual(new RequiredFieldError())
  })

  it('should return falsy if field is not empty', () => {
    const field = faker.database.column()

    const { sut } = makeSut(field)
    const error = sut.validate({ [field]: faker.random.word() })

    expect(error).toBeFalsy()
  })
})
