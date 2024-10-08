import { redirect } from '@sveltejs/kit'
import { getTracks, type SpotifyTrack } from '$lib/spotify-api'
import type { ArchivedPlaylistVersion } from '$lib/utils'

export async function load({ fetch, params, parent }): Promise<{ tracks: Promise<SpotifyTrack[]> }> {
  const { accessToken, userId, userHash } = await parent()
  if (!accessToken) {
    redirect(303, '/')
  }

  const response = await fetch(`/api/playlists/${params.playlistId}/${params.timestamp}`,
    { headers: { Authorization: 'Basic ' + btoa(`${userId}:${userHash}`) } }
  )
  const data = await response.json() as { data: ArchivedPlaylistVersion }

  return { tracks: getTracks(accessToken, data.data.tracks, fetch) }
}
