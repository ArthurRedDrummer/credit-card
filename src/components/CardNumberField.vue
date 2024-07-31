<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex flex-row gap-5 justify-between items-center relative">
      <label class="text-sm text-gray-500 whitespace-nowrap" :for="field.name" v-text="field.title" />
      <!-- <span class="basis-full border-b border-b-gray-200" v-text="value" /> -->
      <input class="outline-none basis-full border-b border-b-gray-200" autocomplete="off" :id="field.name" type="number"
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
  const arr = props.field.value?.toString().split('');
  const value = arr.reduce((acc, current, index) => {
    if (index % 4 === 0 && index !== 0) {
      acc += ' ';
    }

    acc += current;

    return acc;
  }, '');

  return value
})

function validate() {
  let value = props.field?.value;

  error.value = '';

  if (!value) {
    error.value = 'Field is required';
  }

  if (value.toString().length < 15 || value.toString().length > 18) {
    error.value = 'Invalid card number';
  }

  if (value.toString().length >= 15 && !checkCardNumber(value)) {
    error.value = 'Invalid card number';
  }

  emit('change', {
    name: props.field.name,
    error: error.value
  });
}

function checkCardNumber(input) {
  const number = input.toString();
  const digits = number.replace(/\D/g, '').split('').map(Number);

  let sum = 0;
  let isSecond = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];
    if (isSecond) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    isSecond = !isSecond;
  }
  return sum % 10 === 0;
}
</script>