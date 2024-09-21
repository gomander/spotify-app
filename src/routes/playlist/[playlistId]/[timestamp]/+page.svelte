<script lang="ts">
  import { page } from '$app/stores'
  import Icon from '$lib/components/icon.svelte'
  import PlaylistTable from '$lib/components/playlist-table.svelte'
  import type { SpotifyTrack } from '$lib/spotify-api'

  let tracks = $derived<Promise<SpotifyTrack[]>>($page.data.tracks)
</script>

<header class="px-4 py-2 flex justify-between items-center bg-primary-500 text-surface-50">
  <a href="/" class="btn-icon">
    <Icon name="home" />
  </a>

  <h1 class="h5">Spotify Archiver</h1>
</header>

<main class="px-4 py-2 flex flex-col gap-2">
  <PlaylistTable {tracks} />
</main>
