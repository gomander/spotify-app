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
    const { userId, playlist, userHash } = await request.json()
    if (!userId || !playlist || !userHash) {
      throw new Error('Invalid request')
    }
    if (userHash !== createUserHash(userId)) {
      throw new Error('Invalid user hash')
    }
    await archivePlaylist(userId, playlist)
    return new Response(JSON.stringify({ data: { success: true } }), { status: 201 })
  } catch (e) {
    return new Response(
      JSON.stringify({ error: getErrorStringFromUnknown(e) }),
      { status: 400 }
    )
  }
}
