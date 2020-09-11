import React, { useContext, useRef } from 'react'

import { FormContext } from '@/presentation/contexts'

import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)
  const inputRef = useRef<HTMLInputElement>()

  const error = state[`${props.name}Error`]

  const getStatus = (): string => error ? '🔴' : '🟢'

  const getTitle = (): string => error || 'Ok'

  return (
    <div data-testid={`${props.name}-wrap`} className={Styles.inputWrap} data-status={error ? 'invalid' : 'valid'}>
      <input
        {...props}
        readOnly
        ref={inputRef}
        title={error}
        placeholder=" "
        data-testid={`${props.name}-input`}
        onFocus={e => { e.target.readOnly = false }}
        onChange={e => { setState({ ...state, [e.target.name]: e.target.value }) }}
      />

      <label data-testid={`${props.name}-label`} onClick={() => { inputRef.current.focus() }} title={error}>
        {props.placeholder}
      </label>

      <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
