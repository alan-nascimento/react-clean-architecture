import React, { memo } from 'react'

import { Logo } from '@/presentation/components'

import Styles from './login-header-styles.scss'

const LoginHeader: React.FC = () => {
  return (
    <header className={Styles.header}>
      <Logo />
      <h1>4Dev - Survey for Programmers</h1>
    </header>
  )
}

export default memo(LoginHeader)
