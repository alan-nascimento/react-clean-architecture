import { SaveAccessToken } from '@/domain/usecases'

export class SaveAccessTokenMock implements SaveAccessToken {
  accessToken: string

  save (accessToken: string): void {
    this.accessToken = accessToken
  }
}
