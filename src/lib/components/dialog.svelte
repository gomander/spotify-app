<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    open = $bindable(false),
    header,
    content,
    footer,
    width = 'auto',
    onOpen,
    onClose
  }: {
    open: boolean,
    header?: Snippet,
    content: Snippet,
    footer?: Snippet,
    width?: string,
    onOpen?: () => void,
    onClose?: () => void
  } = $props()

  let dialog = $state<HTMLDialogElement>(null!)

  $effect(() => {
    if (open) {
      dialog.showModal()
      onOpen?.()
    } else {
      dialog.close()
      onClose?.()
    }
  })

  function handleClick(e: MouseEvent) {
    if (e.target !== dialog) return
    const { clientX: x, clientY: y } = e
    const { left, right, top, bottom } = dialog.getBoundingClientRect()
    if (x < left || x > right || y < top || y > bottom) open = false
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') open = false
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  onclick={handleClick}
  onkeydown={handleKeyDown}
  bind:this={dialog}
  class="preset-filled-surface-50-950"
  style="width: {width}"
>
  <section class="flex flex-col gap-2">
    {#if header}
      <header class="flex justify-between items-center">
        {@render header()}
      </header>
    {/if}

    <div class="flex flex-col gap-2">
      {@render content()}
    </div>

    {#if footer}
      <footer class="flex gap-2">
        {@render footer()}
      </footer>
    {/if}
  </section>
</dialog>

<style>
  dialog {
    position: fixed;
    inset: 0;
    padding: 0.75rem;
    border-radius: 1rem;
    max-width: calc(100% - 1rem);
    z-index: 30;
  }

  dialog::backdrop {
    background-color: rgba(0 0 0 / 0.5);
  }
</style>
