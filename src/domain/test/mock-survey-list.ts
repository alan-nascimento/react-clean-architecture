import faker from 'faker'

import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases'

export const mockSurveyModel = (): SurveyModel => ({
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
})

export const mockSurveyListModel = (): SurveyModel[] => ([
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel()
])

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveys = mockSurveyListModel()

  async loadAll (): Promise<LoadSurveyList.Model[]> {
    this.callsCount++

    await Promise.resolve(null)

    return this.surveys
  }
}
