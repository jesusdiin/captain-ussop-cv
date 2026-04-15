<script lang="ts">
  import type { ExaggerationStyles } from "$lib/api";

  type StyleKey = keyof ExaggerationStyles;

  interface Props {
    exaggerations: ExaggerationStyles | null;
    isLoading: boolean;
    error: string | null;
  }

  const tabs: { key: StyleKey; label: string; level: number }[] = [
    { key: "basico", label: "Básico", level: 2 },
    { key: "corporativo", label: "Corporativo", level: 5 },
    { key: "mamador", label: "Mamador", level: 8 },
    { key: "consultor_mckinsey", label: "McKinsey", level: 10 },
  ];

  let { exaggerations, isLoading, error }: Props = $props();
  let activeTab = $state<StyleKey>("corporativo");
  let copied = $state(false);

  const activeText = $derived(
    exaggerations ? exaggerations[activeTab] : ""
  );

  async function copyToClipboard() {
    if (!activeText) return;
    await navigator.clipboard.writeText(activeText);
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
{:else if exaggerations}
  <div class="space-y-3">
    <div class="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
      {#each tabs as tab (tab.key)}
        {@const isActive = tab.key === activeTab}
        <button
          type="button"
          onclick={() => (activeTab = tab.key)}
          class="shrink-0 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition border {isActive
            ? 'bg-amber-500 border-amber-500 text-gray-900'
            : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500'}"
        >
          <span>{tab.label}</span>
          <span
            class="rounded-full px-2 py-0.5 text-xs font-semibold {isActive
              ? 'bg-gray-900/20 text-gray-900'
              : 'bg-gray-700 text-gray-400'}"
          >
            {tab.level}/10
          </span>
        </button>
      {/each}
    </div>

    <div class="rounded-xl border border-amber-700 bg-amber-900/20 p-6 space-y-4">
      <p class="text-amber-100 leading-relaxed">{activeText}</p>
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
  </div>
{/if}
