export interface Validation {
  [x: string]: any

  validate (fieldName: string, fieldValue: string): string
}
