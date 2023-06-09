<template>
  <main>This is an about page for Sampler.</main>
</template>

<script>
export default {
  name: 'AboutPage',
  data: () => {
    return {}
  },
}
</script>

<style scoped>
main {
  margin-top: var(--topbar-height);
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 2em;
  gap: 2em;
}
</style>
