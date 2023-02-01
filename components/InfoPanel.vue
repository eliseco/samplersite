<template>
  <div class="info-panel">
    this is an information panel. it displays information about a selected
    filter and/or sample
  </div>
</template>

<script>
export default {
  name: 'InformationPanel',
  computed: {},
  methods: {},
}
</script>

<style scoped>
.info-panel {
  width: 100%;
  height: 50%;
  padding: var(--padding);
  border: 1px solid black;
  border-radius: var(--border-radius);
  font-weight: 300;
}
</style>
