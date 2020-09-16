import React from 'react'

import { SurveyModel } from '@/domain/models'
import { SurveyItem, SurveyItemEmpty } from '@/presentation/pages/survey-list/components'

import Styles from './list-styles.scss'

type Props = {
  surveys: SurveyModel[]
}

const List: React.FC<Props> = ({ surveys }: Props) => (
  <ul className={Styles.listWrap} data-testid="survey-list">
    {surveys.length
      ? surveys.map((survey: SurveyModel) => <SurveyItem key={survey.id} survey={survey} />)
      : <SurveyItemEmpty />
    }
  </ul>
)

export default List
