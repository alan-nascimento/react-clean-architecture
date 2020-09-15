import React from 'react'
import { Link } from 'react-router-dom'

import { IconName, Icon, Calendar } from '@/presentation/components'

import Styles from './item-styles.scss'

const SurveyItem: React.FC = () => {
  return (
    <li className={Styles.surveyItemWrap}>
      <div className={Styles.surveyContent}>
        <Icon className={Styles.iconWrap} iconName={IconName.thumbUp} />
        <Calendar date={new Date()} className={Styles.calendarWrap} />
        <p data-testid="question">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem architecto vero ipsum, distinctio veritatis, quasi facere, eum necessitatibus corrupti quam eaque odit maiores minus labore cumque ratione a non ex.</p>
      </div>
      <footer>
        <Link data-testid="link" to="/">Ver Resultado</Link>
      </footer>
    </li>
  )
}

export default SurveyItem
