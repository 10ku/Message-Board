<template>
<div id="login_create_account">
	<section>
		<div class="grid-container">
			<div class="grid-item title1">
				<h1>Log In</h1>
			</div>
			<div class="grid-item title2">
				<h1>Sign Up</h1>
			</div>
			<div class="grid-item body1">
				<label for="user-email">Username or Email</label><br>
				<input id="user-email"><br>
				<label for="password">Password</label><br>
				<input id="password"><br>
				<input type="submit" value="Submit">
			</div>
			<div class="grid-item body2">
				<label for="new-user">Username</label><br>
				<input id="new-user"><br>
				<label for="new-email">Email</label><br>
				<input id="new-email"><br>
				<label for="new-password">Password</label><br>
				<input id="new-password"><br>
				<label for="new-password-repeat">Repeat Password</label><br>
				<input id="new-password-repeat"><br>
				<input type="submit" value="Submit">
			</div>
		</div> 
	</section>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class LoginCreateAccount extends Vue
{
	// @Prop() private msg!: string;
}
</script>

<style scoped>
.grid-container
{
	display: grid;
	grid-template-columns: auto auto;
	max-width: 75%;
	margin-top: 4%;
	margin-left: auto;
	margin-right: auto;
}
.grid-item
{
	background-color: rgba(61, 104, 42, 0.8);
	border: 1px solid rgba(0, 0, 0, 0.8);
	padding: 20px;
	font-size: 30px;
	text-align: center;
}
/* button
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
} */
</style>
