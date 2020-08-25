import React from 'react'
import faker from 'faker'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'

import { Validation } from '@/presentation/protocols'

import Login from './login'

type SutTypes = {
  sut: RenderResult
  validationSpy: Validation
}

class ValidationSpy implements Validation {
  errorMessage: string
  input: object

  validate (input: object): string {
    this.input = input

    return this.errorMessage
  }
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()

  const sut = render(<Login validation={validationSpy} />)

  return {
    sut,
    validationSpy
  }
}

describe('Login Component', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const { sut } = makeSut()

    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Required field')
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Required field')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should call validation with correct email value', () => {
    const { sut, validationSpy } = makeSut()

    const email = faker.internet.email()
    const emaiInput = sut.getByTestId('email-input')

    fireEvent.input(emaiInput, { target: { value: email } })

    expect(validationSpy.input).toEqual({ email })
  })

  it('should call validation with correct password value', () => {
    const { sut, validationSpy } = makeSut()

    const password = faker.internet.password()
    const passwordInput = sut.getByTestId('password-input')

    fireEvent.input(passwordInput, { target: { value: password } })

    expect(validationSpy.input).toEqual({ password })
  })
})
