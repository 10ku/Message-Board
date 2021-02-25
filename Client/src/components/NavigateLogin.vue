<template>
<div id="navigate_login">
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	<div class="flex-container">
		<div class="bar-left">
			<router-link to="/" tag="button" class="flex-item material-icons">home</router-link>
		</div>
	</div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Navigate extends Vue
{
}
</script>

<style scoped>
div.flex-container
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
