export class EmailInUseError extends Error {
  constructor () {
    super('This e-mail is already in use.')
    this.name = 'EmailInUseError'
  }
}
