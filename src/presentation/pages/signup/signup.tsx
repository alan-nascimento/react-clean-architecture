import React, { useState, useEffect, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'

import { AddAccount } from '@/domain/usecases'
import { Validation } from '@/presentation/protocols'
import { FormContext, ApiContext } from '@/presentation/contexts'
import { Footer, FormStatus, Input, LoginHeader, SubmitButton } from '@/presentation/components'

import Styles from './signup-styles.scss'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

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
    mainError: '',
    isFormInvalid: false
  })

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }

    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.nameError || !!old.emailError || !!old.passwordError || !!old.passwordConfirmationError }))
  }

  useEffect(() => { validate('name') }, [state.name])
  useEffect(() => { validate('email') }, [state.email])
  useEffect(() => { validate('password') }, [state.password])
  useEffect(() => { validate('passwordConfirmation') }, [state.passwordConfirmation])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      if (state.isLoading || state.isFormInvalid) return

      setState({ ...state, isLoading: true })

      const { name, email, password, passwordConfirmation } = state

      const account = await addAccount.add({ name, email, password, passwordConfirmation })

      setCurrentAccount(account)

      history.replace('/')
    } catch (err) {
      setState({ ...state, isLoading: false, mainError: err.message })
    }
  }

  return (
    <div className={Styles.signupWrap}>
      <LoginHeader />

      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="signup-form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Create an account</h2>

          <Input type="text" name="name" placeholder="Name" />
          <Input type="email" name="email" placeholder="E-mail" />
          <Input type="password" name="password" placeholder="Password" />
          <Input type="password" name="passwordConfirmation" placeholder="Confirm your password" />

          <SubmitButton text="Register" />

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
