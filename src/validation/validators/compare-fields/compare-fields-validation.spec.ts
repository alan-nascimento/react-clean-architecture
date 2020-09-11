import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors'

import { CompareFieldsValidation } from './compare-fields-validation'

type SutTypes = {
  sut: CompareFieldsValidation
}

const makeSut = (field: string, fieldToCompare: string): SutTypes => {
  const sut = new CompareFieldsValidation(field, fieldToCompare)

  return {
    sut
  }
}

describe('CompareFieldsValidation', () => {
  it('should return an error if compare is invalid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()

    const { sut } = makeSut(field, faker.random.word())
    const error = sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word()
    })

    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if compare is valid', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()
    const value = faker.random.word()

    const { sut } = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })

    expect(error).toBeFalsy()
  })
})
