<template>
<div id="app_example">
	<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
	<link href="https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css" rel="stylesheet">
	<v-app>
		<v-app-bar app flat color="blue">
			<v-btn to="/" icon>
				<v-icon>mdi-home</v-icon>
			</v-btn>
			<v-spacer></v-spacer>
			<v-text-field label="Search">
				<v-icon slot="append">mdi-magnify</v-icon>
			</v-text-field>
			<v-spacer></v-spacer>
			<v-btn to="/loginregister" icon>
				<v-icon>mdi-account</v-icon>
			</v-btn>
		</v-app-bar>
		<v-main>
			<v-container fluid>
				<router-view/>
			</v-container>
		</v-main>
	</v-app>
</div>
</template>

<style>
/* *
{
	box-sizing: border-box;
}
body
{
	margin: 0px;
}
#app_example
{
	font-family: Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
} */
</style>