<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex flex-row gap-5 justify-between items-center relative">
      <label class="text-sm text-gray-500 whitespace-nowrap" :for="field.name" v-text="field.title" />
      <!-- <span class="basis-full border-b border-b-gray-200" v-text="value" /> -->
      <input class="outline-none basis-full border-b border-b-gray-200" autocomplete="off" :id="field.name"
        type="month" v-model="field.value" @change="validate" />
    </div>
    <div>
      <span class="text-xs text-red-600" v-if="error" v-text="error" />
    </div>
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