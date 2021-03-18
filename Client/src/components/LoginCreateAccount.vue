<template>
<div id="login_create_account">
	<v-card v-show="showError" elevation="2" max-width="750" color="red" class="mx-auto">
		<v-toolbar color="red" flat>
			<v-toolbar-title>Error</v-toolbar-title>
			<v-spacer/>
			<v-btn @click="hideError()" icon>
				<v-icon>mdi-close</v-icon>
			</v-btn>
		</v-toolbar>
		<v-card-text>{{errorToDisplay}}</v-card-text>
	</v-card>
	<v-container>
		<v-row>
			<!-- <v-spacer/> -->
			<v-col>
				<v-form ref="loginForm" v-model="validLogin">
					<h1>Log In</h1>
					<v-text-field v-model="email" :rules="[rules.required, rules.emailMatch, rules.maxLength80]" label="E-mail"></v-text-field>
					<v-text-field v-model="password" :rules="[rules.required, rules.passwordMatch, rules.minLength, rules.maxLength255]" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword" label="Password"></v-text-field>
					<v-btn :disabled="!validLogin" @click="login()">Submit</v-btn>
				</v-form>
			</v-col>
			<v-col>
				<v-form ref="signupForm" v-model="validSignup">
					<h1>Sign Up</h1>
					<v-text-field v-model="newEmail" :rules="[rules.required, rules.emailMatch, rules.maxLength80]" label="E-mail"></v-text-field>
					<v-text-field v-model="newUsername" :rules="[rules.required, rules.maxLength80]" label="Username"></v-text-field>
					<v-text-field v-model="newPassword" :rules="[rules.required, rules.passwordMatch, rules.minLength, rules.maxLength255]" :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showNewPassword ? 'text' : 'password'" @click:append="showNewPassword = !showNewPassword" label="Password"></v-text-field>
					<v-text-field v-model="newPasswordRepeat" :rules="[rules.required, rules.passwordMatch, rules.minLength, rules.maxLength255, isPasswordSame(this.newPassword, this.newPasswordRepeat)]" :append-icon="showNewPasswordRepeat ? 'mdi-eye' : 'mdi-eye-off'" :type="showNewPasswordRepeat ? 'text' : 'password'" @click:append="showNewPasswordRepeat = !showNewPasswordRepeat" label="Repeat Password"></v-text-field>
					<v-btn :disabled="!validSignup" @click="register()">Submit</v-btn>
				</v-form>
			</v-col>
			<!-- <v-spacer/> -->
		</v-row>
	</v-container>
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
	private showPassword = false;

	//Sign Up Vars
	private newEmail = "";
	private newUsername = "";
	private newPassword = "";
	private showNewPassword = false;
	private newPasswordRepeat = "";
	private showNewPasswordRepeat = false;

	//Error Vars
	private showError = false;
	private errorToDisplay = "";

	//Client-Side Validation
	private validLogin = false;
	private validSignup = false;
	private rules =
	{
		emailMatch: (input: string) =>
		{
			const regex = /^[A-z0-9]+@[A-z0-9]+\.[A-z0-9]+$/
			return regex.test(input) || "Invalid e-mail"
		},
		passwordMatch: (input: string) =>
		{
			const regex = /^[A-z0-9]+$/
			return regex.test(input) || "Invalid password"
		},
		maxLength80: (input: string) => input.length <= 80 || "Too long",
		maxLength255: (input: string) => input.length <= 255 || "Too long",
		minLength: (input: string) => input.length >= 8 || "Too short",
		required: (input: string) => !!input || "Required"
	};

	private async register()
	{
		try
		{
			const response = await Request.register(
			{
			email: this.newEmail,
			username: this.newUsername,
			password: this.newPassword
			});

			console.log(response);
			store.dispatch("setTokenAction", response.data.token);
			store.dispatch("setUserAction", response.data.userDocument.username);
			this.hideError();
		}
		catch (error)
		{
			this.showErrorWithMsg(error.response.data.message)
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
			this.hideError();
		}
		catch (error)
		{
			this.showErrorWithMsg(error.response.data.message)
		}
	}

	private isPasswordSame(password1: string, password2: string): boolean | string
	{
		return (password1 === password2) || "Password is not the same";
	}

	private showErrorWithMsg(msg: string)
	{
		this.errorToDisplay = msg;
		this.showError = true;
	}
	
	private hideError()
	{
		this.errorToDisplay = "";
		this.showError = false;
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
