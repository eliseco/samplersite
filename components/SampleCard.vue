<template>
  <div class="sample-wrapper">
    <div
      class="front-side"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <div class="title"></div>
      <div
        class="hero-image"
        :style="{ backgroundImage: `url(${heroImage})` }"
      ></div>
    </div>
    <div class="back-side">
      <div class="description"></div>
      <div class="parents"></div>
      <div class="authors"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SampleCard',
  props: {
    id: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    heroImage: {
      type: String,
      required: true,
    },
    backgroundImage: {
      type: String,
      required: false,
      default: '',
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style scoped>
.sample-wrapper {
  display: flex;
  flex-direction: column;
}
</style>
