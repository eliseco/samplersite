<template>
  <div class="image-carousel">
    <div class="current-image">
      <img :src="`/images/projects/${images[current]}`" alt="" />
    </div>
    <div class="radio-input">
      <label v-for="(image, i) in images" :key="i">
        <input
          :id="i"
          v-model="current"
          :value="i"
          type="radio"
          name="current"
        />
        <span class="indicator"></span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      current: 0,
    }
  },
}
</script>

<style scoped>
.image-carousel {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--padding);
  flex-grow: 1;
}
.current-image {
  display: flex;
  justify-content: center;
}

img {
  width: 85%;
}

input {
  display: none;
  visibility: hidden;
}

.radio-input {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.indicator {
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  width: 15px;
  height: 15px;
  border: 1px white solid;
}
input:checked ~ .indicator {
  background-color: var(--active-green);
}
</style>
