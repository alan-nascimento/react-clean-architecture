import React from 'react'
import { render, RenderResult } from '@testing-library/react'

import { FormContext } from '@/presentation/contexts'

import Input from './Input'

const makeSut = (): RenderResult => {
  return render(
    <FormContext.Provider value={{ state: {} }}>
      <Input name="field" />
    </FormContext.Provider>
  )
}

describe('Input Component', () => {
  it('should begin with readOnly', () => {
    const sut = makeSut()
    const input = sut.getByTestId('field-input') as HTMLInputElement

    expect(input.readOnly).toBe(true)
  })
})
