export class InvalidCredentialsError extends Error {
  constructor () {
    super('Credenciais inválidadas')
    this.name = 'InvalidCredentialsError'
  }
}
