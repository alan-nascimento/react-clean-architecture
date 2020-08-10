import faker from 'faker'

import { HttpPostParams } from '@/data/protocols/http'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
})
