<template>
  <div>
    <label :for="field.name" v-text="field.title" />
    <input autocomplete="off" :id="field.name" type="password" v-model="field.value" maxlength="3" @blur="validate"
      @keyup="validate" @change="validate" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['change']);

const props = defineProps({
  field: Object
})

const error = ref('');

function validate() {
  error.value = '';

  if (!props.field.value) {
    error.value = 'Field is required';
  }

  emit('change', {
    name: props.field.name,
    error: error.value
  });;
}
</script>