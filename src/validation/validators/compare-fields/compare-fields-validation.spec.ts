import faker from 'faker'

import { InvalidFieldError } from '@/validation/errors'

import { CompareFieldsValidation } from './compare-fields-validation'

type SutTypes = {
  sut: CompareFieldsValidation
}

const makeSut = (valueToCompare: string): SutTypes => {
  const sut = new CompareFieldsValidation(faker.database.column(), valueToCompare)

  return {
    sut
  }
}

describe('CompareFieldsValidation', () => {
  it('should return an error if compare is invalid', () => {
    const { sut } = makeSut(faker.random.word())
    const error = sut.validate(faker.random.word())

    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return falsy if compare is valid', () => {
    const valueToCompare = faker.random.word()

    const { sut } = makeSut(valueToCompare)
    const error = sut.validate(valueToCompare)

    expect(error).toBeFalsy()
  })
})
