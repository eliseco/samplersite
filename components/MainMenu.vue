<template>
  <div class="main-menu">
    <div class="header">SAMPLER</div>
    <div class="description">this is a general description of sampler</div>
    <ul class="filter-list">
      <li class="filter">this is a filter</li>
      <li class="filter">this is another filter</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MainMenu',
  computed: {},
  methods: {},
}
</script>

<style scoped>
.main-menu {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: var(--padding);
  border: 1px solid black;
  border-radius: var(--border-radius);
}

.header {
  font-size: 4em;
  font-weight: 500;
}

.description {
  font-size: 1em;
  font-weight: 300;
}

.filter-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  font-weight: 400;
}
</style>
