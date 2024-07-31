<template>
  <div>
    <label :for="field.name" v-text="field.title" />
    <input autocomplete="off" :id="field.name" type="text" v-model="field.value" @keyup="validate" />
    <span v-text="value" />
    <span v-if="error" v-text="error" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['change']);

const props = defineProps({
  field: Object
});

const error = ref('');

const value = computed(() => {
  return props.field.value?.toUpperCase() ?? '';
});

function validate() {
  let value = props.field?.value;

  error.value = '';

  if (!value) {
    error.value = 'Field is required';
  }

  if (/[^a-zA-Z\s]+/.test(props.field.value)) {
    error.value = 'Field should contain only english letters and spaces';
  }

  emit('change', {
    name: props.field.name,
    error: error.value
  });
}
</script>