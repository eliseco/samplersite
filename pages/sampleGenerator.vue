<template>
  <main>
    <SampleBook
      :singles="singles"
      :sets="sets"
      @toggleSample="updateSelectedSamples"
    />
    <div class="sidebar">
      <div class="header">Sample Generator</div>
      <div class="intro-message">
        ← to create some new sets, select some samples from the sample book.
      </div>
      <div class="sample-count">
        total samples: {{ singles.length + sets.length }}
      </div>
      <button @click="logSamples">download samples</button>

      <SampleBook
        :singles="selectedSingles"
        :sets="selectedSets"
        :selectable="false"
      />

      <div class="caption">
        <textarea v-model="caption" rows="5" :disabled="!wip"></textarea>
        <button :disabled="!wip" @click="addSet">create new sample</button>
      </div>
    </div>
  </main>
</template>

<script>
import { saveAs } from 'file-saver'
export default {
  name: 'IndexPage',
  data: () => {
    return {}
  },
  computed: {
    wip() {
      return this.selectedSingles.length || this.selectedSets.length
    },
    singles() {
      return this.$store.state.samples.singles
    },
    sets() {
      return this.$store.state.samples.sets
    },
    selectedSingles() {
      return this.$store.state.sampleMaker.selectedSingleIds?.map((sid) =>
        this.$store.getters['samples/getSingleById'](sid)
      )
    },
    selectedSets() {
      return this.$store.state.sampleMaker.selectedSetIds?.map((sid) =>
        this.$store.getters['samples/getSetById'](sid)
      )
    },
    caption: {
      get() {
        return this.$store.state.sampleMaker.caption
      },
      set(caption) {
        this.$store.commit('sampleMaker/updateCaption', caption)
      },
    },
  },
  methods: {
    updateSelectedSamples({ type, sid }) {
      if (type === 'single') {
        this.$store.commit('sampleMaker/toggleSingle', sid)
      } else {
        this.$store.commit('sampleMaker/toggleSet', sid)
      }
    },
    addSet() {
      this.$store.commit('samples/addSet', {
        singleIds: this.$store.state.sampleMaker.selectedSingleIds,
        setIds: this.$store.state.sampleMaker.selectedSetIds,
        caption: this.$store.state.sampleMaker.caption,
      })
      this.$store.commit('sampleMaker/clear')
    },
    logSamples() {
      const samples = {
        singles: this.$store.state.samples.singles,
        sets: this.$store.state.samples.sets,
      }
      saveAs(new Blob([JSON.stringify(samples)]), 'samples.json')
    },
  },
}
</script>

<style scoped>
main {
  margin-top: var(--topbar-height);
  position: absolute;
  width: 100%;
  height: calc(100% - var(--topbar-height));
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
  width: 400px;
  height: 100%;
  gap: 1em;
}

.header {
  font-family: var(--font-family-condensed);
  font-size: 2.5em;
}

.caption {
  margin-top: auto;
}

textarea {
  resize: none;
  width: 100%;
  padding: var(--padding);
  margin: 0;
  background: transparent;
  border: 1px solid black;
  border-radius: var(--border-radius);
  font-family: var(--font-family);
}

button {
  width: 100%;
}

button:disabled,
textarea:disabled {
  cursor: default;
  opacity: 50%;
}
</style>
