<template>
  <main>
    <SampleBook />
    <div class="sidebar">
      <MainMenu />
      <InfoPanel />
    </div>
  </main>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style scoped>
main {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 2em;
  gap: 2em;
  background: var(--background-gradient);
}

.sidebar {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 2em;
  width: 400px;
}
</style>
