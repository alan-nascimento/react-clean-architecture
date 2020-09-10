import React, { useContext } from 'react'

import { FormContext } from '@/presentation/contexts'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { state } = useContext(FormContext)

  return (
    <button
      type="submit"
      data-testid="submit-button"
      disabled={state.isFormInvalid}
    >
      {text}
    </button>
  )
}

export default SubmitButton
