import { getPlaylistArchivedVersion } from '$lib/server/api'
import { createUserHash, getUserIdAndHash } from '$lib/server/server-utils'
import { getErrorStringFromUnknown } from '$lib/utils'

export async function GET({ params, request }) {
  try {
    const { userId, userHash } = getUserIdAndHash(request.headers.get('Authorization'))
    if (userHash !== createUserHash(userId)) {
      throw new Error('Invalid user hash')
    }
    const playlist = await getPlaylistArchivedVersion(userId, params.playlistId, params.timestamp)
    return new Response(JSON.stringify({ data: { ...playlist } }))
  } catch (e) {
    return new Response(
      JSON.stringify({ error: getErrorStringFromUnknown(e) }),
      { status: 400 }
    )
  }
}
