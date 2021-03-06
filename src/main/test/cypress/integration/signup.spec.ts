import faker from 'faker'

import * as Http from '../utils/http-mocks'
import * as Helper from '../utils/helpers'
import * as FormHelper from '../utils/form-helpers'

const PATH = /signup/

const mockSuccess = (): void => Http.mockOk(PATH, 'POST', 'fx:account')
const mockUnexpectedError = (): void => Http.mockServerError(PATH, 'POST')
const mockEmailInUseError = (): void => Http.mockForbiddenError(PATH, 'POST')

const populateFields = (): void => {
  const password = faker.random.alphaNumeric(8)

  cy.getByTestId('name-input').focus().type(faker.name.findName())
  cy.getByTestId('email-input').focus().type(faker.internet.email())
  cy.getByTestId('password-input').focus().type(password)
  cy.getByTestId('passwordConfirmation-input').focus().type(password)
}

const simulateValidSubmit = (): void => {
  populateFields()
  cy.getByTestId('submit-button').click()
}

describe('SignUp', () => {
  beforeEach(() => {
    cy.visit('signup')
  })

  it('should load with correct initial state', () => {
    cy.getByTestId('name-input').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('name', 'Required field')

    cy.getByTestId('email-input').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('email', 'Required field')

    cy.getByTestId('password-input').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('password', 'Required field')

    cy.getByTestId('passwordConfirmation-input').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('passwordConfirmation', 'Required field')

    cy.getByTestId('submit-button').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error if form is invalid', () => {
    cy.getByTestId('name-input').focus().type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('name', 'Invalid field')

    cy.getByTestId('email-input').focus().type(faker.random.word())
    FormHelper.testInputStatus('email', 'Invalid field')

    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(4))
    FormHelper.testInputStatus('password', 'Invalid field')

    cy.getByTestId('passwordConfirmation-input').focus().type(faker.random.alphaNumeric(4))
    FormHelper.testInputStatus('passwordConfirmation', 'Invalid field')

    cy.getByTestId('submit-button').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present valid if form is valid', () => {
    cy.getByTestId('name-input').focus().type(faker.name.findName())
    FormHelper.testInputStatus('name')

    cy.getByTestId('email-input').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')

    const password = faker.random.alphaNumeric(5)

    cy.getByTestId('password-input').focus().type(password)
    FormHelper.testInputStatus('password')

    cy.getByTestId('passwordConfirmation-input').focus().type(password)
    FormHelper.testInputStatus('passwordConfirmation')

    cy.getByTestId('submit-button').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present EmailInUseError on 403', () => {
    mockEmailInUseError()

    simulateValidSubmit()

    FormHelper.testMainError('This e-mail is already in use')
    Helper.testUrl('/signup')
  })

  it('should present UnexpectedError on 400', () => {
    mockUnexpectedError()

    simulateValidSubmit()

    FormHelper.testMainError('Something went wrong. Please try again later.')
    Helper.testUrl('/signup')
  })

  it('should save account if credentials are provided', () => {
    mockSuccess()

    simulateValidSubmit()

    cy.getByTestId('error-wrap').should('not.have.descendants')

    Helper.testUrl('/')
    Helper.testLocalStorageItem('account')
  })

  it('should prevent multiple submits', () => {
    mockSuccess()

    populateFields()

    cy.getByTestId('submit-button').dblclick()
    cy.wait('@request')
    Helper.testHttpCallsCount(1)
  })

  it('should not call submit if form is invalid', () => {
    mockSuccess()

    cy.getByTestId('email-input').focus().type(faker.internet.email()).type('{enter}')

    Helper.testHttpCallsCount(0)
  })
})
