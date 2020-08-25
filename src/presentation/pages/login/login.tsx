import React from 'react'

import { Logo, Spinner } from '@/presentation/components'

import Styles from './login-styles.scss'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo />
        <h1>4Dev - Survey for Programmers</h1>
      </header>

      <form className={Styles.form}>
        <h2>Login</h2>

        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder="E-mail" />
          <span className={Styles.status}>🔴</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type="password" name="password" placeholder="Password" />
          <span className={Styles.status}>🔴</span>
        </div>

        <button className={Styles.submit} type="submit">Sign In</button>
        <span className={Styles.link}>Create an account</span>

        <div className={Styles.errorWrap}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>
            Error
          </span>
        </div>
      </form>

      <footer className={Styles.footer}></footer>
    </div>
  )
}

export default Login
