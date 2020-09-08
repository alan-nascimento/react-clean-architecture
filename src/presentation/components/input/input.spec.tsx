import React from 'react'
import faker from 'faker'
import { render, RenderResult, fireEvent } from '@testing-library/react'

import { FormContext } from '@/presentation/contexts'

import Input from './Input'

const makeSut = (fieldName: string): RenderResult => {
  return render(
    <FormContext.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </FormContext.Provider>
  )
}

describe('Input Component', () => {
  it('should begin with readOnly', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(`${field}-input`) as HTMLInputElement

    expect(input.readOnly).toBe(true)
  })

  it('should remove readOnly on focus', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const input = sut.getByTestId(`${field}-input`) as HTMLInputElement

    fireEvent.focus(input)

    expect(input.readOnly).toBe(false)
  })
})
