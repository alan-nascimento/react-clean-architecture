const { baseUrl } = Cypress.config()

export const testInputStatus = (testId: string, error?: string): void => {
  cy.getByTestId(`${testId}-wrap`).should('have.attr', 'data-status', error ? 'invalid' : 'valid')

  const attr = `${error ? '' : 'not.'}have.attr`

  cy.getByTestId(`${testId}-input`).should(attr, 'title', error)
  cy.getByTestId(`${testId}-label`).should(attr, 'title', error)
}

export const testMainError = (error: string): void => {
  cy.getByTestId('spinner').should('not.exist')
  cy.getByTestId('main-error').should('contain.text', error)
}

export const testHttpCallsCount = (count: number): void => {
  cy.get('@request.all').should('have.length', count)
}

export const testUrl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (key: string): void => {
  cy.window().then(window => assert.isOk(window.localStorage.getItem(key)))
}
