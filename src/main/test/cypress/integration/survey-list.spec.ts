import * as Http from '../utils/http-mocks'
import * as Helper from '../utils/helpers'

const PATH = /surveys/

const mockSuccess = (): void => Http.mockOk(PATH, 'GET', 'fx:survey-list')
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

  it('should reload on button click', () => {
    mockUnexpectedError()
    cy.visit('')
    cy.getByTestId('error').should('contain.text', 'Something went wrong. Please try again later.')

    mockSuccess()
    cy.getByTestId('reload').click()
    cy.get('li:not(:empty)').should('have.length', 2)
  })

  it('should present survey items', () => {
    mockSuccess()

    cy.visit('')
    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '03')
      assert.equal(li.find('[data-testid="month"]').text(), 'fev')
      assert.equal(li.find('[data-testid="year"]').text(), '2018')
      assert.equal(li.find('[data-testid="question"]').text(), 'question_1')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp)
      })
    })

    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '20')
      assert.equal(li.find('[data-testid="month"]').text(), 'out')
      assert.equal(li.find('[data-testid="year"]').text(), '2020')
      assert.equal(li.find('[data-testid="question"]').text(), 'question_2')
      cy.fixture('icons').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbDown)
      })
    })
  })
})
