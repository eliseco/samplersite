<template>
  <div class="single-wrapper">
    <div
      class="image-wrapper"
      :style="{ backgroundImage: `url(${content.image})` }"
    ></div>
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
}
</script>

<style scoped>
.single-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.image-wrapper {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 60%;
}
</style>
