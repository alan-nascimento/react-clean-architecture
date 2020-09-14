import faker from 'faker'

import { SurveyModel } from '@/domain/models'

export const mockSurveyListModel = (): SurveyModel[] => ([{
  id: faker.random.uuid(),
  question: faker.random.words(),
  answers: [
    {
      answer: faker.random.words(),
      image: faker.internet.url()
    },
    {
      answer: faker.random.words()
    }
  ],
  date: faker.date.recent(),
  didAnswer: faker.random.boolean()
}])
