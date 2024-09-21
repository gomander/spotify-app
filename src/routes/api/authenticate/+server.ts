import crypto from 'node:crypto'
import { PUBLIC_CLIENT_ID, PUBLIC_REDIRECT_URL } from '$env/static/public'
import { CLIENT_SECRET } from '$env/static/private'
import { getOwnProfile, type SpotifyAuthData } from '$lib/spotify-api'
import { getErrorStringFromUnknown, type AppAuthData } from '$lib/utils'

export async function POST({ fetch, request }) {
  try {
    const { code, refreshToken } = await request.json()
    const body = new URLSearchParams()
    if (code && !refreshToken) {
      body.append('grant_type', 'authorization_code')
      body.append('code', code)
      body.append('redirect_uri', PUBLIC_REDIRECT_URL)
    } else if (refreshToken && !code) {
      body.append('grant_type', 'refresh_token')
      body.append('refresh_token', refreshToken)
    } else {
      throw new Error('Invalid request')
    }
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(`${PUBLIC_CLIENT_ID}:${CLIENT_SECRET}`)
      },
      body
    })
    const data = await response.json() as SpotifyAuthData | { error: string }
    if ('error' in data) {
      throw new Error(data.error)
    }
    const profile = await getOwnProfile(data.access_token, fetch)
    return new Response(JSON.stringify({
      ...data,
      userHash: crypto.createHash('sha256').update(profile.id + CLIENT_SECRET).digest('hex'),
      userId: profile.id,
      expires: Date.now() + data.expires_in * 1000
    } satisfies AppAuthData))
  } catch (e) {
    return new Response(
      JSON.stringify({ error: getErrorStringFromUnknown(e) }),
      { status: 400 }
    )
  }
}
