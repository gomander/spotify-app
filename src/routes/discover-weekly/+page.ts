import { redirect } from '@sveltejs/kit'
import { getPlaylistTracks, type SpotifyPlaylist, type SpotifyTrack } from '$lib/spotify-api'

export async function load({ fetch, parent }): Promise<{
  discoverWeeklyPlaylist: SpotifyPlaylist,
  discoverWeeklyTracks: SpotifyTrack[]
}> {
  const { accessToken, playlists } = await parent()
  if (!accessToken || !playlists) {
    redirect(303, '/')
  }

  const discoverWeeklyPlaylist = playlists?.find(playlist => playlist.name === 'Discover Weekly' && playlist.owner.id === 'spotify')
  if (!discoverWeeklyPlaylist) {
    redirect(303, '/')
  }

  const discoverWeeklyTracks = await getPlaylistTracks(accessToken, discoverWeeklyPlaylist.id, fetch)

  return { discoverWeeklyPlaylist, discoverWeeklyTracks }
}
