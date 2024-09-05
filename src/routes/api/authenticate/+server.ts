import { PUBLIC_CLIENT_ID, PUBLIC_REDIRECT_URL } from '$env/static/public'
import { CLIENT_SECRET } from '$env/static/private'

export async function POST({ fetch, request }) {
  try {
    const { code } = await request.json()
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(`${PUBLIC_CLIENT_ID}:${CLIENT_SECRET}`)
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: PUBLIC_REDIRECT_URL
      })
    })
    const data = await response.json()
    return new Response(JSON.stringify(data))
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 400 })
  }
}
