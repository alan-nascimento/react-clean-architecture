export class AccessDeniedError extends Error {
  constructor () {
    super('Denied access!')
    this.name = 'AccessDeniedError'
  }
}
