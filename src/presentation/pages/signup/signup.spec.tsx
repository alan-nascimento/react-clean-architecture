import React from 'react'
import faker from 'faker'
import { render, RenderResult, cleanup } from '@testing-library/react'

import { Helper, ValidationStub } from '@/presentation/test'

import SignUp from './signup'

type SutParams = {
  validationError: string
}

type SutTypes = {
  sut: RenderResult
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()

  validationStub.errorMessage = params?.validationError

  const sut = render(
    <SignUp
      validation={validationStub}
    />
  )

  return {
    sut
  }
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
    Helper.testButtonIsDisabled(sut, 'submit-button', true)
  })

  it('should show email error if validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })

  it('should show email error if validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  it('should show password error if validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('should show password error if validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
