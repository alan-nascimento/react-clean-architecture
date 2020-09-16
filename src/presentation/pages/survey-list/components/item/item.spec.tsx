import React from 'react'
import { Router } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

import { IconName } from '@/presentation/components'
import { mockSurveyModel } from '@/domain/test'

import SurveyItem from './item'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (survey = mockSurveyModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <Router history={history}>
      <SurveyItem survey={survey} />
    </Router>
  )
  return {
    history
  }
}

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = { ...mockSurveyModel(), didAnswer: true, date: new Date('2020-01-10T00:00:00') }

    console.warn(new Date('2020-01-10T00:00:00'))

    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })
})
