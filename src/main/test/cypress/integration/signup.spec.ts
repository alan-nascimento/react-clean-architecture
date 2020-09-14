import faker from 'faker'

import * as FormHelper from '../support/form-helper'

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
})
