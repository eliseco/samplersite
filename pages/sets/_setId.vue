<!-- 
this is a dynamicly generated page to display a single set based on the URL route
that lives at /sets/{{setId}} (this structure is based on the directory structure of this pages/ folder)
it can be called from any component with the following:
<NuxtLink v-if="set" :to="'/sets/'+set.id"> view set </NuxtLink>
this page will then access the set from our store using the passed in setID, and programatically display the set or project
 -->

<template>
  <main>this is a page for individual set #{{ setId }}</main>
</template>

<script>
export default {
  computed: {
    setId() {
      return this.$route.params.setId
    },
  },
}
</script>

<style scoped></style>
