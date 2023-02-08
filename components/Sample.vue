<template>
  <div class="sample-wrapper">
    <div class="sample" :class="{ selected, small }" @click="toggleSample">
      <div
        v-if="type === 'sample'"
        class="image-wrapper"
        :style="{ backgroundImage: `url(${content})` }"
      ></div>
      <div v-if="type === 'set'" class="sample-stack">
        <Sample
          v-for="s in content"
          :key="s.caption"
          :sample-id="s.id"
          :type="s.type"
          :content="s.content"
          :caption="s.caption"
          :small="true"
        >
        </Sample>
      </div>
      <div class="caption">{{ caption }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SampleNode',
  props: {
    sampleId: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'sample',
    },
    content: {
      type: [Object, Array, String],
      required: false,
      default: null,
    },
    caption: {
      type: String,
      required: false,
      default: 'sample caption',
    },
    small: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => {
    return {
      selected: false,
    }
  },
  computed: {},
  methods: {
    toggleSample() {
      if (!this.small) {
        this.selected = !this.selected
        this.$emit('toggleSample', this.sampleId, this.selected)
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

.sample-stack {
  width: 100%;
  overflow-y: auto;
  align-content: flex-start;
  display: grid;
  gap: var(--padding);
  grid-template-columns: repeat(auto-fill, minmax(min(6rem, 100%), 1fr));
}

.caption {
  display: flex;
  justify-content: center;
  padding: var(--padding);
}

.small {
  height: 200px;
  font-size: 0.75em;
  font-weight: 400;
}

.image-wrapper {
  width: 100%;
  height: 80%;
  background-size: cover;
  background-position: 60%;
}

.selected {
  border: 3px solid var(--border-color);
}
</style>
