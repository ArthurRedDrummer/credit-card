<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex flex-row gap-5 justify-between items-center relative">
      <label class="text-sm text-gray-500 whitespace-nowrap" :for="field.name" v-text="field.title" />
      <!-- <span class="basis-full border-b border-b-gray-200" v-text="value" /> -->
      <input class="outline-none basis-full border-b border-b-gray-200" autocomplete="off" :id="field.name" type="text"
        v-model="field.value" @keyup="validate" />
    </div>
    <div>
      <span class="text-xs text-red-600" v-if="error" v-text="error" />
    </div>
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
  return props.field.value?.toUpperCase() ?? ' ';
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