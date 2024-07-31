<template>
  <div>
    <label :for="field.name" v-text="field.title" />
    <input autocomplete="off" :id="field.name" type="text" v-model="field.value" />
  </div>
</template>

<script setup>
const props = defineProps({
  field: Object
});
</script>