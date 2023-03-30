<template>
  <div
    class="sample"
    :class="{ selected, small: !selectable }"
    @click="toggleSample"
  >
    <div class="content">
      <Single v-if="single" :content="single" />
      <Set v-if="set" :content="set" />
    </div>

    <div class="info">
      <div class="title">{{ caption }}</div>
      <div v-if="selectable" class="parents">
        <span v-for="parent in parents" :key="parent.id" class="parent">
          {{ parent.caption }}
        </span>
      </div>
    </div>
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
    id() {
      return this.single
        ? this.padId(this.single.id)
        : 'set' + this.padId(this.set.id)
    },
    caption() {
      return this.single ? this.single.caption : this.set.caption
    },
    parents() {
      return this.single
        ? this.$store.getters['samples/getParentsBySingleId'](this.single.id)
        : this.$store.getters['samples/getParentsBySetId'](this.set.id)
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
    padId(sid) {
      const s = '000' + sid
      return s.substring(s.length - 4)
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
}

.content {
  width: 100%;
  height: 100%;
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

.info {
  padding: var(--padding) 0;
  height: 3em;
}

.title {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.parents {
  font-size: 0.5em;
  color: #666;
  display: flex;
  gap: 2em;
  overflow-x: auto;
}

.parent {
  flex-shrink: 0;
}
</style>
