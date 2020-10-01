import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import { Validation } from '@/presentation/protocols'
import { Authentication } from '@/domain/usecases'
import { Footer, LoginHeader, currentAccountState } from '@/presentation/components'
import { loginState, Input, SubmitButton, FormStatus } from '@/presentation/pages/login/components'

import Styles from './login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const resetLoginState = useResetRecoilState(loginState)
  const { setCurrentAccount } = useRecoilValue(currentAccountState)

  const history = useHistory()
  const [state, setState] = useRecoilState(loginState)

  useEffect(() => resetLoginState(), [])
  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])

  const validate = (field: string): void => {
    const { email, password } = state
    const formData = { email, password }

    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) return

      setState(old => ({ ...old, isLoading: true }))

      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })

      setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setState(old => ({ ...old, isLoading: false,mainError: error.message }))
    }
  }

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <form data-testid="login-form" className={Styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>

        <Input type="email" name="email" placeholder="E-mail" />
        <Input type="password" name="password" placeholder="Password" />

        <SubmitButton text="SignIn" />

        <Link to="/signup" data-testid="signup" className={Styles.link}>Create an account</Link>

        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login
