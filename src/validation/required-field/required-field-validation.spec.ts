import { RequiredFieldError } from '@/validation/errors'

import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredFieldValidation', () => {
  it('should return an error if field is empty', () => {
    const sut = new RequiredFieldValidation('email')
    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })
})
