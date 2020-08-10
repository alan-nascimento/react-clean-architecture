export class UnexpectedError extends Error {
  constructor () {
    super('Something went wrong. Please try again later.')
    this.name = 'UnexpectedError'
  }
}
