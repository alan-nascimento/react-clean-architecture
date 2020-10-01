import React from 'react'

import Styles from './spinner-styles.scss'

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean
}

const Spinner: React.FC<Props> = ({ isNegative, ...props }: Props) => (
  <div data-testid="spinner" className={[Styles.spinner, props.className].join(' ')}>
    <div />
    <div />
    <div />
    <div />
  </div>
)

export default Spinner
