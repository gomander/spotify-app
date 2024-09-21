<script lang="ts">
  import { page } from '$app/stores'
  import PlaylistHeader from '$lib/components/playlist-header.svelte'
  import PlaylistTable from '$lib/components/playlist-table.svelte'
  import type { SpotifyTrack } from '$lib/spotify-api'

  const trackActions = [{
    name: 'Track options',
    icon: 'more',
    action: (track: SpotifyTrack) => {
      console.log('Track options', track)
    }
  }]
</script>

<header class="px-4 py-2 preset-filled-primary-500">
  <h1 class="h3">Spotify Discover Weekly Archiver</h1>
</header>

<main class="px-4 py-2 flex flex-col gap-2">
  <PlaylistHeader
    playlist={$page.data.discoverWeeklyPlaylist}
    tracks={$page.data.discoverWeeklyTracks}
  />

  <PlaylistTable
    {trackActions}
    tracks={$page.data.discoverWeeklyTracks}
  />
</main>
