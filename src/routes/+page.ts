import { redirect } from '@sveltejs/kit'
import { SPOTIFY_API_SCOPE } from '$lib/spotify-api'

export const ssr = false

export async function load({ fetch, url }) {
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
    const data = await response.json()
    localStorage.setItem('spotify_auth', JSON.stringify(data))
    redirect(303, '/')
  }
  const auth = JSON.parse(localStorage.getItem('spotify_auth') || '{}')
  if (
    auth.error ||
    typeof auth.access_token !== 'string' ||
    typeof auth.refresh_token !== 'string' ||
    typeof auth.expires_in !== 'number' ||
    auth.token_type !== 'Bearer' ||
    auth.scope !== SPOTIFY_API_SCOPE
  ) {
    localStorage.removeItem('spotify_auth')
    return { auth: null }
  }
  return {
    auth: {
      accessToken: auth.access_token,
      refreshToken: auth.refresh_token,
      expiresAt: auth.expires_in * 1000 + Date.now(),
      scope: auth.scope
    }
  }
}
