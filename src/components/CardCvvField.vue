<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex flex-row gap-5 justify-between items-center relative">
      <label class="text-sm text-gray-500 whitespace-nowrap cursor-pointer" :for="name" v-text="title" />
      <input class="outline-none basis-8 w-8 text-center shrink-0 border-b border-b-gray-200" autocomplete="off" :id="name"
        type="password" v-model="cvv" @input="validate" @blur="validate" />
    </div>
    <div>
      <span class="text-xs text-red-600" v-if="error" v-text="error" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const [cvv] = defineModel('number');
const [error] = defineModel('error');
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

function validate() {
  error.value = '';

  if (!cvv.value) {
    error.value = 'Поле не может быть пустым';
  }
}
</script>