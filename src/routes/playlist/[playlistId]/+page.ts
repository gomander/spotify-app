import { redirect } from '@sveltejs/kit'
import { getPlaylistTracks, type SpotifyPlaylist, type SpotifyTrack } from '$lib/spotify-api'

export async function load({ fetch, params, parent }): Promise<{
  playlist: SpotifyPlaylist,
  tracks: Promise<SpotifyTrack[]>
}> {
  const { accessToken, playlists } = await parent()
  if (!accessToken) {
    redirect(303, '/')
  }

  const playlist = playlists?.find(playlist => playlist.id === params.playlistId)
  if (!playlist) {
    redirect(303, '/')
  }

  const tracks = getPlaylistTracks(accessToken, params.playlistId, fetch)

  return { playlist, tracks }
}
