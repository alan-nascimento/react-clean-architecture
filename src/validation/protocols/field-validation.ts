export interface FieldValidation {
  field: string

  validate: (valie: string) => Error
}
