import { redirect } from '@sveltejs/kit'
import { getPlaylistTracks, type SpotifyPlaylist, type SpotifyTrack } from '$lib/spotify-api'

export async function load({ fetch, params, parent }): Promise<{
  playlist: SpotifyPlaylist,
  tracks: Promise<SpotifyTrack[]>,
  archivedVersions: { tracks: string[], timestamp: string }[]
}> {
  const { accessToken, userId, userHash, playlists } = await parent()
  if (!accessToken) {
    redirect(303, '/')
  }

  const playlist = playlists?.find(playlist => playlist.id === params.playlistId)
  if (!playlist) {
    redirect(303, '/')
  }

  const tracks = getPlaylistTracks(accessToken, params.playlistId, fetch)

  const response = await fetch(`/api/playlists/${params.playlistId}`,
    { headers: { Authorization: 'Basic ' + btoa(`${userId}:${userHash}`) } }
  )
  const data = await response.json() as { data: { archivedVersions: { tracks: string[], timestamp: string }[] } }

  return {
    playlist,
    tracks,
    archivedVersions: data.data.archivedVersions
  }
}
