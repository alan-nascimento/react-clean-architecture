import faker from 'faker'

import * as Http from '../support/survey-list-mocks'
import * as Helper from '../support/helpers'

describe('SurveyList', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', { accessToken: faker.random.uuid(), name: faker.name.findName() })
  })

  it('should present on UnexpectedError', () => {
    Http.mockUnexpectedError()

    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Something went wrong. Please try again later.')
  })

  it('should logout on AccessDeniedError', () => {
    Http.mockAccessDeniedError()

    cy.visit('')
    Helper.testUrl('/login')
  })

  it('should present correct username', () => {
    Http.mockUnexpectedError()

    const { name } = Helper.getLocalStorageItem('account')

    cy.visit('')
    cy.getByTestId('username').should('contain.text', name)
  })
})
