<template>
  <div class="card-wrapper">
    <div class="card-inner" :class="{ flipped }">
      <div
        class="front-side"
        :class="{
          sample: type === 'sample',
          project: type === 'project',
        }"
        :style="{ backgroundImage: background }"
      >
        <div class="tags">
          <div
            v-for="tag in splitTags"
            :key="tag"
            class="tag"
            :class="{ active: activeTags?.includes(tag) }"
          >
            {{ tag }}
          </div>
        </div>
        <span class="sid">
          {{ paddedId }}
        </span>
        <div class="hero-image" :style="{ backgroundImage: hero }"></div>
        <span class="title">
          {{ title }}
          <NuxtLink v-if="type !== 'sample'" :to="'/sets/' + sid">
            <img src="~/static/ui-elements/link-arrow.svg" alt="" />
          </NuxtLink>
        </span>
        <div class="flip-button-front" @click="flipCard"></div>
      </div>
      <div class="back-side">
        <div class="description-wrapper">
          <div class="header">Description</div>
          <div class="description">
            {{ description }}
          </div>
        </div>

        <div class="parents-wrapper">
          <div class="header">Part of</div>
          <div class="parents">
            <NuxtLink
              v-for="parent in parents"
              :key="parent.id"
              :to="'/sets/' + parent.id"
              class="parent"
            >
              {{ parent.title }}
            </NuxtLink>
          </div>
        </div>

        <div class="authors-wrapper">
          <div class="header">Made by</div>
          <div class="authors">
            <span v-for="author in splitAuthors" :key="author" class="author">
              {{ author }}
            </span>
          </div>
        </div>

        <div class="flip-button-back" @click="flipCard"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SampleCard',
  props: {
    sid: {
      type: Number,
      required: false,
      default: 0,
    },
    type: {
      type: String,
      required: false,
      default: '',
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    heroImage: {
      type: String,
      required: false,
      default: '',
    },
    backgroundImage: {
      type: String,
      required: false,
      default: '',
    },
    description: {
      type: String,
      required: false,
      default: '',
    },
    tags: {
      type: String,
      required: false,
      default: '',
    },
    authors: {
      type: String,
      required: false,
      default: '',
    },
    activeTags: {
      type: Array,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {
      flipped: false,
    }
  },
  computed: {
    splitTags() {
      return this.tags.length ? this.tags.split(',') : []
    },
    splitAuthors() {
      return this.authors.length ? this.authors.split(',') : []
    },
    paddedId() {
      if (this.type === 'project') {
        return '#P' + String(this.sid).padStart(3, '0')
      }
      return '#' + String(this.sid).padStart(4, '0')
    },
    hero() {
      if (this.type === 'sample') {
        return `url(/images/samples/${this.heroImage})`
      } else if (this.type === 'project') {
        return `url(/images/projects/${this.heroImage})`
      } else {
        return null
      }
    },
    background() {
      if (this.type === 'sample') {
        return null
      } else if (this.type === 'project') {
        return `url(/images/background/${this.backgroundImage})`
      } else {
        return null
      }
    },
    parents() {
      if (!this.type === 'sample') return []
      return this.$store.getters['samples/getParentsBySampleId'](this.sid)
    },
  },
  methods: {
    flipCard() {
      this.flipped = !this.flipped
    },
  },
}
</script>

<style scoped>
.card-wrapper {
  background-color: transparent;
  width: var(--card-width);
  height: var(--card-height);
  /* perspective: 1000px; 3d effect */
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
}

.card-inner.flipped {
  transform: rotateY(180deg);
}

.front-side,
.back-side {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0 10px;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  overflow: hidden;
}

.front-side {
  background: #f1f1f1;
  background-size: cover;
  background-repeat: no-repeat;
}

.front-side.sample {
  color: var(--text-dark);
}

.front-side.project {
  color: var(--text-light);
}

.tags {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
  height: 32px;
  padding-bottom: 16px;
  overflow-x: hidden;
  color: var(--text-dark);
}

.tag {
  text-transform: capitalize;
  white-space: nowrap;
  padding: 0 10px;
  font-family: var(--roboto);
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 1.2px;
  background: white;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
}

.tag.active {
  background: var(--active-green);
}

.sid {
  font-family: Roboto;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 1.2px;
}

.hero-image {
  background: #c4c4c4;
  width: 250px;
  height: 190px;
  margin: 6px 0;
  flex-shrink: 0;
  background-size: cover;
  background-repeat: no-repeat;
}

.title {
  display: flex;
  gap: 6px;
  font-family: var(--rajdhani);
  font-size: 1.25rem;
  font-weight: 600;
  line-height-step: 50%;
}

a {
  display: flex;
  align-content: center;
}

.back-side {
  background-color: black;
  color: white;
  transform: rotateY(180deg);
  font-family: var(--roboto);
  font-size: 0.75rem;
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.header {
  width: 100%;
  font-size: 0.875rem;
  font-weight: 700;
  border-bottom: 1px white solid;
  padding: 0.25rem 0;
}

.description {
  padding: 0.25rem 0;
  max-height: 4rem;
  overflow-y: auto;
}

.parents {
  padding: 0.25rem 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.parent {
  white-space: nowrap;
  padding: 2px 6px;
  font-family: var(--roboto);
  font-size: 0.75rem;
  font-weight: 300;
  background: var(--active-green);
  color: black;
}

.authors {
  padding: 0.25rem 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.flip-button-front {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 30px 30px;
  border-color: transparent transparent var(--grid-bg) transparent;
  bottom: 0;
  right: 0;
  position: absolute;
  cursor: pointer;
}

.flip-button-back {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 30px 30px 0;
  border-color: transparent transparent var(--grid-bg) transparent;
  bottom: 0;
  left: 0;
  position: absolute;
  cursor: pointer;
}
</style>
