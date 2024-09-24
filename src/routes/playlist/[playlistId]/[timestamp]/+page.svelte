<script lang="ts">
  import { page } from '$app/stores'
  import Icon from '$lib/components/icon.svelte'
  import PlaylistHeader from '$lib/components/playlist-header.svelte';
  import PlaylistTable from '$lib/components/playlist-table.svelte'
  import type { SpotifyPlaylist, SpotifyTrack } from '$lib/spotify-api'

  let tracks = $derived<Promise<SpotifyTrack[]>>($page.data.tracks)
  let playlist = $derived<SpotifyPlaylist>({
    ...$page.data.playlist,
    name: `${$page.data.playlist.name} (${$page.params.timestamp.slice(0, 10)})`
  })
</script>

<header class="px-4 py-2 flex justify-between items-center preset-filled-primary-500">
  <a
    href="/"
    class="btn-icon"
  >
    <Icon name="home" />
  </a>

  <h1 class="h5">Spotify Archiver</h1>
</header>

<main class="px-4 py-2 max-w-screen-xl mx-auto flex flex-col gap-2">
  <PlaylistHeader {playlist} {tracks} />

  <PlaylistTable {tracks} />
</main>
