export interface Validation {
  errorMessage: string

  validate (fieldName: string, fieldValue: string): string
}
