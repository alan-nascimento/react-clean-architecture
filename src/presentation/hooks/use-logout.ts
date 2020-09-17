
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { ApiContext } from '@/presentation/contexts'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const history = useHistory()

  const { setCurrentAccount } = useContext(ApiContext)

  return (): void => {
    setCurrentAccount(undefined)
    history.replace('/login')
  }
}
