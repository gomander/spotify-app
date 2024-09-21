import { getPlaylists, archivePlaylist } from '$lib/server/api'
import { createUserHash, getUserIdAndHash } from '$lib/server/server-utils'
import { getErrorStringFromUnknown } from '$lib/utils'

export async function GET({ request }) {
  try {
    const { userId, userHash } = getUserIdAndHash(request.headers.get('Authorization'))
    if (userHash !== createUserHash(userId)) {
      throw new Error('Invalid user hash')
    }
    const playlists = await getPlaylists(userId)
    return new Response(JSON.stringify({ data: { playlists } }))
  } catch (e) {
    return new Response(
      JSON.stringify({ error: getErrorStringFromUnknown(e) }),
      { status: 400 }
    )
  }
}

export async function POST({ request }) {
  try {
    const { userId, userHash } = getUserIdAndHash(request.headers.get('Authorization'))
    if (userHash !== createUserHash(userId)) {
      throw new Error('Invalid user hash')
    }
    const body = await request.json()
    if (
      typeof body === 'object' && body !== null &&
      'playlist' in body && typeof body.playlist === 'object' && body.playlist !== null &&
      'id' in body.playlist && typeof body.playlist.id === 'string' &&
      'name' in body.playlist && typeof body.playlist.name === 'string' &&
      'tracks' in body.playlist && Array.isArray(body.playlist.tracks) &&
      body.playlist.tracks.every((track: unknown) => typeof track === 'string')
    ) {
      await archivePlaylist(userId, body.playlist)
      return new Response(JSON.stringify({ data: { success: true } }), { status: 201 })
    } else {
      throw new Error('Invalid body')
    }
  } catch (e) {
    return new Response(
      JSON.stringify({ error: getErrorStringFromUnknown(e) }),
      { status: 400 }
    )
  }
}
