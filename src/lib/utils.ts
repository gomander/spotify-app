export function getErrorStringFromUnknown(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === 'string') {
    return error
  }
  if (typeof error === 'object' && error !== null) {
    return error.toString()
  }
  return JSON.stringify(error)
}
