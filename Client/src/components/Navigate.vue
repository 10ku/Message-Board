<template>
<div id="navigate">
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<div class="flex-container">
		<div class="bar-left">
			<router-link to="/" class="flex-item material-icons">home</router-link>
		</div>
		<div class="bar-center">
			<input class="flex-item search-bar" placeholder="Search">
			<button class="flex-item material-icons">search</button>
		</div>
		<div class="bar-right">
			<router-link to="/login" tag="button" class="flex-item material-icons">account_circle</router-link>
			<button class="flex-item material-icons">arrow_drop_down</button>
		</div>
	</div>
	<h1>Hello</h1>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Navigate extends Vue
{
	// @Prop() private msg!: string;
}
</script>

<style scoped>
.flex-container
{
	display: flex;
	color: white;
	background: rgb(69, 116, 187);
	border-bottom: 1px solid rgb(0, 99, 168);
	height: 48px;
	padding: 0 16px;
	align-items: center;
	justify-content: space-between;
}
button
{
	border: none;
	color: white;
	background: transparent;
	cursor: pointer;
}
.bar-center
{
	flex: 0 1 664px;
}
.search-bar
{
	width: 80%;
	font-size: 18px;
}
</style>
