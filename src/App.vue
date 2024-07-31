<template>
  <form class="flex flex-col gap-5 p-7 rounded-xl shadow-xl" autocomplete="off">
    <component v-for="field, name in card" :is="mapper[name]" :field="field" :key="name" @change="update"/>
    <input class="block px-5 py-2 rounded-md" :class="canSend ? 'bg-red-800 text-white' : 'bg-gray-500 text-white'" :disabled="!canSend" type="submit">
  </form>
</template>

<script setup>
import { reactive, computed } from 'vue'

import CardCvvField from './components/CardCvvField.vue'
import CardExpiresField from './components/CardExpiresField.vue'
import CardHolderField from './components/CardHolderField.vue'
import CardNumberField from './components/CardNumberField.vue'

const mapper = {
  cvv: CardCvvField,
  date: CardExpiresField,
  name: CardHolderField,
  number: CardNumberField,
}

const card = reactive({
  name: {
    title: 'Name & Surname',
    name: 'card-holder',
    value: '',
    hasError: true
  },
  number: {
    title: 'Card number',
    name: 'card-number',
    value: '',
    hasError: true
  },
  date: {
    title: 'Date',
    name: 'card-date',
    value: '',
    hasError: true
  },
  cvv: {
    title: 'CVC/CVV',
    name: 'card-cvv',
    value: '',
    hasError: true
  },
});

const canSend = computed(() => {
  return !Object.values(card).some(({hasError}) => hasError);
});

function update({name, error}) {
  for (let field in card) {
    if (card[field].name === name) {
      card[field].hasError = !!error;
    }
  }
}
</script>