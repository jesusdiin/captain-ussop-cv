<script lang="ts">
  import "../app.css";
  import favicon from "$lib/assets/favicon.svg";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Captain Ussop CV</title>
</svelte:head>

<div class="min-h-screen bg-gray-900 text-gray-100">
  <main class="mx-auto max-w-lg px-4 pb-12">
    {@render children()}
  </main>
</div>
