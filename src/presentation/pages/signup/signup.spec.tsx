import React from 'react'
import faker from 'faker'
import { render, RenderResult, cleanup, fireEvent } from '@testing-library/react'

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

const populateField = (sut: RenderResult, testId: string, value = faker.random.word()): void => {
  const input = sut.getByTestId(`${testId}-input`)
  fireEvent.input(input, { target: { value } })
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', 'Required field')
    Helper.testStatusForField(sut, 'password', 'Required field')
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Required field')
    Helper.testButtonIsDisabled(sut, 'submit-button', true)
  })

  it('should show email error if validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name', validationError)
  })
})
