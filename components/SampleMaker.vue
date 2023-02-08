<template>
  <div class="sample-maker">
    <div v-if="selectedSamples.length" class="sample-stack">
      <Sample
        v-for="s in selectedSamples"
        :key="s.id"
        :sample-id="s.id"
        :type="s.type"
        :content="s.content"
        :caption="s.caption"
        :small="true"
      ></Sample>
    </div>

    <div v-if="selectedSamples.length" class="caption">
      <textarea v-model="inputText" rows="5" @keyup="handleKeyUp"></textarea>
      <button @click="handleSave">create new sample</button>
    </div>

    <div v-else class="intro-message">
      welcome to sampler. to get started, select some samples from the sample
      book.
    </div>
  </div>
</template>

<script>
export default {
  name: 'SampleMaker',
  props: {
    selectedSamples: {
      type: Array,
      required: false,
      default: null,
    },
  },
  data: () => {
    return {
      inputText: '',
    }
  },
  computed: {},
  methods: {
    handleKeyUp(e) {
      switch (e.key) {
        // case 'Enter':
        //   this.handleSave();
        //   break;
        default:
          break
      }
    },

    handleSave() {
      console.log('sample saved with caption: ' + this.inputText)
      this.$emit('addNewSample', {
        id: null,
        type: 'set',
        content: this.selectedSamples,
        caption: this.inputText,
      })
    },
  },
}
</script>

<style scoped>
.sample-maker {
  width: 100%;
  height: 80%;
  padding: var(--padding);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--padding);
  border: 1px solid black;
  border-radius: var(--border-radius);
  font-weight: 300;
}

.sample-stack {
  overflow-y: auto;
  align-content: flex-start;
  display: grid;
  gap: var(--padding);
  grid-template-columns: repeat(auto-fill, minmax(min(6rem, 100%), 1fr));
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

button:hover {
  background: #0000ff22;
}
</style>
