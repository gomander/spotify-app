import crypto from 'node:crypto'
import { CLIENT_SECRET } from '$env/static/private'

export function createUserHash(userId: string): string {
  return crypto.createHash('sha256').update(userId + CLIENT_SECRET).digest('hex')
}

export function getUserIdAndHash(auth: string | null): { userId: string, userHash: string } {
  if (!auth || !auth.startsWith('Basic ')) {
    throw new Error('Unauthorized')
  }
  const [userId, userHash] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':')
  if (!userId || !userHash) {
    throw new Error('Invalid request')
  }
  return { userId, userHash }
}

export interface DbPlaylist {
  id: string
  name: string
  tracks: string[]
  rating?: number
}
