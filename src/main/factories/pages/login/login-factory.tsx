import React from 'react'

import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication, makeLocalUpdateCurrentAccount } from '@/main/factories/usecases'

import { makeLoginValidation } from './login-validation-factory'

export const makeLogin: React.FC = () => (
  <Login
    validation={makeLoginValidation()}
    authentication={makeRemoteAuthentication()}
    updateCurrentAccount={makeLocalUpdateCurrentAccount()}
  />
)
