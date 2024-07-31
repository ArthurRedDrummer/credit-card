<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex flex-row gap-5 justify-between items-center relative">
      <label class="text-sm text-gray-500 whitespace-nowrap cursor-pointer" :for="name" v-text="title" />
      <div class="flex flex-row font-mono gap-1">
        <input ref="monthInput" class="w-7 border-b border-b-gray-200 outline-none text-center" :id="name" type="number"
          v-model="month" @input="update">
        <span class="text-gray-200">/</span>
        <input ref="yearInput" class="w-12 border-b border-b-gray-200 outline-none text-center" type="number"
          v-model="year" @input="update">
      </div>
    </div>
    <div>
      <span class="text-xs text-red-600" v-if="error" v-text="error" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const [date] = defineModel('date');
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

const month = ref(null);
const year = ref(null);

const monthInput = ref(null);
const yearInput = ref(null);

function update() {
  if (month.value && month.value <= 12 && month.value.toString().length === 2) {
    yearInput.value.focus();
  }

  date.value = `${month.value}/${year.value}`;

  validate();
}

function validate() {
  error.value = '';

  if (!month.value) {
    error.value = 'Поле месяц не может быть пустым'
  }

  if (!year.value) {
    error.value = 'Поле год не может быть пустым'
  }

  if (year.value && year.value.toString().length < 4) {
    error.value = 'Введите полный год'
  }

  if (month.value > 12) {
    error.value = 'Вы ввели некорректное значение месяца'
  }
}
</script>