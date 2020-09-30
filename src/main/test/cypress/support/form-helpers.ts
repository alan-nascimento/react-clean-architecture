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
