<template>
  <div class="topbar-wrapper">
    <div class="content">
      <div class="left">
        <NuxtLink to="/"> SAMPLER </NuxtLink>
      </div>
      <div class="right">
        <NuxtLink to="/materialCatalog" :class="{ active: activeCatalog }">
          Material Catalog
        </NuxtLink>
        <!-- <NuxtLink to="/about" :class="{ active: activeAbout }">
          About
        </NuxtLink> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopNavBar',
  computed: {
    activeAbout() {
      return this.$route.path.startsWith('/about')
    },
    activeCatalog() {
      return this.$route.path.startsWith('/materialCatalog')
    },
  },
}
</script>

<style scoped>
.topbar-wrapper {
  z-index: 1;
  position: fixed;
  width: 100%;
  height: var(--topbar-height);
  display: flex;
  justify-content: center;
  border-bottom: 1px var(--border-light) solid;
  background: var(--background-gradient);
}

.content {
  width: 100%;
  max-width: var(--page-max-width);
  padding: 0 3em 0 2rem;
  display: flex;
}

.left {
  font-family: var(--righteous);
  font-size: 36px;
  justify-self: flex-start;
  align-self: center;
}
.right {
  font-family: var(--roboto);
  font-size: 0.875rem;
  margin-left: auto;
  display: flex;
  gap: 2em;
  align-self: flex-end;
  padding-bottom: 15px;
}

.active {
  text-decoration: underline;
}
</style>
