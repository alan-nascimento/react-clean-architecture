import { atom } from 'recoil'

import { LoadSurveyResult } from '@/domain/usecases'

export const surveyResultState = atom({
  key: 'surveyResultState',
  default: {
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false
  }
})

export const onSurveyAnswerState = atom({
  key: 'onSurveyAnswerState',
  default: {
    onAnswer: null as (answer: string) => void
  }
})
