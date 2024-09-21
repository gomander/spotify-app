import { redirect } from '@sveltejs/kit'
import { getPlaylistTracks, type SpotifyTrack } from '$lib/spotify-api'
import type { ArchivedPlaylistVersion } from '$lib/utils'

export async function load({ fetch, params, parent }): Promise<{
  tracks: Promise<SpotifyTrack[]>,
  archivedVersions: Promise<ArchivedPlaylistVersion[]>
}> {
  const { accessToken, userId, userHash } = await parent()
  if (!accessToken) {
    redirect(303, '/')
  }

  const tracks = getPlaylistTracks(accessToken, params.playlistId, fetch)

  const response = await fetch(`/api/playlists/${params.playlistId}`,
    { headers: { Authorization: 'Basic ' + btoa(`${userId}:${userHash}`) } }
  )
  const archivedVersions = (response.json() as Promise<{ data: { archivedVersions: ArchivedPlaylistVersion[] } }>)
    .then(data => data.data.archivedVersions)

  return {
    tracks,
    archivedVersions
  }
}
