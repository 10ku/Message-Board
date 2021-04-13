<template>
<div id="make_post">
	<v-text-field v-model="title" label="Title"></v-text-field>
	<v-textarea filled v-model="text" label="Text"></v-textarea>
	<v-btn @click="makePost()">Submit</v-btn>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Request from "../services/Request";

@Component
export default class MakePost extends Vue
{
	private title = "";
	private text = "";

	private async makePost()
	{
		try
		{
			const response = await Request.makePost(
			{
				title: this.title,
				poster: this.$store.state.UserModule.user,
				text: this.text
			});

			console.log(response);
			this.$router.push("/")
		}
		catch (error)
		{
			console.log(error);
		}
	}
}
</script>

<style scoped>
</style>