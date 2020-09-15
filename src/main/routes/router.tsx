import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { SurveyList } from '@/presentation/pages'
import { makeLogin, makeSignUp } from '@/main/factories/pages'

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={makeLogin} />
      <Route path="/signup" exact component={makeSignUp} />
      <Route path="/" exact component={SurveyList} />
    </Switch>
  </BrowserRouter>
)

export default Router
