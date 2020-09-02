import React, { useState, useEffect } from 'react'

import { Validation } from '@/presentation/protocols'
import { FormContext } from '@/presentation/contexts'
import { Authentication } from '@/domain/usecases'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'

import Styles from './login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    errorMessage: '',
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.emailError || state.passwordError) return

      setState({ ...state, isLoading: true })

      const account = await authentication.auth({ email: state.email, password: state.password })

      localStorage.setItem('accessToken', account.accessToken)
    } catch (err) {
      setState({ ...state, isLoading: false, mainError: err.message })
    }
  }

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="login-form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="E-mail" />
          <Input type="password" name="password" placeholder="Password" />

          <button
            type="submit"
            data-testid="submit-button"
            disabled={!!state.emailError || !!state.passwordError}
            className={Styles.submit}
          >
            Sign In
          </button>

          <span className={Styles.link}>Create an account</span>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default Login
