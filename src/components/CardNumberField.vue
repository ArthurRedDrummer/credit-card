<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex flex-row gap-5 justify-between items-center relative mobile:flex-col mobile:items-stretch">
      <label class="text-sm text-gray-500 whitespace-nowrap cursor-pointer" :for="name" v-text="title" />
      <div class="flex flex-col basis-full relative font-mono">
        <span class="absolute top-0 left-0 w-full h-full bg-white border-b border-b-gray-200 cursor-pointer" v-if="canShowMask" v-text="mask" @click="focus" />
        <input ref="input" class="outline-none basis-full border-b border-b-gray-200" autocomplete="off" :id="name"
          type="number" v-model="number" @input="validate" @focus="isFocused = true" @blur="isFocused = false" />
      </div>
    </div>
    <div>
      <span class="text-xs text-red-600" v-if="error" v-text="error" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const [number] = defineModel('number');
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

const input = ref(null);
const isFocused = ref(false);

const str = computed(() => number.value.toString());

const mask = computed(() => {
  if (str.value.length >= 16) {
    return `${str.value.slice(0, 2)}** **** **** ${str.value.slice(-4)}`;
  }
  return '';
});

const canShowMask = computed(() => {
  return mask.value && !isFocused.value;
})

function focus() {
  input.value.focus();
}

function validate() {
  error.value = '';

  if (str.value.length < 16) {
    error.value = 'Поле должно содержать 16 цифр';
  }

  if (str.value.length >= 16 && !checkCardNumber(number.value)) {
    error.value = 'Неверный номер карты';
  }

  if (!number.value) {
    error.value = 'Поле не может быть пустым';
  }
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