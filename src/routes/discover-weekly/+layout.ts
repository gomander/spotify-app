import { redirect } from '@sveltejs/kit'
import type { SpotifyPlaylist } from '$lib/spotify-api'

export async function load({ parent }): Promise<{ playlist: SpotifyPlaylist }> {
  const { accessToken, playlists } = await parent()
  if (!accessToken || !playlists) {
    redirect(303, '/')
  }

  const playlist = playlists?.find(playlist => playlist.name === 'Discover Weekly' && playlist.owner.id === 'spotify')
  if (!playlist) {
    redirect(303, '/')
  }

  return { playlist }
}
