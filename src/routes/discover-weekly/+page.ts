import { redirect } from '@sveltejs/kit'
import { getPlaylistTracks, type SpotifyTrack } from '$lib/spotify-api'

export async function load({ fetch, parent }): Promise<{ tracks: SpotifyTrack[] }> {
  const { accessToken, playlists } = await parent()

  const playlist = playlists?.find(playlist => playlist.name === 'Discover Weekly' && playlist.owner.id === 'spotify')
  if (!playlist) {
    redirect(303, '/')
  }

  const tracks = await getPlaylistTracks(accessToken!, playlist.id, fetch)

  return { tracks }
}
