<script lang="ts">
  import { page } from '$app/stores'
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
  <h1 class="h3">Discover Weekly</h1>
</header>

<main class="px-4 py-2">
  <PlaylistTable
    playlist={$page.data.discoverWeeklyPlaylist}
    {trackActions}
    tracks={$page.data.discoverWeeklyTracks}
  />
</main>
