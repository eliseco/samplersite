<template>
  <div class="card-wrapper">
    <div class="card-inner" :class="{ flipped }">
      <div
        class="front-side"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
      >
        <div class="tags">
          <span v-for="tag in tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
        <span class="sid">
          {{ sid }}
        </span>
        <div
          class="hero-image"
          :style="{ backgroundImage: `url(${heroImage})` }"
        ></div>
        <span class="title">
          {{ title }}
        </span>
        <div class="flip-button-front" @click="flipCard"></div>
      </div>
      <div class="back-side">
        <div class="description"></div>
        <div class="parents"></div>
        <div class="authors"></div>
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
      type: String,
      required: false,
      default: '#AA0001',
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
      type: Array,
      required: false,
      default: () => [],
    },
    authors: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      flipped: false,
    }
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
  padding: 0 15px;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

.front-side {
  background-color: #f1f1f1;
  color: var(--text);
}

.tags {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
  padding-bottom: 16px;
}

.tag {
  padding: 0 10px;
  font-family: var(--rajdhani);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1.2px;
  background: white;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
}

.sid {
  font-family: Roboto;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 1.2px;
}

.hero-image {
  background: #c4c4c4;
  width: 240px;
  height: 225px;
  flex-shrink: 0;
}

.title {
  font-family: var(--rajdhani);
  font-size: 24px;
  font-weight: 600;
}

.back-side {
  background-color: black;
  color: white;
  transform: rotateY(180deg);
}

.flip-button-front {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 30px 30px;
  border-color: transparent transparent white transparent;
  bottom: 0;
  right: 0;
  position: absolute;
}

.flip-button-back {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 30px 30px 0;
  border-color: transparent transparent white transparent;
  bottom: 0;
  left: 0;
  position: absolute;
}
</style>
