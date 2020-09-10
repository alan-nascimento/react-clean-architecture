import React from 'react'
import { render, RenderResult } from '@testing-library/react'

import SignUp from './signup'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(
    <SignUp />
  )

  return {
    sut
  }
}

const testStatusForField = (sut: RenderResult, testId: string, validationError?: string): void => {
  const status = sut.getByTestId(`${testId}-status`)

  expect(status.title).toBe(validationError || 'Ok')
  expect(status.textContent).toBe(validationError ? '🔴' : '🟢')
}

const testChildCount = (sut: RenderResult, testId: string, count: number): void => {
  const element = sut.getByTestId(testId)
  expect(element.childElementCount).toBe(count)
}

const testButtonIsDisabled = (sut: RenderResult, testId: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(testId) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

describe('SignUp Component', () => {
  it('should start with initial state', () => {
    const { sut } = makeSut()
    const validationError = 'Required field'

    testChildCount(sut, 'error-wrap', 0)
    testStatusForField(sut, 'name', validationError)
    testStatusForField(sut, 'email', validationError)
    testStatusForField(sut, 'password', validationError)
    testStatusForField(sut, 'passwordConfirmation', validationError)
    testButtonIsDisabled(sut, 'submit-button', true)
  })
})
