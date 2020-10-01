import faker from 'faker'

import { createMemoryHistory } from 'history'
import { fireEvent, waitFor, screen } from '@testing-library/react'

import { Authentication } from '@/domain/usecases'
import { AuthenticationSpy } from '@/domain/test'
import { InvalidCredentialsError } from '@/domain/errors'
import { ValidationStub, Helper, renderWithHistory } from '@/presentation/test'

import Login from './login'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: (account: Authentication.Model) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationStub = new ValidationStub()

  validationStub.errorMessage = params?.validationError

  const { setCurrentAccountMock } = renderWithHistory({
    history,
    Page: () => Login({ validation: validationStub, authentication: authenticationSpy })
  })

  return {
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)

  const form = screen.getByTestId('login-form') as HTMLButtonElement
  fireEvent.submit(form)

  await waitFor(() => form)
}

describe('Login Component', () => {
  it('should start with initial state', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit-button')).toBeDisabled()
  })

  it('should show email error if validation fails', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  it('should show password error if validation fails', () => {
    const validationError = faker.random.words()

    makeSut({ validationError })

    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  it('should show valid email state if validation succeeds', () => {
    makeSut()

    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  it('should show valid password state if validation succeeds', () => {
    makeSut()

    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  it('should enable submit button if form is valid', () => {
    makeSut()

    Helper.populateField('email')
    Helper.populateField('password')

    expect(screen.getByTestId('submit-button')).toBeEnabled()
  })

  it('should show spinner on submit', async () => {
    makeSut()

    await simulateValidSubmit()

    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  it('should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()

    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  it('should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut()

    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(1)
  })

  it('should not call Authentication form is invalid', async () => {
    const validationError = faker.random.words()

    const { authenticationSpy } = makeSut({ validationError })

    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(0)
  })

  it('should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()

    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))

    await simulateValidSubmit()

    expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  it('should call UpdateCurrentAccount on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()

    await simulateValidSubmit()

    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('should go to signup page', () => {
    makeSut()

    const signup = screen.getByTestId('signup')
    fireEvent.click(signup)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
