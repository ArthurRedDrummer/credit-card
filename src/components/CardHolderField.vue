<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="flex flex-row gap-5 justify-between items-center relative">
      <label class="text-sm text-gray-500 whitespace-nowrap cursor-pointer" :for="name" v-text="title" />
      <input class="outline-none basis-full border-b border-b-gray-200" autocomplete="off" type="text" :id="name"
        v-model="user" @input="validate" />
    </div>
    <div class="text-xs text-red-600" v-if="error" v-text="error" />
  </div>
</template>

<script setup>
const [user] = defineModel('user', {
  set(value) {
    return value.toUpperCase();
  }
});

const [error] = defineModel('error')

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

function validate() {
  let value = user.value;
  let array = value.split(' ');

  error.value = '';

  if (value.length > 20) {
    error.value = 'Поле не может быть больше 20 символов';
  }

  if (array.filter(str => str).length < 2) {
    error.value = 'Поле должно содержать имя и фамилию';
  }

  if (array.filter(str => str).length >= 3) {
    error.value = 'Поле должно содержать только имя и фамилию';
  }

  if (/[^A-Z\s]+/.test(value)) {
    error.value = 'Поле может содержать только латинские буквы';
  }

  if (!value || value.trim().length === 0) {
    error.value = 'Поле не может быть пустым';
  }
}
</script>