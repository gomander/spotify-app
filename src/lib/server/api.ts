import { db } from '$lib/server/firebase'
import type { DbPlaylist } from '$lib/server/server-utils'

export async function upsertUser(userId: string) {
  await db.collection('users').doc(userId).set({ id: userId }, { merge: true })
}

export async function rateTrack(userId: string, trackId: string, rating: number) {
  await db
    .collection('users')
    .doc(userId)
    .collection('tracks')
    .doc(trackId)
    .set({ id: trackId, rating })
}

export async function archivePlaylist(userId: string, playlist: DbPlaylist) {
  const playlistDoc = db
    .collection('users')
    .doc(userId)
    .collection('playlists')
    .doc(playlist.id)
  await playlistDoc.set({ id: playlist.id, name: playlist.name })
  const timestamp = new Date().toISOString()
  await playlistDoc
    .collection('archivedVersions')
    .doc(timestamp)
    .set({ tracks: playlist.tracks, timestamp })
}

export async function getPlaylist(userId: string, playlistId: string) {
  const playlistDoc = db
    .collection('users')
    .doc(userId)
    .collection('playlists')
    .doc(playlistId)
  const docSnapshot = await playlistDoc.get()
  const playlist = docSnapshot.data() as { id: string, name: string }
  const collectionSnapshot = await playlistDoc.collection('archivedVersions').get()
  const archivedVersions = collectionSnapshot.docs.map(doc => doc.data() as { tracks: string[], timestamp: string })
  return { playlist, archivedVersions }
}

export async function getPlaylistArchivedVersion(userId: string, playlistId: string, timestamp: string) {
  const docSnapshot = await db
    .collection('users')
    .doc(userId)
    .collection('playlists')
    .doc(playlistId)
    .collection('archivedVersions')
    .doc(timestamp)
    .get()
  return docSnapshot.data() as { tracks: string[], timestamp: string }
}

export async function getPlaylists(userId: string) {
  const snapshot = await db
    .collection('users')
    .doc(userId)
    .collection('playlists')
    .get()
  return snapshot.docs.map(doc => doc.data() as { tracks: string[], timestamp: string })
}
