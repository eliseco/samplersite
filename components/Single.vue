<template>
  <div class="single-wrapper">
    <div
      class="image-wrapper"
      :style="{ backgroundImage: `url(${content.image})` }"
    ></div>
    <div class="caption">{{ content.caption }}</div>
    <div class="parents"></div>
  </div>
</template>

<script>
export default {
  name: 'SingleSample',
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {}
  },
  computed: {},
}
</script>

<style scoped>
.single-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.caption {
  display: flex;
  justify-content: center;
  padding: var(--padding);
}

.image-wrapper {
  width: 100%;
  height: 80%;
  background-size: cover;
  background-position: 60%;
}
</style>
