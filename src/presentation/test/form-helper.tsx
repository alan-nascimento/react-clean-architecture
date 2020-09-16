import faker from 'faker'
import { screen, fireEvent } from '@testing-library/react'

export const testStatusForField = (testId: string, validationError = ''): void => {
  const wrap = screen.getByTestId(`${testId}-wrap`)
  const input = screen.getByTestId(`${testId}-input`)
  const label = screen.getByTestId(`${testId}-label`)

  expect(wrap).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
  expect(input).toHaveProperty('title', validationError)
  expect(label).toHaveProperty('title', validationError)
}

export const populateField = (testId: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(`${testId}-input`)
  fireEvent.input(input, { target: { value } })
}
