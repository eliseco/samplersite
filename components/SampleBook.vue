<template>
  <div class="sample-book">
    <Sample v-for="s in samples" :key="s"> sample #{{ s }} </Sample>
  </div>
</template>

<script>
export default {
  name: 'SampleBook',
  data: () => {
    return {
      samples: [1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    }
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
  grid-template-columns: repeat(auto-fill, minmax(min(20rem, 100%), 1fr));
  overflow-y: auto;
}
</style>
