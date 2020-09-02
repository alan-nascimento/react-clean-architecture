import 'jest-localstorage-mock'

import React from 'react'
import faker from 'faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'

import { Authentication } from '@/domain/usecases'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'

import Login from './login'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  sut: RenderResult
  authenticationSpy: Authentication
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationSpy = new AuthenticationSpy()

  validationStub.errorMessage = params?.validationError

  const sut = render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy} />
    </Router>
  )

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

  beforeEach(() => localStorage.clear())

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

  it('should call Authentication only once', () => {
    const { sut, authenticationSpy } = makeSut()

    simulateValideSubmit(sut)
    simulateValideSubmit(sut)

    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should not call Authentication form is invalid', () => {
    const validationError = faker.random.words()

    const { sut, authenticationSpy } = makeSut({ validationError })

    populateEmailField(sut)
    fireEvent.submit(sut.getByTestId('login-form'))

    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()

    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))

    simulateValideSubmit(sut)

    const errorWrap = sut.getByTestId('error-wrap')

    await waitFor(() => errorWrap)

    const mainError = sut.getByTestId('main-error')

    expect(mainError.textContent).toBe(error.message)
    expect(errorWrap.childElementCount).toBe(1)
  })

  it('should add access token to localStorage on success', async () => {
    const { sut, authenticationSpy } = makeSut()

    simulateValideSubmit(sut)

    await waitFor(() => sut.getByTestId('login-form'))

    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('should go to signup page', () => {
    const { sut } = makeSut()

    const signup = sut.getByTestId('signup')
    fireEvent.click(signup)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
