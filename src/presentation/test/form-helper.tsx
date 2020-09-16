import faker from 'faker'
import { screen, fireEvent } from '@testing-library/react'

export const testStatusForField = (testId: string, validationError = ''): void => {
  const wrap = screen.getByTestId(`${testId}-wrap`)
  const input = screen.getByTestId(`${testId}-input`)
  const label = screen.getByTestId(`${testId}-label`)

  expect(wrap.getAttribute('data-status')).toBe(validationError ? 'invalid' : 'valid')
  expect(input.title).toBe(validationError)
  expect(label.title).toBe(validationError)
}

export const testChildCount = (testId: string, count: number): void => {
  const element = screen.getByTestId(testId)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (testId: string, isDisabled: boolean): void => {
  const button = screen.getByTestId(testId) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const populateField = (testId: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(`${testId}-input`)
  fireEvent.input(input, { target: { value } })
}

export const testElementExists = (testId: string): void => {
  const element = screen.getByTestId(testId)
  expect(element).toBeTruthy()
}

export const testElementText = (testId: string, text: string): void => {
  const element = screen.getByTestId(testId)
  expect(element.textContent).toBe(text)
}
