import * as Http from '../utils/http-mocks'
import * as Helper from '../utils/helpers'

const PATH = /surveys/

const mockUnexpectedError = (): void => Http.mockServerError(PATH, 'GET')
const mockAccessDeniedError = (): void => Http.mockForbiddenError(PATH, 'GET')

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helper.setLocalStorageItem('account', account)
    })
  })

  it('should present on UnexpectedError', () => {
    mockUnexpectedError()

    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Something went wrong. Please try again later.')
  })

  it('should logout on AccessDeniedError', () => {
    mockAccessDeniedError()

    cy.visit('')
    Helper.testUrl('/login')
  })

  it('should present correct username', () => {
    mockUnexpectedError()

    const { name } = Helper.getLocalStorageItem('account')

    cy.visit('')
    cy.getByTestId('username').should('contain.text', name)
  })

  it('should logout on logout link click', () => {
    mockUnexpectedError()

    cy.visit('')
    cy.getByTestId('logout').click()

    Helper.testUrl('/login')
  })
})
