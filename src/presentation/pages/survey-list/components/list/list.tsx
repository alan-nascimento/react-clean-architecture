import React from 'react'

import { SurveyItemEmpty } from '@/presentation/pages/survey-list/components'

import Styles from './list-styles.scss'

const List: React.FC = () => {
  return (
    <ul className={Styles.listWrap} data-testid="survey-list">
      <SurveyItemEmpty />
    </ul>
  )
}

export default List
