import { RenderResult } from '@testing-library/react'

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
