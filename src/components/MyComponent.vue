<template>
  <div class="MyComponent">
    <h1>Root</h1>
  </div>
</template>

<script lang="ts">
import { Component, /* Prop, */ Vue } from 'vue-property-decorator';

@Component
export default class MyComponent extends Vue
{
  // @Prop() private msg!: string;
}
</script>

<style scoped>
h1
{
  color: crimson;
}
</style>
