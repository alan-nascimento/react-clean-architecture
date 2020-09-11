import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Props = {
  makeLogin: React.FC
  makeSignUp: React.FC
}

const Router: React.FC<Props> = (factory: Props) => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={factory.makeLogin} />
      <Route path="/signup" exact component={factory.makeSignUp} />
    </Switch>
  </BrowserRouter>
)

export default Router
