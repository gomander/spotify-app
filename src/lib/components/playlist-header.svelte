<script lang="ts">
  import type { SpotifyPlaylist, SpotifyTrack } from '$lib/spotify-api'

  let { playlist, tracks }: {
    playlist: SpotifyPlaylist
    tracks?: SpotifyTrack[] | Promise<SpotifyTrack[]>
  } = $props()

  function getTotalDuration(tracks: SpotifyTrack[]) {
    const ms = tracks.reduce((acc, track) => acc + track.duration_ms, 0)
    const totalMinutes = Math.floor(ms / 1000 / 60)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    return `${hours}h ${minutes}m`
  }
</script>

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

    {#if tracks}
      <p class="whitespace-nowrap">
        <strong>Duration:</strong>
        {#await tracks}
          Loading...
        {:then tracks}
          {getTotalDuration(tracks)}
        {:catch}
          unknown
        {/await}
      </p>
    {/if}

    <p class="whitespace-nowrap">
      {playlist.public ? 'Public' : 'Private'} playlist
    </p>
  </div>
</section>
