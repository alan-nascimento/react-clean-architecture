import React from 'react'

import { Footer, Header } from '@/presentation/components'
import { SurveyListItem } from '@/presentation/pages/survey-list/components'

import Styles from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <SurveyListItem />
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
