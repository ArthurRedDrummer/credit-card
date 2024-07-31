<template>
  <div>
    <label :for="field.name" v-text="field.title" />
    <input autocomplete="off" :id="field.name" type="password" v-model="field.value" maxlength="3" />
  </div>
</template>

<script setup>
const props = defineProps({
  field: Object
})
</script>