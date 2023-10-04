<template>
  <div class="card-wrapper" @click="flipCard">
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
        <div class="sid-row">
          <span class="sid">
            {{ paddedId }}
          </span>
          <a v-if="prototypeLink" :href="prototypeLink" target="_blank">
            <img src="~/static/ui-elements/prototype-small.svg" alt="" />
            Prototype
          </a>
        </div>
        <div class="hero-image" :style="{ backgroundImage: hero }"></div>
        <span v-if="type !== 'sample'" class="title">
          <NuxtLink v-if="type !== 'sample'" :to="'/sets/' + sid">
            <span class="title">
              {{ title }}
            </span>
            <img src="~/static/ui-elements/link-arrow.svg" alt="" />
          </NuxtLink>
        </span>
        <span v-else class="title">
          {{ title }}
        </span>
      </div>
      <div class="back-side" :style="{ backgroundImage: backgroundBack }">
        <div v-if="sid" class="description-wrapper">
          <div class="header">Description</div>
          <div class="description">
            {{ description }}
          </div>
        </div>

        <div v-if="sid" class="parents-wrapper">
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

        <div v-if="sid" class="authors-wrapper">
          <div class="header">Made by</div>
          <div class="authors">
            <span v-for="author in splitAuthors" :key="author" class="author">
              {{ author }}
            </span>
          </div>
        </div>
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
      default: null,
    },
    type: {
      type: String,
      required: false,
      default: 'sample',
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
    randomBackground: {
      type: Number,
      required: false,
      default: null,
    },
    prototypeLink: {
      type: String,
      required: false,
      default: '',
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
      if (!this.sid) return ''
      if (this.type === 'project') {
        return '#P' + String(this.sid).padStart(3, '0')
      } else if (this.type === 'set') {
        return '#S' + String(this.sid).padStart(3, '0')
      }
      return '#' + String(this.sid).padStart(4, '0')
    },
    hero() {
      if (this.type === 'sample') {
        return `url(/images/samples/${this.fixedEncodeURIComponent(
          this.heroImage
        )})`
      } else if (this.type === 'project' || this.type === 'set') {
        return `url(/images/projects/${this.fixedEncodeURIComponent(
          this.heroImage
        )})`
      } else {
        return null
      }
    },
    background() {
      if (this.randomBackground) {
        return `url(/images/background/randbg${this.randomBackground}-front.png), linear-gradient(315deg, transparent 30px, #f1f1f1 30px)`
      }
      if (this.type === 'sample') {
        return null
      } else if (this.type === 'project') {
        return `url(/images/background/${this.fixedEncodeURIComponent(
          this.backgroundImage
        )})`
      } else {
        return null
      }
    },
    backgroundBack() {
      if (this.randomBackground) {
        return `url(/images/background/randbg${this.randomBackground}-back.png), linear-gradient(45deg, transparent 30px, black 30px)`
      } else {
        return null
      }
    },
    parents() {
      if (!this.type === 'sample') {
        return this.$store.getters['samples/getParentsBySetId'](this.sid)
      } else {
        return this.$store.getters['samples/getParentsBySampleId'](this.sid)
      }
    },
  },
  methods: {
    flipCard() {
      this.flipped = !this.flipped
    },

    fixedEncodeURIComponent(str) {
      // handle strings/filenames with spaces and parens
      return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16)
      })
    },
  },
}
</script>

<style scoped>
.card-wrapper {
  background-color: transparent;
  width: var(--card-width);
  height: var(--card-height);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  cursor: pointer;
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
  -webkit-backface-visibility: hidden;
  /* Safari */
  backface-visibility: hidden;
  overflow: hidden;
}

.front-side {
  background: linear-gradient(315deg, transparent 30px, #f1f1f1 30px);
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
}

.tag.active {
  background: var(--active-green);
}

.sid-row {
  font-family: Roboto;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 1.2px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.hero-image {
  width: 250px;
  height: 190px;
  margin: 6px 0;
  flex-shrink: 0;
  background-size: cover;
  background-repeat: no-repeat;
}

.title {
  display: flex;
  font-family: var(--rajdhani);
  font-size: 1.25rem;
  font-weight: 600;
  line-height-step: 50%;
  flex-shrink: 0;
}

a {
  display: flex;
  align-content: center;
  gap: 6px;
}

a:hover {
  text-decoration: underline;
}

.back-side {
  background: linear-gradient(45deg, transparent 30px, black 30px);
  color: white;
  transform: rotateY(180deg);
  font-family: var(--roboto);
  font-size: 0.75rem;
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  max-height: 5rem;
  overflow-y: auto;
  white-space: pre-line;
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

.parent:hover {
  text-decoration: underline;
}

.authors {
  padding: 0.25rem 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0 0.75rem;
}
</style>
