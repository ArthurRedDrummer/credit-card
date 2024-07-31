<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex flex-row gap-5 justify-between items-center relative">
      <label class="text-sm text-gray-500 whitespace-nowrap" :for="field.name" v-text="field.title" />
      <!-- <span class="basis-full border-b border-b-gray-200" v-text="value" /> -->
      <input class="outline-none basis-full border-b border-b-gray-200" autocomplete="off" :id="field.name" type="password"
        v-model="field.value" @keyup="validate" maxlength="3" />
    </div>
    <div>
      <span class="text-xs text-red-600" v-if="error" v-text="error" />
    </div>
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