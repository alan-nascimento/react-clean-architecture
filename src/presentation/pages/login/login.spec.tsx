import React from 'react'
import faker from 'faker'
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'

import { Authentication } from '@/domain/usecases'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'

import Login from './login'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: Authentication
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()

  validationStub.errorMessage = params?.validationError

  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />)

  return {
    sut,
    authenticationSpy
  }
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId('email-input')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId('password-input')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateValideSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)

  const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement
  fireEvent.click(submitButton)
}

const simulateFieldStatus = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const status = sut.getByTestId(`${fieldName}-status`)

  expect(status.title).toBe(validationError || 'Ok')
  expect(status.textContent).toBe(validationError ? '🔴' : '🟢')
}

describe('Login Component', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    simulateFieldStatus(sut, 'email', validationError)
    simulateFieldStatus(sut, 'password', validationError)
  })

  it('should show email error if validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    populateEmailField(sut)
    simulateFieldStatus(sut, 'email', validationError)
  })

  it('should show password error if validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    populatePasswordField(sut)
    simulateFieldStatus(sut, 'password', validationError)
  })

  it('should show valid email state if validation succeeds', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    simulateFieldStatus(sut, 'email')
  })

  it('should show valid password state if validation succeeds', () => {
    const { sut } = makeSut()

    populatePasswordField(sut)
    simulateFieldStatus(sut, 'password')
  })

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    populateEmailField(sut)
    populatePasswordField(sut)

    const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement

    expect(submitButton.disabled).toBe(false)
  })

  it('should show spinner on submit', () => {
    const { sut } = makeSut()

    simulateValideSubmit(sut)

    const spinner = sut.getByTestId('spinner')

    expect(spinner).toBeTruthy()
  })

  it('should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()

    simulateValideSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
