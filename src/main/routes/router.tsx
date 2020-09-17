import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { ApiContext } from '@/presentation/contexts'
import { PrivateRoute } from '@/presentation/components'
import { makeLogin, makeSignUp, makeSurveyList } from '@/main/factories/pages'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters/current-account-adapter'

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
      </Switch>
    </BrowserRouter>
  </ApiContext.Provider>
)

export default Router
