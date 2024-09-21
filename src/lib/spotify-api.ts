export const SPOTIFY_API_SCOPE = 'playlist-read-private playlist-read-collaborative user-library-read user-read-email user-read-private'

export async function getOwnProfile(accessToken: string, fetch = globalThis.fetch): Promise<SpotifyUser> {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: { Authorization: 'Bearer ' + accessToken }
  })
  return await response.json() as SpotifyUser
}

export async function getPlaylists(
  accessToken: string, fetch = globalThis.fetch, acc: SpotifyPlaylist[] = []
): Promise<SpotifyPlaylist[]> {
  const response = await fetch(
    `https://api.spotify.com/v1/me/playlists?limit=50&offset=${acc.length}`,
    { headers: { Authorization: 'Bearer ' + accessToken } }
  )
  const data = await response.json() as SpotifyGetPlaylistsResponse
  acc.push(...data.items)
  if (data.next) return await getPlaylists(accessToken, fetch, acc)
  return acc
}

export async function getPlaylistTracks(
  accessToken: string, playlistId: string, fetch = globalThis.fetch, acc: SpotifyTrack[] = []
): Promise<SpotifyTrack[]> {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=50&offset=${acc.length}`,
    { headers: { Authorization: 'Bearer ' + accessToken } }
  )
  const data = await response.json() as SpotifyGetPlaylistTracksResponse
  acc.push(...data.items.map(item => item.track))
  if (data.next) return await getPlaylistTracks(accessToken, playlistId, fetch, acc)
  return acc
}

export interface SpotifyAuthData {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token: string
  scope: string
}

export interface SpotifyAuthDataWithExpires extends SpotifyAuthData {
  expires: number
}

interface SpotifyGetPlaylistsResponse {
  href: string
  items: SpotifyPlaylist[]
  limit: number
  next: string | null
  offset: number
  previous: string | null
  total: number
}

export interface SpotifyPlaylist {
  collaborative: boolean
  description: string | null
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: {
    height: number | null
    url: string
    width: number | null
  }[]
  name: string
  owner: SpotifyUser
  public: boolean | null
  snapshot_id: string
  tracks: {
    href: string
    total: number
  }
  type: 'playlist'
  uri: string
}

export interface SpotifyGetPlaylistTracksResponse {
  href: string
  items: SpotifyPlaylistTrack[]
  limit: number
  next: string | null
  offset: number
  previous: string | null
  total: number
}

export interface SpotifyPlaylistTrack {
  added_at: string
  added_by: SpotifyUserSimple
  is_local: boolean
  primary_color: string | null
  track: SpotifyTrack
}

export interface SpotifyTrack {
  album: SpotifyAlbum
  artists: SpotifyArtist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: {
    isrc: string
    ean: string
    upc: string
  }
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: string | null
  restrictions?: {
    reason: 'explicit' | 'market' | 'product'
  }
  track_number: number
  type: 'track'
  uri: string
}

export interface SpotifyAlbum {
  album_type: 'album' | 'single' | 'compilation'
  artists: SpotifyArtist[]
  available_markets: string[]
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: {
    height: number | null
    url: string
    width: number | null
  }[]
  name: string
  release_date: string
  release_date_precision: 'year' | 'month' | 'day'
  total_tracks: number
  type: 'album'
  uri: string
}

export interface SpotifyArtist {
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  name: string
  type: 'artist'
  uri: string
}

export interface SpotifyUserSimple {
  display_name: string | null
  external_urls: {
    spotify: string
  }
  followers: {
    href: string | null
    total: number
  }
  href: string
  id: string
  type: 'user'
  uri: string
}

export interface SpotifyUser extends SpotifyUserSimple {
  country: string
  email: string
  explicit_content: {
    filter_enabled: boolean
    filter_locked: boolean
  }
  images: {
    height: number | null
    url: string
    width: number | null
  }[]
  product: 'free' | 'open' | 'premium'
}
