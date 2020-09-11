declare namespace Cypress {
  interface Chainable {
    getByTestId: (testId: string) => Chainable<Element>
  }
}
