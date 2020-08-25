import React, { useState } from 'react'

import { FormContext } from '@/presentation/contexts'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'

import Styles from './login-styles.scss'

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    errorMessage: '',
    emailError: 'Required field',
    passwordError: 'Required field',
    mainError: ''
  })

  return (
    <div className={Styles.login}>
      <LoginHeader />

      <FormContext.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>

          <Input type="email" name="email" placeholder="E-mail" />
          <Input type="password" name="password" placeholder="Password" />

          <button data-testid="submit-button" disabled className={Styles.submit} type="submit">Sign In</button>
          <span className={Styles.link}>Create an account</span>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default Login
