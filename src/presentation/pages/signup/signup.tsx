import React from 'react'
import { Link } from 'react-router-dom'

import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'

import Styles from './signup-styles.scss'

const SignUp: React.FC = () => {
  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <form data-testid="login-form" className={Styles.form}>
        <h2>Create an account</h2>

        <Input type="text" name="name" placeholder="Name" />
        <Input type="email" name="email" placeholder="E-mail" />
        <Input type="password" name="password" placeholder="Password" />
        <Input type="password" name="passwordConfirmation" placeholder="Confirm your password" />

        <button
          type="submit"
          data-testid="submit-button"
          className={Styles.submit}
        >
            Sign Up
        </button>

        <Link to="/login" data-testid="signup" className={Styles.link}>Back to login</Link>

        <FormStatus />
      </form>

      <Footer />
    </div>
  )
}

export default SignUp
