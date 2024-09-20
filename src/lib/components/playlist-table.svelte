<script lang="ts">
  import Icon from '$lib/components/icon.svelte'
  import type { SpotifyPlaylist, SpotifyTrack } from '$lib/spotify-api'

  let { playlist, trackActions, tracks }: {
    playlist?: SpotifyPlaylist
    trackActions?: { name: string, icon: any, action: (track: SpotifyTrack) => void }[]
    tracks: SpotifyTrack[]
  } = $props()

  function getDurationStringFromMs(ms: number) {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  function getTotalDuration() {
    const ms = tracks.reduce((acc, track) => acc + track.duration_ms, 0)
    const totalMinutes = Math.floor(ms / 1000 / 60)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return `${hours}h ${minutes}m`
  }
</script>

<div class="flex flex-col gap-2">
  {#if playlist}
    <section class="flex gap-4">
      <img
        src={playlist.images[0]?.url}
        alt=""
        class="w-32 h-32 rounded-md"
      >

      <div>
        <h2 class="h4">{playlist.name}</h2>

        <p>
          <a
            href={playlist.external_urls.spotify}
            target="_blank"
            class="underline decoration-dashed"
          >
            Open in Spotify
          </a>
        </p>

        <p>{playlist.description}</p>
      </div>

      <div>
        <p class="whitespace-nowrap">
          <strong>Owner:</strong>
          <a
            href={playlist.owner.external_urls.spotify}
            target="_blank"
            class="underline decoration-dashed"
          >
            {playlist.owner.display_name}
          </a>
        </p>

        <p class="whitespace-nowrap">
          <strong>Tracks:</strong> {playlist.tracks.total}
        </p>

        <p class="whitespace-nowrap">
          <strong>Duration:</strong> {getTotalDuration()}
        </p>

        <p class="whitespace-nowrap">
          {playlist.public ? 'Public' : 'Private'} playlist
        </p>
      </div>
    </section>
  {/if}

  <table class="table">
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
    </tbody>
  </table>
</div>

<style>
  a {
    text-decoration-color: color-mix(in srgb, currentColor, transparent);
  }
  a:hover {
    text-decoration-color: unset;
  }
</style>
