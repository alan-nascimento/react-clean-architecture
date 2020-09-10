import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

import { Validation } from '@/presentation/protocols'
import { FormContext } from '@/presentation/contexts'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { Footer, FormStatus, Input, LoginHeader } from '@/presentation/components'

import Styles from './signup-styles.scss'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()

  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    mainError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation)
    })
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.nameError || state.emailError || state.passwordError || state.passwordConfirmationError) return

      setState({ ...state, isLoading: true })

      const { name, email, password, passwordConfirmation } = state

      const { accessToken } = await addAccount.add({ name, email, password, passwordConfirmation })

      saveAccessToken.save(accessToken)

      history.replace('/')
    } catch (err) {
      setState({ ...state, isLoading: false, mainError: err.message })
    }
  }

  return (
    <div className={Styles.signup}>
      <LoginHeader />

      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="signup-form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Create an account</h2>

          <Input type="text" name="name" placeholder="Name" />
          <Input type="email" name="email" placeholder="E-mail" />
          <Input type="password" name="password" placeholder="Password" />
          <Input type="password" name="passwordConfirmation" placeholder="Confirm your password" />

          <button
            type="submit"
            data-testid="submit-button"
            disabled={!!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError}
            className={Styles.submit}
          >
            Sign Up
          </button>

          <Link to="/login" data-testid="login-link" className={Styles.link}>
            Back to login
          </Link>

          <FormStatus />
        </form>
      </FormContext.Provider>

      <Footer />
    </div>
  )
}

export default SignUp
