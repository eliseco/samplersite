<template>
  <main class="homepage-wrapper">
    <div class="card-grid">
      <SampleCard :random-background="1" />
      <div class="wide-card">
        <h1>SAMPLER</h1>
        <h4>
          is an ongoing research initiative led by Elise Co, investigating
          questions of materiality through collaborative making.
        </h4>
        <h4>
          Inspired by needlework samplers, textile sample books, and “sampling”
          as a creative strategy, this website is a system for documenting,
          reflecting on, and re-mixing SAMPLER.
        </h4>
      </div>
      <SampleCard :random-background="2" />
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
      <div class="wide-card">
        <h2>SAMPLES</h2>
        <p>
          From the Oxford English Dictionary, a sample is “a small part or
          quantity intended to show what the whole is like.” Like a prototype
          (another crucial part of Elise Co practice), a sample is never the
          final thing. In fact, it retains the potential to become or represent
          one of many possible “final things.” A small square of black leather
          may be the sample for a combat boot, or a luxury car interior, or an
          evening purse. It is all of them.
        </p>
        <p>
          It is a small piece of design+making that both demonstrates (displays)
          and provides an opportunity to try (learn) an idea or technique.
        </p>
        <p>
          On this website, “sample cards” represent discrete pieces of making.
          Click the corner of the card to see more information, including the
          projects and sets the sample is a part of.
        </p>
      </div>
      <SampleCard
        v-if="project"
        :sid="project.id"
        :type="project.type"
        :title="project.title"
        :hero-image="project.heroImages[0]"
        :tags="project.tags"
        :description="project.description"
        :authors="project.author"
        :background-image="
          project.type === 'project' ? project.background : null
        "
      />
      <div class="wide-card">
        <h2>PROJECTS</h2>
        <p>
          SAMPLER includes multiple projects, each with its own
          question/brief/hypothesis and set of designed and produced outcomes,
          among them: mechanical devices, textiles, software and interactive
          digital prototypes.
        </p>
        <p>
          Each project begins with a question. Even when there is a specific
          idea about what to make, the purpose of the project is never just to
          make it; it's to ask, “What happens if we try to make X?”
        </p>
        <p>
          On this website, each project has its own page, which includes
          research questions and the samples (represented by the card format)
          that were produced to interrogate those questions. Projects also have
          “card” representations; clicking the green arrow next to the project
          title will open the full project page.
        </p>
      </div>
      <SampleCard :random-background="4" />
      <div class="wide-card">
        <h2>SETS</h2>
        <p>
          While each project is discrete, many are interconnected, riffing on
          similar themes or picking up the literal or conceptual threads of
          another. These relationships are visible through shared samples across
          the projects, as well as through groupings called Sets. Sets may
          consist of any combination of samples, projects, or other sets.
        </p>
        <p>
          On this website, each set has its own page, which includes samples and
          projects that are conceptually related to each other. Sets also have
          “card” representations; clicking the green arrow next to the set title
          will open the full set page.
        </p>
      </div>
      <SampleCard
        v-if="set"
        :sid="set.id"
        :type="set.type"
        :title="set.title"
        :hero-image="set.heroImages[0]"
        :tags="set.tags"
        :description="set.description"
        :authors="set.author"
        :background-image="set.type === 'project' ? set.background : null"
      />
      <SampleCard :random-background="5" />
      <div class="wide-card">
        <NuxtLink to="/materialCatalog">
          <h2>CATALOG</h2>
        </NuxtLink>
        <p>The Catalog is a space to browse all samples, projects, and sets.</p>
        <p>
          In the Catalog, filters on the left allow for custom curation of cards
          based on tags. Checking the boxes next to the filters will show only
          cards associated with those tags.
        </p>
      </div>
      <SampleCard :random-background="3" />
    </div>
  </main>
</template>

<script>
export default {
  name: 'HomePage',
  data: () => {
    return {
      cards: [],
      project: null,
      set: null,
    }
  },
  mounted() {
    this.getRandomCards()
    this.getProject()
    this.getSet()
  },
  methods: {
    getRandomCards() {
      this.cards = this.$store.getters['samples/getRandomCards'](2)
    },
    getProject() {
      this.project = this.$store.getters['samples/getRandomProject']()
    },
    getSet() {
      this.set = this.$store.getters['samples/getRandomSet']()
    },
  },
}
</script>

<style scoped>
.homepage-wrapper {
  font-family: var(--roboto);
  gap: 2rem;
  background: url('static/images/background/sampler-wavy.png');
  background-repeat: no-repeat;
  background-position: top var(--padding) left var(--padding);
  background-size: 40%;
  overflow-y: auto;
}

.wide-card {
  width: calc(2 * var(--card-width) + var(--padding));
  height: var(--card-height);
  background: linear-gradient(
    315deg,
    transparent 30px,
    var(--active-green) 30px
  );
  padding: var(--padding);
}

h1 {
  text-align: center;
  margin: 0;
  font-size: 64px;
  font-weight: 300;
  font-family: var(--righteous);
}

h2 {
  margin: 0;
  font-size: 32px;
  font-family: var(--rajdhani);
}

h4 {
  font-family: var(--roboto);
  font-size: 16px;
  font-weight: 400;
  text-align: center;
}

p {
  font-family: var(--roboto);
  font-size: 14px;
  text-align: left;
}

.card-grid {
  padding: var(--padding);
  margin-left: var(--card-width);
  display: flex;
  flex-wrap: wrap;
  gap: var(--padding);
  height: min-content;
}

a {
  text-decoration: underline;
}

a:hover {
  color: white;
}
</style>
