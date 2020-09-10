import React, { useState, useEffect } from 'react'

import { Validation } from '@/presentation/protocols'
import { FormContext } from '@/presentation/contexts'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'

import Styles from './signup-styles.scss'

type Props = {
  validation: Validation
}

const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    nameError: '',
    emailError: 'Required field',
    passwordError: 'Required field',
    passwordConfirmationError: 'Required field',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name)
    })
  }, [state.name])

  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="signup-form" className={Styles.form}>
          <h2>Create an account</h2>

          <Input type="text" name="name" placeholder="Name" />
          <Input type="email" name="email" placeholder="E-mail" />
          <Input type="password" name="password" placeholder="Password" />
          <Input type="password" name="passwordConfirmation" placeholder="Confirm your password" />

          <button
            type="submit"
            data-testid="submit-button"
            disabled
            className={Styles.submit}
          >
            Sign Up
          </button>

          <span data-testid="signup" className={Styles.link}>Back to login</span>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default SignUp
