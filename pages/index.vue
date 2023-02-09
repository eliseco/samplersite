<template>
  <main>
    <SampleBook :samples="allSamples" @toggleSample="updateSampleMaker" />
    <div class="sidebar">
      <MainMenu :num-samples="allSamples.length" />
      <SampleMaker
        :selected-samples="selectedSamples"
        @addNewSample="addNewSample"
      />
    </div>
  </main>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => {
    return {
      allSamples: [
        {
          id: 0,
          type: 'sample',
          content: 'images/black_yellow.png',
          caption: 'bland and yellow flyknit',
        },
        {
          id: 1,
          type: 'sample',
          content: 'images/blue_white.png',
          caption: 'blue and white flyknit',
        },
        {
          id: 2,
          type: 'sample',
          content: 'images/green_green.png',
          caption: 'green and green flyknit',
        },
        {
          id: 3,
          type: 'sample',
          content: 'images/green_grey.png',
          caption: 'green and grey flyknit',
        },
        {
          id: 4,
          type: 'sample',
          content: 'images/purple_white.png',
          caption: 'purple and white mesh sample',
        },
        {
          id: 5,
          type: 'sample',
          content: 'images/purple_yellow.png',
          caption: 'purple and yellow mesh sample',
        },
        {
          id: 6,
          type: 'sample',
          content: 'images/purple.png',
          caption: 'purple mesh sample',
        },
        {
          id: 7,
          type: 'set',
          content: [
            {
              id: 4,
              type: 'sample',
              content: 'images/purple_white.png',
              caption: 'purple and white mesh sample',
            },
            {
              id: 5,
              type: 'sample',
              content: 'images/purple_yellow.png',
              caption: 'purple and yellow mesh sample',
            },
            {
              id: 6,
              type: 'sample',
              content: 'images/purple.png',
              caption: 'purple mesh sample',
            },
          ],
          caption: 'lace carriage techniques',
        },
      ],
      selectedIds: [],
    }
  },
  computed: {
    selectedSamples: {
      get() {
        return this.allSamples.filter((s) => this.selectedIds.includes(s.id))
      },
      set(newSelectedIds) {
        this.selectedIds = newSelectedIds
      },
    },
  },
  methods: {
    updateSampleMaker(sampleId) {
      if (!this.selectedIds.includes(sampleId)) {
        this.selectedIds.push(sampleId)
      } else {
        this.selectedIds = this.selectedIds.filter((sid) => sid !== sampleId)
      }
    },

    addNewSample(sample) {
      sample.id = this.allSamples.length
      this.allSamples.push(sample)
    },
  },
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
