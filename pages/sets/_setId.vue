<!-- 
this is a dynamicly generated page to display a single set based on the URL route
that lives at /sets/{{setId}} (this structure is based on the directory structure of this pages/ folder)
it can be called from any component with the following:
<NuxtLink v-if="set" :to="'/sets/'+set.id"> view set </NuxtLink>
this page will then access the set from our store using the passed in setID, and programatically display the set or project
 -->

<template>
  <main class="set-wrapper">
    <div class="header">
      {{ project.title }}
    </div>
    <div class="description">
      {{ project.description }}
    </div>
    <div class="hero-images">
      <div
        v-for="image in project.heroImages"
        :key="image"
        class="hero-image"
        :style="{ backgroundImage: `url(/images/projects/${image})` }"
      />
    </div>

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
  gap: var(--padding);
  overflow-y: auto;
}

.header {
  font-family: var(--rajdhani);
  font-size: 32px;
  font-weight: 600;
}

.hero-images {
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: var(--padding);
}

.hero-image {
  flex-shrink: 0;
  height: 400px;
  width: 600px;
  background-size: cover;
  background-repeat: no-repeat;
}

.description {
  font-family: var(--roboto);
}

.children {
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  gap: var(--padding);
  overflow-x: auto;
}
</style>
