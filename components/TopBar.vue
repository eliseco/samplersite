<template>
  <div class="topbar-wrapper">
    <div class="left">
      <NuxtLink to="/"> Sampler </NuxtLink>
    </div>
    <div class="right">
      <NuxtLink to="/about"> About </NuxtLink>
      <NuxtLink to="/projects"> Projects </NuxtLink>
      <NuxtLink to="/sampleStack"> Sample Stack </NuxtLink>
      <NuxtLink to="/sampleGenerator"> Sample Generator </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.topbar-wrapper {
  z-index: 1;
  position: fixed;
  width: 100%;
  height: var(--topbar-height);
  padding: 0 2em;
  display: flex;
  align-items: center;
  border-bottom: 1px var(--text) solid;
  background: var(--background-gradient);
}

.left {
  font-size: 2em;
  justify-self: flex-start;
}
.right {
  font-size: 1em;
  margin-left: auto;
  display: flex;
  gap: 2em;
}
</style>
