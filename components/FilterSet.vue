<template>
  <div class="filter-wrapper">
    <div class="filter-header" @click="expandFilters">
      {{ title }}
      <img
        :class="{ expanded }"
        src="~/static/ui-elements/expand-arrow.svg"
        alt=""
      />
    </div>
    <div v-if="expanded" class="option-list">
      <FilterCheckbox
        v-for="option in options"
        :key="option"
        :checked="value.includes(option)"
        :value="option"
        :label="option"
        @toggleCheck="handleCheck(option, $event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterSet',
  props: {
    title: {
      type: String,
      required: false,
      default: 'Filter Category',
    },
    options: {
      type: Array,
      required: false,
      default: () => ['Option 1', 'Option 2'],
    },
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      expanded: false,
    }
  },
  methods: {
    expandFilters() {
      this.expanded = !this.expanded
    },
    handleCheck(option, checked) {
      const updated = [...this.value]
      if (checked) {
        updated.push(option)
      } else {
        updated.splice(updated.indexOf(option), 1)
      }
      this.$emit('input', updated)
    },
  },
}
</script>

<style scoped>
.filter-wrapper {
  padding: 15px 0;
  border-bottom: 1px var(--border-light) solid;
  cursor: pointer;
}
.filter-header {
  font-size: 20px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  user-select: none;
}

.expanded {
  rotate: 180deg;
}
.option-list {
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style>
