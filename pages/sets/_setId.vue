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
      <div class="information">
        <div class="header">
          {{ project.title }}
        </div>
        <div class="description">
          {{ project.description }}
        </div>
      </div>
      <ImageCarousel :images="project.heroImages" />
    </div>

    <div class="sample-carousel">
      <h2>SAMPLES</h2>
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
        />
      </div>
    </div>

    <div class="questions">
      <h3 v-for="q in project.researchQuestions" :key="q">
        {{ q }}
      </h3>
    </div>

    <div class="process-images">
      <h2>PROCESS</h2>
    </div>

    <div class="team">
      <h2>TEAM MEMBERS</h2>
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
      return this.project.singleIds.map((sid) =>
        this.$store.getters['samples/getSampleById'](sid)
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
  background-size: cover;
  background-repeat: no-repeat;
  background-position: -1px -1px;
  background-attachment: local;
}

.top-section {
  display: flex;
  flex-direction: row;
}

.information {
  flex-shrink: 0;
  width: 400px;
  padding: var(--padding);
}

.header {
  font-family: var(--rajdhani);
  font-size: 32px;
  font-weight: 600;
  color: var(--active-green);
}

h2 {
  color: white;
  font-family: var(--rajdhani);
  font-weight: 700;
  font-size: 40px;
}

h3 {
  color: white;
  font-family: var(--rajdhani);
  font-weight: 700;
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
</style>
