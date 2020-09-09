export interface SaveAccessToken {
  [x: string]: any

  save: (accessToken: string) => void
}
