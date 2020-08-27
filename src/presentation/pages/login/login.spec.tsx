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

describe('Login Component', () => {
  afterEach(cleanup)

  it('should start with initial state', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    const errorWrap = sut.getByTestId('error-wrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show email error if validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    const emailInput = sut.getByTestId('email-input')

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = sut.getByTestId('email-status')

    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('should show password error if validation fails', () => {
    const validationError = faker.random.words()

    const { sut } = makeSut({ validationError })

    const passwordInput = sut.getByTestId('password-input')

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = sut.getByTestId('password-status')

    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('should show valid email state if validation succeeds', () => {
    const { sut } = makeSut()

    const emailInput = sut.getByTestId('email-input')

    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = sut.getByTestId('email-status')

    expect(emailStatus.title).toBe('Ok')
    expect(emailStatus.textContent).toBe('🟢')
  })

  it('should show valid password state if validation succeeds', () => {
    const { sut } = makeSut()

    const passwordInput = sut.getByTestId('password-input')

    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = sut.getByTestId('password-status')

    expect(passwordStatus.title).toBe('Ok')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    const emailInput = sut.getByTestId('email-input')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const passwordInput = sut.getByTestId('password-input')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement

    expect(submitButton.disabled).toBe(false)
  })

  it('should show spinner on submit', () => {
    const { sut } = makeSut()

    const emailInput = sut.getByTestId('email-input')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const passwordInput = sut.getByTestId('password-input')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement
    fireEvent.click(submitButton)

    const spinner = sut.getByTestId('spinner')

    expect(spinner).toBeTruthy()
  })

  it('should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const emailInput = sut.getByTestId('email-input')
    fireEvent.input(emailInput, { target: { value: email } })

    const password = faker.internet.password()
    const passwordInput = sut.getByTestId('password-input')
    fireEvent.input(passwordInput, { target: { value: password } })

    const submitButton = sut.getByTestId('submit-button') as HTMLButtonElement
    fireEvent.click(submitButton)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
