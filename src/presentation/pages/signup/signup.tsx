import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'

import { Validation } from '@/presentation/protocols'
import { AddAccount } from '@/domain/usecases'
import { Footer, LoginHeader, currentAccountState } from '@/presentation/components'
import { signUpState, Input, SubmitButton, FormStatus } from '@/presentation/pages/signup/components'

import Styles from './signup-styles.scss'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const resetSignUpState = useResetRecoilState(signUpState)
  const { setCurrentAccount } = useRecoilValue(currentAccountState)

  const history = useHistory()
  const [state, setState] = useRecoilState(signUpState)

  useEffect(() => resetSignUpState(), [])
  useEffect(() => validate('name'), [state.name])
  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])
  useEffect(() => validate('passwordConfirmation'), [state.passwordConfirmation])

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }

    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.nameError || !!old.emailError || !!old.passwordError || !!old.passwordConfirmationError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) return

      setState(old => ({ ...old, isLoading: true }))

      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })

      setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setState(old => ({ ...old, isLoading: false, mainError: error.message }))
    }
  }

  return (
    <div className={Styles.signupWrap}>
      <LoginHeader />

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

      <Footer />
    </div>
  )
}

export default SignUp
