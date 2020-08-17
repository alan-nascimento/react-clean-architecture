import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Validation } from '@/presentation/protocols'
import { Authentication } from '@/domain/usecases'
import { FormContext } from '@/presentation/contexts'
import { Footer, Input, LoginHeader, FormStatus, SubmitButton } from '@/presentation/components'

import Styles from './login-styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<any> = ({ validation, authentication }: Props) => {
  // const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: ''
  })

  // useEffect(() => { validate('email') }, [state.email])
  // useEffect(() => { validate('password') }, [state.password])

  // const validate = (field: string): void => {
  //   const { email, password } = state
  //   const formData = { email, password }
  //   setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
  //   setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
  // }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      await setState(old => ({ ...old, isLoading: true }))
      // const account = await authentication.auth({
      //   email: state.email,
      //   password: state.password
      // })
      // setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setState(old => ({
        ...old,
        isLoading: false,
        mainError: error.message
      }))
    }
  }

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="E-mail" />
          <Input type="password" name="password" placeholder="Password" />
          <SubmitButton text="Sign In" />
          {/* <Link data-testid="signup-link" to="/signup" className={Styles.link}>Criar conta</Link> */}
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
