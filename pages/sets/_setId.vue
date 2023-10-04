<!-- 
this is a dynamicly generated page to display a single set based on the URL route
that lives at /sets/{{setId}} (this structure is based on the directory structure of this pages/ folder)
it can be called from any component with the following:
<NuxtLink v-if="set" :to="'/sets/'+set.id"> view set </NuxtLink>
this page will then access the set from our store using the passed in setID, and programatically display the set or project
 -->

<template>
  <main
    class="set-wrapper"
    :style="{
      backgroundImage: `url(/images/background/${project.pageBackground})`,
    }"
  >
    <div class="top-section">
      <div class="information" :class="{ black: project.type === 'set' }">
        <div class="header">
          {{ project.title }}
          <a :href="project.external_link" target="_blank">
            <img src="~/static/ui-elements/prototype-large.svg" />
          </a>
        </div>

        <span v-if="project.date">
          {{ project.date }}
        </span>

        <div v-if="parents.length" class="parents">
          Part of:
          <NuxtLink
            v-for="parent in parents"
            :key="parent.id"
            :to="'/sets/' + parent.id"
          >
            {{ parent.title }}
          </NuxtLink>
        </div>

        <div class="description" :class="{ black: project.type === 'set' }">
          {{ project.description }}
        </div>
      </div>
      <ImageCarousel :images="project.heroImages" />
    </div>

    <div v-if="children.length" class="sample-carousel">
      <h2 :class="{ black: project.type === 'set' }">SAMPLES</h2>
      <div class="children">
        <SampleCard
          v-for="(card, i) in children"
          :key="i"
          :sid="card.id"
          :type="card.type"
          :title="card.title"
          :hero-image="card.heroImages[0]"
          :tags="card.tags"
          :description="card.description"
          :authors="card.author"
          :background-image="card.type === 'project' ? card.background : null"
          :prototype-link="card.external_link"
        />
      </div>
    </div>

    <div v-if="project.researchQuestions.length" class="questions">
      <h3
        v-for="q in project.researchQuestions"
        :key="q"
        :class="{ black: project.type === 'set' }"
      >
        {{ q }}
      </h3>
    </div>

    <div v-if="project.processImages.length" class="process black">
      <h2 class="black">PROCESS</h2>
      <div class="process-images">
        <img
          v-for="img in project.processImages"
          :key="img"
          :src="`/images/projects/${img}`"
          alt=""
          class="process-image"
        />
      </div>
    </div>

    <div class="team black">
      <h2 class="black">TEAM MEMBERS</h2>
      <div class="members">
        <span v-for="name in authors" :key="name">
          {{ name }}
        </span>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  computed: {
    setId() {
      return this.$route.params.setId
    },
    project() {
      return this.$store.getters['samples/getProjectById'](this.setId)
    },
    children() {
      const singles = this.project.singleIds.map((sid) =>
        this.$store.getters['samples/getSampleById'](sid)
      )
      const sets = this.project.setIds.map((sid) =>
        this.$store.getters['samples/getProjectById'](sid)
      )
      const setSingles = []
      sets.forEach((s) => {
        s.singleIds.forEach((sid) => {
          setSingles.push(this.$store.getters['samples/getSampleById'](sid))
        })
      })
      return [...new Set([...singles, ...sets, ...setSingles])]
    },
    authors() {
      return this.project.author.split(',')
    },
    parents() {
      return this.$store.getters['samples/getParentsBySetId'](
        Number(this.setId)
      )
    },
  },
}
</script>

<style scoped>
.set-wrapper {
  padding: var(--padding);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: -1px -1px;
  background-attachment: local;
}

.top-section {
  display: flex;
  flex-direction: row;
}

.information {
  color: white;
  font-family: var(--roboto);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: 400px;
  padding: var(--padding);
  gap: 0.5rem;
}

.header {
  font-family: var(--rajdhani);
  font-size: 32px;
  font-weight: 600;
  color: var(--active-green);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

h2 {
  color: white;
  font-family: var(--rajdhani);
  font-weight: 700;
  font-size: 40px;
}

a img {
  display: flex;
  align-items: center;
}

a:hover {
  opacity: 60%;
}

.questions {
  margin: var(--padding) 0;
  border: 3px solid white;
  border-left: none;
  border-right: none;
}

h3 {
  color: white;
  font-family: var(--rajdhani);
  font-weight: 500;
  font-size: 28px;
}

.description {
  font-family: var(--roboto);
  color: white;
}

.sample-carousel {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.parents {
  display: flex;
  gap: 0.5rem;
  color: white;
  font-family: Roboto;
  font-size: 16px;
  font-style: italic;
  font-weight: 400;
}

.parents a {
  font-style: normal;
  color: var(--active-green);
}

.parents a:hover {
  text-decoration: underline;
}

.children {
  align-self: center;
  width: 90%;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  gap: var(--padding);
  overflow-x: auto;
  height: calc(1.1 * var(--card-height));
}

.process-images {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.process-image {
  height: 500px;
}

.team {
  font-family: var(--roboto);
  font-size: large;
}

.members {
  display: flex;
  gap: 1rem;
}

.black {
  color: black;
}
</style>
