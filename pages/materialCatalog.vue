<template>
  <main class="catalog-wrapper">
    <div class="filters-wrapper">
      <div class="sample-count">{{ sampleCount }} SAMPLES</div>
      <FilterSet v-model="filters.tags" title="Tags" :options="allTags" />
    </div>
    <div class="sample-grid">
      <SampleCard
        v-for="sample in samples"
        :key="sample.id"
        :sid="sample.id"
        type="sample"
        :title="sample.title"
        :hero-image="sample.image"
        :tags="sample.tags"
        :description="sample.description"
        :authors="sample.author"
      />
    </div>
  </main>
</template>

<script>
export default {
  name: 'MaterialCatalog',
  data: () => {
    return {
      // lets move these to the sample store once that gets updated
      filters: {
        tags: [],
      },
    }
  },
  computed: {
    samples() {
      return this.$store.state.samples.samples
    },
    sampleCount() {
      return this.samples.length
    },
    allTags() {
      return [...new Set(this.samples.map((s) => s.tags.split(',')).flat(1))]
    },
  },
}
</script>

<style scoped>
.filters-wrapper {
  flex-shrink: 0;
  width: var(--card-width);
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: var(--padding);
  border-right: 1px var(--border-light) solid;
  font-family: var(--roboto);
}
.sample-count {
  font-size: 0.875rem;
  font-weight: 400;
  padding-bottom: var(--padding);
  border-bottom: 1px var(--border-light) solid;
}
.sample-grid {
  flex-grow: 1;
  padding: var(--padding);
  align-content: flex-start;
  display: grid;
  grid-gap: var(--padding);
  grid-template-columns: repeat(auto-fill, var(--card-width));
  overflow-y: auto;
}
</style>
