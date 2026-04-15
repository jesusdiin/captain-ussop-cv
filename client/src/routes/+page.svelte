<script lang="ts">
  import AppHeader from "$lib/components/AppHeader.svelte";
  import ExampleCards from "$lib/components/ExampleCards.svelte";
  import ExaggerationInput from "$lib/components/ExaggerationInput.svelte";
  import ExaggerationResult from "$lib/components/ExaggerationResult.svelte";
  import { exaggerate, type ExaggerationStyles } from "$lib/api";

  let exaggerations = $state<ExaggerationStyles | null>(null);
  let isLoading = $state(false);
  let error = $state<string | null>(null);

  async function handleSubmit(description: string) {
    isLoading = true;
    error = null;
    exaggerations = null;
    try {
      exaggerations = await exaggerate(description);
    } catch (e) {
      error = (e as Error).message;
    } finally {
      isLoading = false;
    }
  }
</script>

<AppHeader />

<div class="space-y-8">
  <ExaggerationInput onsubmit={handleSubmit} disabled={isLoading} />
  <ExaggerationResult {exaggerations} {isLoading} {error} />
  <ExampleCards />
</div>
