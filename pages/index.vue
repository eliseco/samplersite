<template>
  <main class="homepage-wrapper">
    <div class="welcome-header">
      <span class="header"> welcome </span>
      <span class="shuffle" @click="getRandomCards">shuffle cards</span>
    </div>
    <div class="card-shuffle">
      <SampleCard
        v-for="(card, i) in cards"
        :key="i"
        :sid="card.id"
        :type="card.type"
        :title="card.title"
        :hero-image="card.heroImages[0]"
        :tags="card.tags"
        :description="card.description"
        :authors="card.author"
        :background-image="card.type === 'project' ? card.background : null"
      />
    </div>
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  data: () => {
    return {
      cards: [],
    }
  },

  mounted() {
    this.getRandomCards()
  },

  methods: {
    getRandomCards() {
      this.cards = this.$store.getters['samples/getRandomCards'](3)
    },
  },
}
</script>

<style scoped>
.homepage-wrapper {
  font-family: var(--roboto);
  padding: var(--padding);
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
}

.header {
  font-size: 36px;
}

.welcome-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.shuffle {
  width: fit-content;
  display: flex;
  padding: 4px 8px;
  background: var(--active-green);
  outline: 1px solid black;
  cursor: pointer;
}

.card-shuffle {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
</style>
