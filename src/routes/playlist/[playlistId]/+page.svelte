<script lang="ts">
  import { page } from '$app/stores'
  import PlaylistHeader from '$lib/components/playlist-header.svelte'
  import PlaylistTable from '$lib/components/playlist-table.svelte'
</script>

<header class="px-4 py-2 preset-filled-primary-500">
  <h1 class="h3">Playlist</h1>
</header>

<main class="px-4 py-2 flex flex-col gap-2">
  <PlaylistHeader
    playlist={$page.data.playlist}
    tracks={$page.data.tracks}
  />

  <PlaylistTable tracks={$page.data.tracks} />
</main>
