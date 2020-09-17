import React from 'react'
import { Router } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
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
  it('should render with correct values', () => {
    const survey = { ...mockSurveyModel(), didAnswer: true, date: new Date('2020-01-10T00:00:00') }

    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })

  it('should render with correct values', () => {
    const survey = { ...mockSurveyModel(), didAnswer: false, date: new Date('2019-05-03T00:00:00') }

    makeSut(survey)
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('mai')
    expect(screen.getByTestId('year')).toHaveTextContent('2019')
  })

  it('should go to SurveyResult', () => {
    const survey = mockSurveyModel()

    const { history } = makeSut(survey)

    fireEvent.click(screen.getByTestId('link'))

    expect(history.location.pathname).toBe(`/surveys/${survey.id}`)
  })
})
