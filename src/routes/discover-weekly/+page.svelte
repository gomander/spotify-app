<script lang="ts">
  import { page } from '$app/stores'
  import PlaylistHeader from '$lib/components/playlist-header.svelte'
  import PlaylistTable from '$lib/components/playlist-table.svelte'
  import type { SpotifyPlaylist, SpotifyTrack } from '$lib/spotify-api'

  let playlist = $derived<SpotifyPlaylist>($page.data.playlist)
  let tracks = $derived<SpotifyTrack[]>($page.data.tracks)

  function getDateOfMonday() {
    const date = new Date()
    date.setDate(date.getDate() - (date.getDay() + 6) % 7);
    return date
  }

  async function archive() {
    const dateString = getDateOfMonday().toISOString().slice(0, 10)
    const response = await fetch('/api/playlists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playlist: {
          id: `${playlist.id}-${dateString}`,
          name: `${playlist.name} ${dateString}`,
          tracks: tracks.map(track => track.id)
        },
        userId: $page.data.userId,
        userHash: $page.data.userHash
      })
    })
  }

  const trackActions = [{
    name: 'Track options',
    icon: 'more',
    action: (track: SpotifyTrack) => {
      console.log('Track options', track)
    }
  }]
</script>

<header class="px-4 py-2 flex justify-between items-center preset-filled-primary-500">
  <h1 class="h3">Spotify Discover Weekly Archiver</h1>

  <button
    class="btn preset-filled-primary-50-950"
    onclick={archive}
  >
    Archive
  </button>
</header>

<main class="px-4 py-2 flex flex-col gap-2">
  <PlaylistHeader
    {playlist}
    {tracks}
  />

  <PlaylistTable
    {trackActions}
    {tracks}
  />
</main>
