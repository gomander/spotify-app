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

<header class="px-4 py-2 flex justify-between items-center preset-filled-primary-500">
  <a
    href="/"
    class="btn-icon preset-filled-primary-400-600"
    title="Home"
    aria-label="Home"
  >
    <Icon name="home" />
  </a>

  <h1 class="h5">Spotify Archiver</h1>

  <button
    class="btn preset-filled-primary-400-600"
    onclick={archivePlaylist}
  >
    Archive
  </button>
</header>

<main class="px-4 py-2 flex flex-col gap-2">
  <PlaylistHeader
    playlist={$page.data.playlist}
    tracks={$page.data.tracks}
  />

  <PlaylistTable tracks={$page.data.tracks} />

  {#await archivedVersions}
    <p>Loading...</p>
  {:then versions}
    {#if versions.length > 0}
      <h2 class="h6">Archived versions</h2>
      <ul class="list-none">
        {#each versions as version}
          <li>
            <a href={`/playlist/${playlist.id}/${version.timestamp}`}>
              {version.timestamp.slice(0, 10)}
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  {:catch error}
    <p>Error: {error.message}</p>
  {/await}
</main>
