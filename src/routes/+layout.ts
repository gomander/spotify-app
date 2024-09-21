import { redirect } from '@sveltejs/kit'
import { getPlaylists, SPOTIFY_API_SCOPE, type SpotifyPlaylist } from '$lib/spotify-api'
import type { AppAuthData } from '$lib/utils'

export const ssr = false

export async function load({ fetch, url }): Promise<{
  accessToken?: string,
  refreshToken?: string,
  userId?: string,
  userHash?: string,
  playlists?: SpotifyPlaylist[]
}> {
  await handleAuthReturn(url, fetch)

  const auth = getAuthDataFromLocalStorage()

  if (!authIsValid(auth)) {
    localStorage.removeItem('spotify_auth')
    return { }
  }

  await handleRefreshAuth(auth, fetch)

  const playlists = await getPlaylists(auth.access_token, fetch)

  return {
    accessToken: auth.access_token,
    refreshToken: auth.refresh_token,
    userId: auth.userId,
    userHash: auth.userHash,
    playlists
  }
}

async function handleAuthReturn(url: URL, fetch = globalThis.fetch) {
  if (
    url.searchParams.has('code') &&
    url.searchParams.has('state') &&
    url.searchParams.get('state') === localStorage.getItem('spotify_auth_state')
  ) {
    localStorage.removeItem('spotify_auth_state')

    const response = await fetch('/api/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: url.searchParams.get('code') })
    })
    const data = await response.json() as AppAuthData | { error: string }
    if ('error' in data) throw new Error(data.error)
    localStorage.setItem('spotify_auth', JSON.stringify(data))

    redirect(303, '/')
  }
}

function getAuthDataFromLocalStorage(): AppAuthData | null {
  try {
    const auth = JSON.parse(localStorage.getItem('spotify_auth') || '{}')
    if ('error' in auth) throw new Error(auth.error)
    return auth
  } catch (e) {
    console.error(e)
    return null
  }
}

function authIsValid(auth: unknown): auth is AppAuthData {
  return (
    auth !== null && typeof auth === 'object' &&
    'access_token' in auth && typeof auth.access_token === 'string' &&
    'refresh_token' in auth && typeof auth.refresh_token === 'string' &&
    'expires_in' in auth && typeof auth.expires_in === 'number' &&
    'expires' in auth && typeof auth.expires === 'number' &&
    'userHash' in auth && typeof auth.userHash === 'string' &&
    'userId' in auth && typeof auth.userId === 'string' &&
    'token_type' in auth && auth.token_type === 'Bearer' &&
    'scope' in auth && auth.scope === SPOTIFY_API_SCOPE
  )
}

async function handleRefreshAuth(auth: AppAuthData, fetch = globalThis.fetch) {
  if (auth.expires < Date.now()) {
    const response = await fetch('/api/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: auth.refresh_token })
    })
    const data = await response.json() as AppAuthData | { error: string }
    if ('error' in data) throw new Error(data.error)
    localStorage.setItem('spotify_auth', JSON.stringify({
      ...auth, ...data
    } satisfies AppAuthData))

    redirect(303, '/')
  }
}
