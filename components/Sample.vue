<template>
  <div
    class="sample"
    :class="{ selected, small: !selectable }"
    @click="toggleSample"
  >
    <Single v-if="single" :content="single" />
    <Set v-if="set" :content="set" />
  </div>
</template>

<script>
export default {
  name: 'SampleNode',
  props: {
    single: {
      type: Object,
      required: false,
      default: null,
    },
    set: {
      type: Object,
      required: false,
      default: null,
    },
    selectable: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    selected() {
      if (!this.selectable) return false
      if (this.single) {
        return this.$store.state.sampleMaker.selectedSingleIds.includes(
          this.single.id
        )
      } else {
        return this.$store.state.sampleMaker.selectedSetIds.includes(
          this.set.id
        )
      }
    },
  },
  methods: {
    toggleSample() {
      if (this.selectable) {
        const type = this.single ? 'single' : 'set'
        const sid = this.single ? this.single.id : this.set.id
        this.$emit('toggleSample', { type, sid })
      }
    },
  },
}
</script>

<style scoped>
.sample {
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: var(--border-radius);
  padding: var(--padding);
  font-weight: 500;
  cursor: pointer;
  overflow-y: auto;
}

.small {
  cursor: inherit;
  height: 200px;
  font-size: 0.75em;
  font-weight: 400;
}

.selected {
  outline: 2px solid var(--border-color);
}
</style>
