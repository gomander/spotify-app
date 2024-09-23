<script lang="ts">
  import { page } from '$app/stores'
  import Icon from '$lib/components/icon.svelte'
  import PlaylistHeader from '$lib/components/playlist-header.svelte'
  import PlaylistTable from '$lib/components/playlist-table.svelte'
  import type { SpotifyPlaylist, SpotifyTrack } from '$lib/spotify-api'
  import type { ArchivedPlaylistVersion } from '$lib/utils'

  let playlist = $derived<SpotifyPlaylist>($page.data.playlist)
  let tracks = $derived<Promise<SpotifyTrack[]>>($page.data.tracks)
  let archivedVersions = $derived<Promise<ArchivedPlaylistVersion[]>>($page.data.archivedVersions)

  async function archivePlaylist() {
    await fetch(`/api/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(`${$page.data.userId}:${$page.data.userHash}`)
      },
      body: JSON.stringify({
        playlist: {
          id: playlist.id,
          name: playlist.name,
          tracks: (await tracks).map(track => track.id).filter(Boolean)
        }
      })
    })
  }
</script>

<header class="px-4 py-2 flex justify-between items-center bg-primary-500 text-surface-50">
  <a href="/" class="btn-icon">
    <Icon name="home" />
  </a>

  <h1 class="h5">Spotify Archiver</h1>

  <button
    class="btn preset-filled-primary-500"
    onclick={archivePlaylist}
  >
    Archive
  </button>
</header>

<main class="p-4 max-w-screen-xl mx-auto flex flex-col gap-4">
  <PlaylistHeader
    {playlist}
    {tracks}
  />

  <PlaylistTable {tracks} />

  {#await archivedVersions then versions}
    {#if versions.length > 0}
      <h2 class="h6">Archived versions of {playlist.name}</h2>
      <ul>
        {#each versions as version}
          <li>
            <a
              href={`/playlist/${playlist.id}/${version.timestamp}`}
              class="underline decoration-dashed"
            >
              {new Date(version.timestamp).toDateString()}
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  {:catch error}
    <p>Error loading archived versions of {playlist.name}:<br>"{error.message}"</p>
  {/await}
</main>

<style>
  a {
    text-decoration-color: color-mix(in srgb, currentColor, transparent);
  }
  a:hover {
    text-decoration-color: unset;
  }
</style>
