import { db } from '$lib/server/firebase'

export async function upsertUser(userId: string) {
  await db.collection('users').doc(userId).set({ id: userId }, { merge: true })
}
