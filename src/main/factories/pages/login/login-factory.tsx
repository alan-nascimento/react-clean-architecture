import React from 'react'

import { Login } from '@/presentation/pages'
import { makeRemoteAuthentication } from '@/main/factories/usecases/authentication/remote-authentication-factory'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'

import { makeLoginValidation } from './login-validation-factory'

export const makeLogin: React.FC = () => (
  <Login
    validation={makeLoginValidation()}
    authentication={makeRemoteAuthentication()}
    saveAccessToken={makeLocalSaveAccessToken()}
  />
)
