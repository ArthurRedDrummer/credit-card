<template>
  <div>
    <label :for="field.name" v-text="field.title" />
    <input autocomplete="off" :id="field.name" type="number" v-model="field.value" @keyup="validate"
      @change="validate" />
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

  if (value.toString().length > 18) {
    error.value = 'Invalid card number';
  }

  if (value.toString().length > 15 && !checkCardNumber(value)) {
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