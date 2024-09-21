export function getErrorStringFromUnknown(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  if (typeof error === 'object' && error !== null) {
    if ('error' in error && typeof error.error === 'string') {
      return error.error
    }
    return error.toString()
  }
  return JSON.stringify(error)
}

export interface AppAuthData {
  access_token: string
  refresh_token: string
  token_type: 'Bearer'
  scope: string
  expires_in: number
  expires: number
  userHash: string
  userId: string
}
