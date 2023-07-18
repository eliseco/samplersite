<template>
  <div class="card-wrapper">
    <div class="card-inner" :class="{ flipped }">
      <div
        class="front-side"
        :style="{ backgroundImage: `url(${backgroundImage})` }"
      >
        <div class="title"></div>
        <div
          class="hero-image"
          :style="{ backgroundImage: `url(${heroImage})` }"
        ></div>
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
    id: {
      type: String,
      required: false,
      default: '',
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
    author: {
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
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

.front-side {
  border: 1px var(--text) solid;
  background-color: white;
  color: black;
}

.back-side {
  border: 1px black solid;
  background-color: black;
  color: white;
  transform: rotateY(180deg);
}

.flip-button-front {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 30px 30px;
  border-color: transparent transparent black transparent;
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
