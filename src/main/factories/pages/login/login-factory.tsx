import React from 'react'

import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/usecases'

import { makeLoginValidation } from './login-validation-factory'

export const makeLogin: React.FC = () => (
  <Login
    validation={makeLoginValidation()}
    authentication={makeRemoteAuthentication()}
  />
)
