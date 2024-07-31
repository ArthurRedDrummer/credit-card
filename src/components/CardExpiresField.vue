<template>
  <div>
    <label :for="field.name" v-text="field.title" />
    <input autocomplete="off" :id="field.name" type="month" v-model="field.value" pattern="mm/yy" @change="validate" />
    <span v-text="value" />
    <span v-if="error" v-text="error" />
  </div>
</template>

<script setup>
import {ref, computed} from 'vue'

const props = defineProps({
  field: Object
});

const error = ref('');

const value = computed(() => {
  let [year, month] = props.field.value?.split('-') ?? [];

  return `${month}/${year.slice(2)}`;
});

function validate() {
  if (!props.field.value) {
    error.value = 'Field is required';
    return false;
  }

  error.value = ''
  return true;
}
</script>