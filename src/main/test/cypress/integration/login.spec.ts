import faker from 'faker'

const { baseUrl } = Cypress.config()

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
    cy.server()
  })

  it('should load with correct initial state', () => {
    cy.getByTestId('email-input').should('have.attr', 'readOnly')
    cy.getByTestId('password-input').should('have.attr', 'readOnly')

    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Required field')
      .should('contain.text', '🔴')

    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Required field')
      .should('contain.text', '🔴')

    cy.getByTestId('submit-button').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present error if form is invalid', () => {
    cy.getByTestId('email-input').focus().type(faker.random.word())

    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Invalid field')
      .should('contain.text', '🔴')

    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(4))

    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Invalid field')
      .should('contain.text', '🔴')

    cy.getByTestId('submit-button').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present valid if form is valid', () => {
    cy.getByTestId('email-input').focus().type(faker.internet.email())

    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Ok')
      .should('contain.text', '🟢')

    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(5))

    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Ok')
      .should('contain.text', '🟢')

    cy.getByTestId('submit-button').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })

  it('should present InvalidCredentialsError on 401', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 401,
      response: {
        accessToken: faker.random.uuid()
      }
    })

    cy.getByTestId('email-input').focus().type(faker.internet.email())
    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit-button').click()

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Invalid credentials')

    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present UnexpectedError on 400', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 400,
      response: {
        accessToken: faker.random.uuid()
      }
    })

    cy.getByTestId('email-input').focus().type(faker.internet.email())
    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit-button').click()

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Something went wrong. Please try again later.')

    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should present UnexpectedError if invalid data is returned', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        invalidProperty: faker.random.uuid()
      }
    })

    cy.getByTestId('email-input').focus().type('mango@gmail.com')
    cy.getByTestId('password-input').focus().type('12345')

    cy.getByTestId('submit-button').click()

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', 'Something went wrong. Please try again later.')

    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('should save accessToken if credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid()
      }
    })

    cy.getByTestId('email-input').focus().type(faker.internet.email())
    cy.getByTestId('password-input').focus().type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit-button').click()

    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('not.exist')

    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
  })
})
