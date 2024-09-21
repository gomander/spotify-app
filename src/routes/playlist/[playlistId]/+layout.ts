import { redirect } from '@sveltejs/kit'
import type { SpotifyPlaylist } from '$lib/spotify-api'

export async function load({ params, parent }): Promise<{ playlist: SpotifyPlaylist }> {
  const { playlists } = await parent()

  const playlist = playlists?.find(playlist => playlist.id === params.playlistId)
  if (!playlist) {
    redirect(303, '/')
  }

  return { playlist }
}
