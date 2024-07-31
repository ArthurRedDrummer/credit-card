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

const emit = defineEmits(['change']);

const error = ref('');

const value = computed(() => {
  let [year, month] = props.field.value?.split('-') ?? [];

  return year && month ? `${month}/${year?.slice(2)}` : '';
});

function validate() {
  error.value = '';

  if (!props.field.value) {
    error.value = 'Field is required';
  }

  emit('change', {
    name: props.field.name,
    error: error.value
  });
}
</script>