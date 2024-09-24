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

<header class="px-4 py-2 flex justify-between items-center preset-filled-primary-500">
  <h1 class="h5">Spotify Archiver</h1>

  {#if $page.data.accessToken}
    <button
      class="btn preset-filled-primary-400-600"
      onclick={logOut}
    >
      Log out
    </button>
  {/if}
</header>

<main class="flex flex-col gap-2 p-2">
  <h2 class="h6">Your playlists</h2>
  {#if $page.data.accessToken}
    <ul class="flex flex-col gap-2">
      {#each $page.data.playlists as playlist}
        <li>
          <a
            href="/playlist/{playlist.id}"
            class="btn"
          >
            {playlist.name}
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <p>
      <a
        href={loginLink}
        class="btn preset-filled-primary-500"
      >
        Log in to Spotify to get started.
      </a>
    </p>
  {/if}
</main>
