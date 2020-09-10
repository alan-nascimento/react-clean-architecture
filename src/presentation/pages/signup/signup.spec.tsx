import React from 'react'
import faker from 'faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, RenderResult, cleanup, fireEvent, waitFor } from '@testing-library/react'

import { InvalidCredentialsError } from '@/domain/errors'
import { Helper, ValidationStub, AddAccountSpy, SaveAccessTokenMock } from '@/presentation/test'

import SignUp from './signup'

type SutParams = {
  validationError: string
}

type SutTypes = {
  sut: RenderResult
  addAccountSpy: AddAccountSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  const addAccountSpy = new AddAccountSpy()
  const saveAccessTokenMock = new SaveAccessTokenMock()

  validationStub.errorMessage = params?.validationError

  const sut = render(
    <Router history={history}>
      <SignUp
        validation={validationStub}
        addAccount={addAccountSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  )

  return {
    sut,
    addAccountSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = async (sut: RenderResult, name = faker.name.firstName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField(sut, 'name', name)
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  Helper.populateField(sut, 'passwordConfirmation', password)

  const form = sut.getByTestId('signup-form') as HTMLButtonElement
  fireEvent.submit(form)

  await waitFor(() => form)
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

  it('should show valid name state if validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'name')
    Helper.testStatusForField(sut, 'name')
  })

  it('should show valid email state if validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  it('should show valid password state if validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  it('should show valid passwordConfirmation state if validation succeeds', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'passwordConfirmation')
    Helper.testStatusForField(sut, 'passwordConfirmation')
  })

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut()

    Helper.populateField(sut, 'name')
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.populateField(sut, 'passwordConfirmation')

    Helper.testButtonIsDisabled(sut, 'submit-button', false)
  })

  it('should show spinner on submit', async () => {
    const { sut } = makeSut()

    await simulateValidSubmit(sut)

    Helper.testElementExists(sut, 'spinner')
  })

  it('should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()

    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(sut, name, email, password)

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  it('should call AddAccount only once', async () => {
    const { sut, addAccountSpy } = makeSut()

    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)

    expect(addAccountSpy.callsCount).toBe(1)
  })

  it('should not call AddAccount form is invalid', async () => {
    const validationError = faker.random.words()

    const { sut, addAccountSpy } = makeSut({ validationError })

    await simulateValidSubmit(sut)

    expect(addAccountSpy.callsCount).toBe(0)
  })

  it('should present error if AddAccount fails', async () => {
    const { sut, addAccountSpy } = makeSut()
    const error = new InvalidCredentialsError()

    jest.spyOn(addAccountSpy, 'add').mockReturnValueOnce(Promise.reject(error))

    await simulateValidSubmit(sut)

    Helper.testElementText(sut, 'main-error', error.message)
    Helper.testChildCount(sut, 'error-wrap', 1)
  })

  it('should call SaveAccessToken on success', async () => {
    const { sut, addAccountSpy, saveAccessTokenMock } = makeSut()

    await simulateValidSubmit(sut)

    expect(saveAccessTokenMock.accessToken).toBe(addAccountSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  it('should go to login page', () => {
    const { sut } = makeSut()

    const loginLink = sut.getByTestId('login-link')
    fireEvent.click(loginLink)

    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/login')
  })
})
