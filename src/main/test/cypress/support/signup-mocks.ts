import faker from 'faker'

import * as Http from './http-mocks'

export const mockInvalidCredentialsError = (): void => Http.mockUnauthorizedError(/signup/)

export const mockUnexpectedError = (): void => Http.mockServerError(/signup/, 'POST')

export const mockEmailInUseError = (): void => Http.mockForbiddenError(/signup/, 'POST')

export const mockOk = (): void => Http.mockOk(/signup/, 'POST', { accessToken: faker.random.uuid(), name: faker.name.findName() })
