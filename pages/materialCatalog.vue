<template>
  <main class="catalog-wrapper">
    <div class="filters">Filters</div>
    <div class="sample-grid">
      <div v-for="sample in samples" :key="sample.id" class="sample-cell">
        <SampleCard />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'MaterialCatalog',
  data: () => {
    return {}
  },
  computed: {
    samples() {
      return this.$store.state.samples.singles
    },
  },
}
</script>

<style scoped>
.filters {
  flex-shrink: 0;
  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--padding);
  border-right: 1px var(--text) solid;
}

.sample-grid {
  flex-grow: 1;
  align-content: flex-start;
  display: grid;
  gap: 1em;
  padding: var(--padding);
  grid-template-columns: repeat(
    auto-fill,
    minmax(min(var(--card-width), calc(100% - 350px)), 1fr)
  );
  overflow-y: auto;
}

.sample-cell {
  display: flex;
  justify-content: center;
}
</style>
