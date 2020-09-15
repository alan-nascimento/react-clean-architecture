import React from 'react'

import { Footer, Header } from '@/presentation/components'

import Styles from './survey-list-styles.scss'

const SurveyList: React.FC = () => {
  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <ul>
          <li>
            <div className={Styles.surveyContent}>
              <time>
                <span className={Styles.day}>22</span>
                <span className={Styles.month}>12</span>
                <span className={Styles.eyar}>2092</span>
              </time>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae qui sequi dicta dignissimos quasi adipisci officia ullam modi blanditiis nesciunt, alias quas facilis magni iusto delectus voluptatum aut facere ea.</p>
            </div>
            <footer>See Result</footer>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default SurveyList
