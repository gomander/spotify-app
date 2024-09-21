import crypto from 'node:crypto'
import { CLIENT_SECRET } from '$env/static/private'

export function createUserHash(userId: string): string {
  return crypto.createHash('sha256').update(userId + CLIENT_SECRET).digest('hex')
}
