<template>
  <div class="sample-book">
    <Sample
      v-for="s in samples"
      :key="s.id"
      :sample-id="s.id"
      :type="s.type"
      :content="s.content"
      :caption="s.caption"
      @toggleSample="$emit('toggleSample', $event)"
    />
  </div>
</template>

<script>
export default {
  name: 'SampleBook',
  props: {
    samples: {
      type: Array,
      default: null,
    },
  },
  computed: {},
  methods: {},
}
</script>

<style scoped>
.sample-book {
  flex-grow: 1;
  align-content: flex-start;
  display: grid;
  gap: 1em;
  padding: var(--padding);
  grid-template-columns: repeat(auto-fill, minmax(min(20rem, 100%), 1fr));
  overflow-y: auto;
}
</style>
