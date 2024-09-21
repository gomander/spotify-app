<script lang="ts">
  import { page } from '$app/stores'
  import { SPOTIFY_API_SCOPE } from '$lib/spotify-api'
  import { PUBLIC_CLIENT_ID, PUBLIC_REDIRECT_URL } from '$env/static/public'

  const authState = crypto.randomUUID()
  localStorage.setItem('spotify_auth_state', authState)
  const loginLink = `https://accounts.spotify.com/authorize?${
    new URLSearchParams({
      response_type: 'code',
      client_id: PUBLIC_CLIENT_ID,
      scope: SPOTIFY_API_SCOPE,
      redirect_uri: PUBLIC_REDIRECT_URL,
      state: authState
    })
  }`

  function logOut() {
    localStorage.removeItem('spotify_auth_state')
    localStorage.removeItem('spotify_auth')
    window.location.reload()
  }
</script>

<main class="flex flex-col gap-2 p-2">
  <h1 class="text-2xl">Spotify Playlist Manager</h1>

  {#if $page.data.accessToken}
    <p>Logged in</p>
    <button class="btn preset-filled" onclick={logOut}>Log out</button>
    <ul>
      {#each $page.data.playlists as playlist}
        <li><a href="/playlist/{playlist.id}">{playlist.name}</a></li>
      {/each}
    </ul>
  {:else}
    <p><a href={loginLink}>Log in to Spotify to get started.</a></p>
  {/if}
</main>
