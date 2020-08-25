import React from 'react'

import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'

import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form className={Styles.form}>
        <h2>Login</h2>

        <Input type="email" name="email" placeholder="E-mail" />
        <Input type="password" name="password" placeholder="Password" />

        <button className={Styles.submit} type="submit">Sign In</button>
        <span className={Styles.link}>Create an account</span>

        <FormStatus />
      </form>

      <Footer />
    </div>
  )
}

export default Login
