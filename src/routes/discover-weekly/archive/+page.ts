import { redirect } from '@sveltejs/kit'
import type { DbPlaylist } from '$lib/server/server-utils'

export async function load({ fetch, parent }): Promise<{ archivedPlaylists: DbPlaylist[] }> {
  const { userId, userHash } = await parent()
  if (!userId || !userHash) {
    redirect(303, '/')
  }

  const response = await fetch(`/api/playlists`, {
    headers: { Authorization: 'Basic ' + Buffer.from(`${userId}:${userHash}`).toString('base64') }
  })
  const { playlists } = await response.json()

  return { archivedPlaylists: playlists }
}
