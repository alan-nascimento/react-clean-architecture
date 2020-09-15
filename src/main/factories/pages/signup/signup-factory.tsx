import React from 'react'

import { SignUp } from '@/presentation/pages'
import { makeSignUpValidation } from '@/main/factories/pages'
import { makeRemoteAddAccount } from '@/main/factories/usecases'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  )
}
