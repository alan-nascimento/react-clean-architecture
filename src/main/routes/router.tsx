import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { ApiContext } from '@/presentation/contexts'
import { PrivateRoute } from '@/presentation/components'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'
import { makeLogin, makeSignUp, makeSurveyList, makeSurveyResult } from '@/main/factories/pages'

const Router: React.FC = () => (
  <ApiContext.Provider
    value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
    }}
  >
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={makeLogin} />
        <Route path="/signup" exact component={makeSignUp} />
        <PrivateRoute path="/" exact component={makeSurveyList} />
        <PrivateRoute path="/surveys/:id" component={makeSurveyResult} />
      </Switch>
    </BrowserRouter>
  </ApiContext.Provider>
)

export default Router
