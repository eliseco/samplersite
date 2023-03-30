<template>
  <div :class="{ samplebook: true, small: !selectable }">
    <Sample
      v-for="single in singles"
      :key="'single' + single.id"
      :single="single"
      :selectable="selectable"
      @toggleSample="$emit('toggleSample', $event)"
    />
    <Sample
      v-for="set in sets"
      :key="'set' + set.id"
      :set="set"
      :selectable="selectable"
      @toggleSample="$emit('toggleSample', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'SampleBook',
  props: {
    singles: {
      type: Array,
      required: false,
      default: () => [],
    },
    sets: {
      type: Array,
      required: false,
      default: () => [],
    },
    selectable: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {},
  methods: {},
}
</script>

<style scoped>
.samplebook {
  flex-grow: 1;
  align-content: flex-start;
  display: grid;
  gap: 1em;
  padding: var(--padding);
  grid-template-columns: repeat(auto-fill, minmax(min(15rem, 100%), 1fr));
  overflow-y: auto;
}

.small {
  grid-template-columns: repeat(auto-fill, minmax(min(10rem, 100%), 1fr));
}
</style>
