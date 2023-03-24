<template>
  <div class="set-wrapper">
    <div class="sample-stack">
      <Sample
        v-for="single in singles"
        :key="'single' + single.id"
        :single="single"
        :selectable="false"
      />
      <Sample
        v-for="set in sets"
        :key="'set' + set.id"
        :set="set"
        :selectable="false"
      />
    </div>
    <div class="caption">{{ content.caption }}</div>
  </div>
</template>

<script>
export default {
  name: 'SampleSet',
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {}
  },
  computed: {
    singles() {
      return this.content.singleIds?.map((sid) =>
        this.$store.getters['samples/getSingleById'](sid)
      )
    },
    sets() {
      return this.content.setIds?.map((sid) =>
        this.$store.getters['samples/getSetById'](sid)
      )
    },
  },
  methods: {},
}
</script>

<style scoped>
.set-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
</style>
