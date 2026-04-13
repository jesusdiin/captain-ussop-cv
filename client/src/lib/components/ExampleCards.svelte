<script lang="ts">
  const examples = [
    {
      before: "Moví una caja de un cuarto a otro",
      after: "Lideré operaciones logísticas cross-funcionales, optimizando la redistribución de activos físicos estratégicos.",
    },
    {
      before: "Respondí emails",
      after: "Gestioné comunicaciones ejecutivas de alto impacto con stakeholders clave a nivel global.",
    },
    {
      before: "Arreglé un bug",
      after: "Resolví una vulnerabilidad crítica en producción que amenazaba la continuidad del negocio, salvando millones en ingresos potenciales.",
    },
  ];
</script>

<section class="space-y-4">
  <h2 class="text-sm font-semibold uppercase tracking-wider text-gray-500">Ejemplos</h2>
  {#each examples as example}
    <div class="rounded-xl border border-gray-700 bg-gray-800/50 p-4 space-y-2">
      <p class="text-sm text-gray-400">
        <span class="font-medium text-gray-300">Antes:</span> {example.before}
      </p>
      <p class="text-sm text-amber-400">
        <span class="font-medium text-amber-300">Después:</span> {example.after}
      </p>
    </div>
  {/each}
</section>
