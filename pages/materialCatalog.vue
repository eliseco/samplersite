<template>
  <main class="catalog-wrapper">
    <div class="filters-wrapper">
      <div class="card-count">
        <span v-if="filters.tags.length"> {{ filteredCards.length }} / </span>
        {{ totalCardCount }} SAMPLES
      </div>
      <FilterSet v-model="filters.tags" title="Tags" :options="allTags" />
    </div>
    <div class="sample-grid">
      <SampleCard
        v-for="(card, i) in filteredCards"
        :key="i"
        :sid="card.id"
        :type="card.type"
        :title="card.title"
        :hero-image="card.heroImages[0]"
        :tags="card.tags"
        :description="card.description"
        :authors="card.author"
        :background-image="card.type === 'project' ? card.background : null"
        :active-tags="activeTags"
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
    allCards() {
      return this.$store.getters['samples/getAllCards']
    },
    totalCardCount() {
      return this.allCards.length
    },
    allTags() {
      return [...new Set(this.allCards.map((s) => s.tags.split(',')).flat(1))]
    },
    filteredCards() {
      if (!this.filters.tags.length) return this.allCards
      const cards = []
      this.filters.tags.forEach((tag) => {
        this.allCards.forEach((card) => {
          if (card.tags.split(',').includes(tag)) {
            cards.push(card)
          }
        })
      })
      return [...new Set(cards)]
    },
    activeTags() {
      return this.filters.tags
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
