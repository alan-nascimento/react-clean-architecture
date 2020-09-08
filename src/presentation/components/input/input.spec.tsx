import React from 'react'
import { render } from '@testing-library/react'

import { FormContext } from '@/presentation/contexts'

import Input from './Input'

describe('Input Component', () => {
  it('should begin with readOnly', () => {
    const { getByTestId } = render(
      <FormContext.Provider value={{ state: {} }}>
        <Input name="field" />
      </FormContext.Provider>
    )

    const input = getByTestId('field-input') as HTMLInputElement

    expect(input.readOnly).toBe(true)
  })
})
