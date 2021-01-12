<template>
<div id="navigate">
	<div class="grid-container">
		<div class="grid-item">1</div>
		<div class="grid-item">2</div>
		<div class="grid-item">3</div>
	</div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Navigate extends Vue
{
	// @Prop() private msg!: string;
}
</script>

<style scoped>
div.grid-container
{
	display: grid;
	grid-template-columns: auto auto auto;
	color: white;
	font-size: 24px;
	background: rgb(69, 116, 187);
	height: 56px;
	padding: 0 16px;
	align-items: center;
	justify-content: space-between;
}
</style>
