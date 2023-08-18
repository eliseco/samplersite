<template>
  <label :for="value" class="filter-button">
    <input
      :id="value"
      type="checkbox"
      :checked="checked"
      @input="(event) => $emit('toggleCheck', event.target.checked)"
    />
    <span class="indicator" />
    <span class="label"> {{ label }} </span>
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
  gap: 5px;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.label {
  text-transform: capitalize;
}

input {
  display: none;
  visibility: hidden;
}

.indicator {
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  border: 1px black solid;
}

input:checked ~ .indicator {
  background-color: var(--active-green);
}
</style>
