<template>
  <label :for="value" class="filter-button">
    {{ label }}
    <input
      :id="value"
      type="checkbox"
      :checked="checked"
      @input="(event) => $emit('toggleCheck', event.target.checked)"
    />
    <span class="indicator" />
  </label>
</template>

<script>
export default {
  name: 'FilterCheckbox',
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style scoped>
.filter-button {
  font-size: 0.875rem;
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

input {
  display: none;
  visibility: hidden;
}

.indicator {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  border: 1px var(--border-dark) solid;
}

input:checked ~ .indicator {
  background-color: black;
}
</style>
