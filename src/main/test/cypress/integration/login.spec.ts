import faker from 'faker'

import * as Http from '../support/login-mocks'
import * as FormHelper from '../support/form-helper'

const simulateValidSubmit = (): void => {
  cy.getByTestId('email-input').focus().type(faker.internet.email())
  cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(5))
  cy.getByTestId('submit-button').click()
}

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('should load with correct initial state', () => {
    cy.getByTestId('email-input').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('email', 'Required field')

    cy.getByTestId('password-input').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('password', 'Required field')

    cy.getByTestId('submit-button').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error if form is invalid', () => {
    cy.getByTestId('email-input').focus().type(faker.random.word())
    FormHelper.testInputStatus('email', 'Invalid field')

    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(4))
    FormHelper.testInputStatus('password', 'Invalid field')

    cy.getByTestId('submit-button').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present valid if form is valid', () => {
    cy.getByTestId('email-input').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')

    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(5))
    FormHelper.testInputStatus('password')

    cy.getByTestId('submit-button').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present InvalidCredentialsError on 401', () => {
    Http.mockInvalidCredentialsError()

    simulateValidSubmit()

    FormHelper.testMainError('Invalid credentials')
    FormHelper.testUrl('/login')
  })

  it('should present UnexpectedError on 400', () => {
    Http.mockUnexpectedError()

    simulateValidSubmit()

    FormHelper.testMainError('Something went wrong. Please try again later.')
    FormHelper.testUrl('/login')
  })

  it('should present UnexpectedError if invalid data is returned from server', () => {
    Http.mockInvalidData()

    simulateValidSubmit()

    FormHelper.testMainError('Something went wrong. Please try again later.')
    FormHelper.testUrl('/login')
  })

  it('should save accessToken if credentials are provided', () => {
    Http.mockOk()

    simulateValidSubmit()

    cy.getByTestId('error-wrap').should('not.have.descendants')

    FormHelper.testUrl('/')
    FormHelper.testLocalStorageItem('accessToken')
  })

  it('should prevent multiple submits', () => {
    Http.mockOk()

    cy.getByTestId('email-input').focus().type(faker.internet.email())
    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit-button').dblclick()

    FormHelper.testHttpCallsCount(1)
  })

  it('should not call submit if form is invalid', () => {
    Http.mockOk()

    cy.getByTestId('email-input').focus().type(faker.internet.email()).type('{enter}')

    FormHelper.testHttpCallsCount(0)
  })
})
