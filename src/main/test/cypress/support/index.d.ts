declare namespace Cypress {
  export interface Chainable {
    getByTestId: (testId: string) => Chainable<Element>
  }
}
