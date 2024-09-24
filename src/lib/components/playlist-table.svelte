<script lang="ts">
  import Icon from '$lib/components/icon.svelte'
  import type { SpotifyTrack } from '$lib/spotify-api'

  let { trackActions, tracks }: {
    trackActions?: { name: string, icon: any, action: (track: SpotifyTrack) => void }[]
    tracks: SpotifyTrack[] | Promise<SpotifyTrack[]>
  } = $props()

  function getDurationStringFromMs(ms: number) {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
</script>

<table class="table w-full">
  <thead>
    <tr>
      <th>#</th>
      <th></th>
      <th>Name</th>
      <th class="hidden sm:table-cell">Artists</th>
      <th class="hidden lg:table-cell">Album</th>
      <th class="hidden md:table-cell">Duration</th>
      {#if trackActions?.length}
        <th></th>
      {/if}
    </tr>
  </thead>

  <tbody>
    {#await tracks}
      <tr>
        <td colspan="6">Loading...</td>
      </tr>
    {:then tracks}
      {#each tracks as track, i (track.id)}
        <tr>
          <td>{i + 1}</td>

          <td class="min-w-16">
            <img
              src={track.album.images[0]?.url}
              alt=""
              class="w-12 h-12 rounded-md"
            >
          </td>

          <td>
            <a
              href={track.external_urls.spotify}
              target="_blank"
              class="underline decoration-dashed"
            >
              {track.name}
            </a>
          </td>

          <td class="hidden sm:table-cell">
            {#each track.artists as artist, i}
              {#if i > 0},{/if}
              <a
                href={artist.external_urls.spotify}
                target="_blank"
                class="underline decoration-dashed"
              >
                {artist.name}
              </a>
            {/each}
          </td>

          <td class="hidden lg:table-cell">
            <a
              href={track.album.external_urls.spotify}
              target="_blank"
              class="underline decoration-dashed"
            >
              {track.album.name}
            </a>
          </td>

          <td class="text-right hidden md:table-cell">
            {getDurationStringFromMs(track.duration_ms)}
          </td>

          <td>
            {#each trackActions || [] as action}
              <button
                class="btn-icon hover:preset-tonal-primary rounded-full"
                onclick={() => action.action(track)}
                aria-label={action.name}
              >
                <Icon name={action.icon} />
              </button>
            {/each}
          </td>
        </tr>
      {/each}
    {:catch error}
      <tr>
        <td colspan="6">Error loading tracks: "{error.message}"</td>
      </tr>
    {/await}
  </tbody>
</table>

<style>
  a {
    text-decoration-color: color-mix(in srgb, currentColor, transparent);
  }
  a:hover {
    text-decoration-color: unset;
  }
</style>
