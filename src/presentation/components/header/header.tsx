import React, { memo, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { Logo } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'

import Styles from './header-styles.scss'

const Header: React.FC = () => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  const logout = (event: any): void => {
    event.preventDefault()

    setCurrentAccount(undefined)
    history.replace('/login')
  }

  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />
        <div className={Styles.logoutWrap}>
          <span data-testid="username">Alan</span>
          <a data-testid="logout" href="#" onClick={logout}>Logout</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
