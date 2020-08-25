import React, { useContext } from 'react'

import { Spinner } from '@/presentation/components'
import { FormContext } from '@/presentation/contexts'

import Styles from './form-status-styles.scss'

const FormStatus: React.FC = () => {
  const { isLoading, mainError } = useContext(FormContext)

  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && <span className={Styles.error}>{mainError}</span>}
    </div>
  )
}

export default FormStatus
