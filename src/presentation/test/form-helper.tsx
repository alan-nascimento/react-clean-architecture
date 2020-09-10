import faker from 'faker'
import { RenderResult, fireEvent } from '@testing-library/react'

export const testStatusForField = (sut: RenderResult, testId: string, validationError?: string): void => {
  const status = sut.getByTestId(`${testId}-status`)

  expect(status.title).toBe(validationError || 'Ok')
  expect(status.textContent).toBe(validationError ? '🔴' : '🟢')
}

export const testChildCount = (sut: RenderResult, testId: string, count: number): void => {
  const element = sut.getByTestId(testId)
  expect(element.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (sut: RenderResult, testId: string, isDisabled: boolean): void => {
  const button = sut.getByTestId(testId) as HTMLButtonElement
  expect(button.disabled).toBe(isDisabled)
}

export const populateField = (sut: RenderResult, testId: string, value = faker.random.word()): void => {
  const input = sut.getByTestId(`${testId}-input`)
  fireEvent.input(input, { target: { value } })
}

export const testElementExists = (sut: RenderResult, testId: string): void => {
  const element = sut.getByTestId(testId)
  expect(element).toBeTruthy()
}

export const testElementText = (sut: RenderResult, testId: string, text: string): void => {
  const element = sut.getByTestId(testId)
  expect(element.textContent).toBe(text)
}
