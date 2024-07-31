<template>
  <form autocomplete="off">
    <component v-for="field, name in card" :is="mapper[name]" :field="field" :key="name"/>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

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
    value: ''
  },
  number: {
    title: 'Card number',
    name: 'card-number',
    value: ''
  },
  // date: {
  //   title: 'Date',
  //   name: 'card-date',
  //   value: ''
  // },
  // cvv: {
  //   title: 'CVC/CVV',
  //   name: 'card-cvv',
  //   value: ''
  // },
});
</script>