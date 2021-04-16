<template>
<div id="app_example">
	<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
	<link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
	<v-app>
		<v-app-bar app flat>
			<v-btn to="/" icon>
				<v-icon>mdi-home</v-icon>
			</v-btn>
			<v-spacer/>
			<v-text-field label="Search">
				<v-icon slot="append">mdi-magnify</v-icon>
			</v-text-field>
			<v-spacer/>
			<v-btn v-if="!$store.state.UserModule.loggedIn" to="/loginregister" icon>
				<v-icon>mdi-account</v-icon>
			</v-btn>
			<v-btn v-if="$store.state.UserModule.loggedIn" to="/settings" icon>
				<v-avatar>
					<v-img :src="$store.state.UserModule.avatarBase64"></v-img>
				</v-avatar>
			</v-btn>
			<v-menu offset-y bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn v-bind="attrs" v-on="on" icon>
						<v-icon>mdi-dots-vertical</v-icon>
					</v-btn>
				</template>
				<v-list>
					<v-list-item v-if="!$store.state.UserModule.loggedIn" to="/loginregister">
						<v-list-item-title>Log In</v-list-item-title>
					</v-list-item>
					<v-list-item v-if="$store.state.UserModule.loggedIn" to="/createpost">
						<v-list-item-title>Create Post</v-list-item-title>
					</v-list-item>
					<v-list-item v-if="$store.state.UserModule.loggedIn" to="/settings">
						<v-list-item-title>Settings</v-list-item-title>
					</v-list-item>
					<v-list-item v-if="$store.state.UserModule.loggedIn" @click="logout()">
						<v-list-item-title>Log Out</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>
		<v-main>
			<v-container fluid>
				<router-view/>
			</v-container>
		</v-main>
	</v-app>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue
{
	private logout()
	{
		this.$store.dispatch("setTokenAction", null);
		this.$store.dispatch("setUserAction", null);
		this.$store.dispatch("setAvatarAction", null);
		
		if (this.$route.name !== "Root")
		{
			this.$router.push("/");
		}
	}
}
</script>

<style>
</style>