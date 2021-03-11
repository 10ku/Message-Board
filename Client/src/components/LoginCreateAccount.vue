<template>
<div id="login_create_account">
	<section>
		<div v-show="showError" class="error-box">
			<h1>ERROR!!!!</h1>
			<p>{{errorToDisplay}}</p>
		</div>
	</section>
	<section>
		<div class="grid-container">
			<div class="grid-item title1">
				<h1>Log In</h1>
			</div>
			<div class="grid-item title2">
				<h1>Sign Up</h1>
			</div>
			<div class="grid-item body1">
				<label for="email">Email</label><br>
				<input v-model="email" id="email"><br>
				<label for="password">Password</label><br>
				<input v-model="password" id="password"><br>
				<input @click="login()" type="submit" value="Submit">
			</div>
			<div class="grid-item body2">
				<label for="new-email">Email</label><br>
				<input v-model="newEmail" id="new-email"><br>
				<label for="new-user">Username</label><br>
				<input v-model="newUsername" id="new-user"><br>
				<label for="new-password">Password</label><br>
				<input v-model="newPassword" id="new-password"><br>
				<label for="new-password-repeat">Repeat Password</label><br>
				<input v-model="newPasswordRepeat" id="new-password-repeat"><br>
				<input @click="register()" type="submit" value="Submit">
			</div>
		</div> 
	</section>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Request from "../services/Request";
import store from "../store/store"

@Component
export default class LoginCreateAccount extends Vue
{
	//Login Vars
	private email = "";
	private password = "";

	//Sign Up Vars
	private newEmail = "";
	private newUsername = "";
	private newPassword = "";
	private newPasswordRepeat = "";

	//Error Vars
	private showError = false;
	private errorToDisplay = "";

	private async register()
	{
		if (!this.doesPasswordMatch(this.newPassword, this.newPasswordRepeat))
		{
			this.errorToDisplay = "Password not the same!";
			this.showError = true;
			return;
		}
		try
		{
			const response = await Request.register(
			{
			email: this.newEmail,
			username: this.newUsername,
			password: this.newPassword
			});

			console.log(response);
			store.dispatch("setToken", response.data.token)
			store.dispatch("setUser", response.data.userDocument.username)
			this.errorToDisplay = "";
			this.showError = false;
		}
		catch (error)
		{
			this.errorToDisplay = error.response.data.message;
			this.showError = true;
		}
	}

	private async login()
	{
		try
		{
			const response = await Request.login(
			{
			email: this.email,
			password: this.password
			});

			console.log(response);
			store.dispatch("setTokenAction", response.data.token)
			store.dispatch("setUserAction", response.data.userDocument.username)
			this.errorToDisplay = "";
			this.showError = false;
		}
		catch (error)
		{
			this.errorToDisplay = error.response.data.message;
			this.showError = true;
		}
	}

	private doesPasswordMatch(password1: string, password2: string): boolean
	{
		return password1 === password2;
	}
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
.error-box
{
	background-color: red;
	position: absolute;
	width: 25%;
	top: 48px;
	left: 38%;
}
</style>
