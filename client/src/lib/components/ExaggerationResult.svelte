<script lang="ts">
  interface Props {
    result: string;
    isLoading: boolean;
    error: string | null;
  }

  let { result, isLoading, error }: Props = $props();
  let copied = $state(false);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(result);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }
</script>

{#if isLoading}
  <div class="rounded-xl border border-gray-700 bg-gray-800/50 p-6 animate-pulse">
    <div class="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
    <div class="h-4 bg-gray-700 rounded w-full mb-3"></div>
    <div class="h-4 bg-gray-700 rounded w-5/6"></div>
  </div>
{:else if error}
  <div class="rounded-xl border border-red-800 bg-red-900/20 p-6">
    <p class="text-red-400 text-sm">{error}</p>
  </div>
{:else if result}
  <div class="rounded-xl border border-amber-700 bg-amber-900/20 p-6 space-y-4">
    <p class="text-amber-100 leading-relaxed">{result}</p>
    <button
      onclick={copyToClipboard}
      class="text-sm text-amber-400 hover:text-amber-300 transition"
    >
      {#if copied}
        Copiado!
      {:else}
        Copiar al clipboard
      {/if}
    </button>
  </div>
{/if}
