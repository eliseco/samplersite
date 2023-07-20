<template>
  <main class="catalog-wrapper">
    <div class="filters-wrapper">
      <div class="sample-count">{{ sampleCount }} SAMPLES</div>
      <FilterSet
        v-model="filters.set"
        title="Set"
        :options="['set1', 'set2']"
      />
      <FilterSet
        v-model="filters.project"
        title="Project"
        :options="['project1', 'project2']"
      />
      <FilterSet
        v-model="filters.material"
        title="Material Type"
        :options="['material1', 'material2']"
      />
    </div>
    <div class="sample-grid">
      <SampleCard
        v-for="sample in samples"
        :key="sample.id"
        sid="#AA0001"
        type="sample"
        title="Sample Name"
        :tags="['Tag 1', 'Tag 2']"
        description="This is a description"
        :authors="['Author 1', 'Author 2']"
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
        set: [],
        project: [],
        material: [],
      },
    }
  },
  computed: {
    samples() {
      return this.$store.state.samples.singles
    },
    sampleCount() {
      return this.samples.length
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
  font-size: 24px;
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
