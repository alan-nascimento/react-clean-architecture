import React, { useEffect, useState } from 'react'

import { SurveyModel } from '@/domain/models'
import { SurveyListItem } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'
import { Footer, Header } from '@/presentation/components'

import Styles from './survey-list-styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[]
  })

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(surveys => setState({ surveys }))
  }, [])

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <SurveyListItem surveys={state.surveys} />
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
