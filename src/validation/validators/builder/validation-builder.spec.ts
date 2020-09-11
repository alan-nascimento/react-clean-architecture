import faker from 'faker'

import { RequiredFieldValidation, EmailValidation, MinLengthValidation } from '@/validation/validators'

import { ValidationBuilder as sut } from './validation-builder'
import { CompareFieldsValidation } from '../compare-fields/compare-fields-validation'

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()

    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  it('should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().build()

    expect(validations).toEqual([new EmailValidation(field)])
  })

  it('should return MinLengthValidation', () => {
    const field = faker.database.column()
    const length = faker.random.number()
    const validations = sut.field(field).min(length).build()

    expect(validations).toEqual([new MinLengthValidation(field, length)])
  })

  it('should return CompareFieldsValidation', () => {
    const field = faker.database.column()
    const fieldToCompare = faker.database.column()

    const validations = sut.field(field).sameAs(fieldToCompare).build()

    expect(validations).toEqual([new CompareFieldsValidation(field, fieldToCompare)])
  })

  it('should return a list of validations', () => {
    const field = faker.database.column()
    const length = faker.random.number()
    const validations = sut.field(field).required().min(length).email().build()

    expect(validations).toEqual([
      new RequiredFieldValidation(field),
      new MinLengthValidation(field, length),
      new EmailValidation(field)
    ])
  })
})
