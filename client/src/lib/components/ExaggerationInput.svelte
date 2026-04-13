<script lang="ts">
  interface Props {
    onsubmit: (description: string) => void;
    disabled?: boolean;
  }

  let { onsubmit, disabled = false }: Props = $props();
  let description = $state("");

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (description.trim() && !disabled) {
      onsubmit(description.trim());
    }
  }
</script>

<form onsubmit={handleSubmit} class="space-y-4">
  <label for="description" class="block text-sm font-medium text-gray-300">
    Describe tu logro humilde
  </label>
  <textarea
    id="description"
    bind:value={description}
    placeholder="Ej: Hice una presentación en PowerPoint..."
    maxlength={500}
    rows={3}
    class="w-full rounded-xl border border-gray-600 bg-gray-800 px-4 py-3 text-gray-100 placeholder-gray-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
  ></textarea>
  <div class="flex items-center justify-between">
    <span class="text-xs text-gray-500">{description.length}/500</span>
    <button
      type="submit"
      disabled={disabled || !description.trim()}
      class="rounded-xl bg-amber-500 px-6 py-2.5 font-semibold text-gray-900 transition hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {#if disabled}
        Exagerando...
      {:else}
        Exagerar
      {/if}
    </button>
  </div>
</form>
