import { redirect } from '@sveltejs/kit'
import {
  getPlaylists, SPOTIFY_API_SCOPE, type SpotifyAuthData,
  type SpotifyAuthDataWithExpires, type SpotifyPlaylist
} from '$lib/spotify-api'

export const ssr = false

export async function load({ fetch, url }): Promise<{
  accessToken?: string, refreshToken?: string, playlists?: SpotifyPlaylist[]
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
    const data = await response.json() as SpotifyAuthData
    localStorage.setItem('spotify_auth', JSON.stringify({
      ...data,
      expires: Date.now() + data.expires_in * 1000
    } satisfies SpotifyAuthDataWithExpires))

    redirect(303, '/')
  }
}

function getAuthDataFromLocalStorage(): SpotifyAuthDataWithExpires | null {
  try {
    const auth = JSON.parse(localStorage.getItem('spotify_auth') || '{}')
    if ('error' in auth) throw new Error(auth.error)
    return auth
  } catch (e) {
    console.error(e)
    return null
  }
}

function authIsValid(auth: unknown): auth is SpotifyAuthDataWithExpires {
  return (
    auth !== null && typeof auth === 'object' &&
    'access_token' in auth && typeof auth.access_token === 'string' &&
    'refresh_token' in auth && typeof auth.refresh_token === 'string' &&
    'expires_in' in auth && typeof auth.expires_in === 'number' &&
    'expires' in auth && typeof auth.expires === 'number' &&
    'token_type' in auth && auth.token_type === 'Bearer' &&
    'scope' in auth && auth.scope === SPOTIFY_API_SCOPE
  )
}

async function handleRefreshAuth(auth: SpotifyAuthDataWithExpires, fetch = globalThis.fetch) {
  if (auth.expires < Date.now()) {
    const response = await fetch('/api/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: auth.refresh_token })
    })
    const data = await response.json() as SpotifyAuthData
    localStorage.setItem('spotify_auth', JSON.stringify({
      ...auth,
      ...data,
      expires: Date.now() + data.expires_in * 1000
    } satisfies SpotifyAuthDataWithExpires))

    redirect(303, '/')
  }
}
