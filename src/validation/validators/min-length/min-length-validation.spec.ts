import { InvalidFieldError } from '@/validation/errors'

import { MinLengthValidation } from './min-length-validation'

describe('MinLengthValidation', () => {
  it('should return an error if values is invalid', () => {
    const sut = new MinLengthValidation('field', 5)
    const error = sut.validate('123')

    expect(error).toEqual(new InvalidFieldError())
  })

  it('should return false if values is valid', () => {
    const sut = new MinLengthValidation('field', 5)
    const error = sut.validate('12345')

    expect(error).toBeFalsy()
  })
})
