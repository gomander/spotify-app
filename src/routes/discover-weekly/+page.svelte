<script lang="ts">
  import { page } from '$app/stores'
</script>

<h1>Discover Weekly</h1>

<ul>
  {#each $page.data.discoverWeeklyTracks as track}
    <li>{track.name}</li>
  {/each}
</ul>
