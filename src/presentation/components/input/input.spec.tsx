import React from 'react'
import faker from 'faker'
import { render, fireEvent, screen } from '@testing-library/react'

import { InputBase } from '@/presentation/components'

const makeSut = (fieldName: string): void => {
  render(
    <InputBase name={fieldName} state={{}} setState={null} />
  )
}

describe('Input Component', () => {
  it('should begin with readOnly', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(`${field}-input`) as HTMLInputElement

    expect(input.readOnly).toBe(true)
  })

  it('should remove readOnly on focus', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(`${field}-input`) as HTMLInputElement

    fireEvent.focus(input)

    expect(input.readOnly).toBe(false)
  })

  it('should focus input on label click', () => {
    const field = faker.database.column()
    makeSut(field)

    const input = screen.getByTestId(`${field}-input`) as HTMLInputElement
    const label = screen.getByTestId(`${field}-label`)

    fireEvent.click(label)

    expect(document.activeElement).toBe(input)
  })
})
