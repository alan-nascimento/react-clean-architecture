import React from 'react'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { MemoryHistory } from 'history'
import { MutableSnapshot, RecoilRoot, RecoilState } from 'recoil'

import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'
import { currentAccountState } from '@/presentation/components'

type Params = {
  Page: React.FC
  history: MemoryHistory
  account?: AccountModel
  states?: Array<{ atom: RecoilState<any>, value: any }>
}

type Result = {
  setCurrentAccountMock: (account: AccountModel) => void
}

export const renderWithHistory = ({ Page, history, account = mockAccountModel(), states = [] }: Params): Result => {
  const setCurrentAccountMock = jest.fn()

  const mockedState = {
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account
  }

  const initializeState = ({ set }: MutableSnapshot): void => {
    [...states, { atom: currentAccountState, value: mockedState }].forEach(state => set(state.atom, state.value))
  }

  render(
    <RecoilRoot initializeState={initializeState}>
      <Router history={history}>
        <Page />
      </Router>
    </RecoilRoot>
  )
  return {
    setCurrentAccountMock
  }
}
