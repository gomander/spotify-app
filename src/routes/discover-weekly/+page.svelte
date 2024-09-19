<script lang="ts">
  import { page } from '$app/stores'
  import PlaylistTable from '$lib/components/playlist-table.svelte'
</script>

<header class="px-4 py-2 preset-filled-primary-500">
  <h1 class="h3">Discover Weekly</h1>
</header>

<main class="px-4 py-2">
  <PlaylistTable tracks={$page.data.discoverWeeklyTracks} />
</main>
