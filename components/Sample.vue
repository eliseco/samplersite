<template>
  <div class="sample">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SampleNode',
  computed: {},
  methods: {},
}
</script>

<style scoped>
.sample {
  height: 300px;
  border: 1px solid black;
  border-radius: var(--border-radius);
  padding: var(--padding);
  font-weight: 500;
}
</style>
