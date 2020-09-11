describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('should load with correct initial state', () => {
    cy.getByTestId('email-status')
      .should('have.attr', 'title', 'Required field')
      .should('contain.text', '🔴')

    cy.getByTestId('password-status')
      .should('have.attr', 'title', 'Required field')
      .should('contain.text', '🔴')

    cy.getByTestId('submit-button').should('have.attr', 'disabled')
    cy.getByTestId('error-wrap').should('not.have.descendants')
  })
})
