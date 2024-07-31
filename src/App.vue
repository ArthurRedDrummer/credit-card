<template>
  <form class="flex flex-col gap-5 p-7 rounded-xl shadow-xl" autocomplete="off">
    <card-holder-field v-model:user="holder.value" v-model:error="holder.error" :name="holder.name" :title="holder.title"/>
    <card-number-field v-model:number="number.value" v-model:error="number.error" :name="number.name" :title="number.title"/>
    <input class="block px-5 py-2 rounded-md cursor-pointer" :class="canSend ? 'bg-red-800 text-white' : 'bg-gray-500 text-white'" :disabled="!canSend" type="submit">
  </form>
</template>

<script setup>
import { reactive, computed } from 'vue'

import CardCvvField from './components/CardCvvField.vue'
import CardExpiresField from './components/CardExpiresField.vue'
import CardHolderField from './components/CardHolderField.vue'
import CardNumberField from './components/CardNumberField.vue'

const holder = reactive({
  value: '',
  name: 'card-holder',
  title: 'Имя владельца карты',
  error: ''
});

const number = reactive({
  value: '',
  name: 'card-number',
  title: 'Номер карты',
  error: ''
});

const canSend = computed(() => {
  if (holder.error || !holder.value) {
    return false;
  }

  if (number.error || !number.value) {
    return false;
  }

  return true;
})

</script>