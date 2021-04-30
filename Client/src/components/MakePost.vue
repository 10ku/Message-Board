<template>
<div id="make_post">
	<ErrorAlert :showError="makePostError.showError" :errorToDisplay="makePostError.errorToDisplay"/>
	<v-text-field v-model="title" label="Title"></v-text-field>
	<v-textarea filled v-model="text" label="Text"></v-textarea>
	<v-btn @click="makePost()">Submit</v-btn>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ErrorAlert from "./ErrorAlert.vue"
import Request from "../services/Request";

@Component(
{
	components:
	{
		ErrorAlert
	}
})
export default class MakePost extends Vue
{
	private title = "";
	private text = "";
	private makePostError = new ErrorAlert();

	private async makePost()
	{
		try
		{
			const response = await Request.makePost(
			{
				title: this.title,
				poster: this.$store.state.UserModule.user,
				text: this.text
			},
			{
				headers:
				{
					Authorization: "Bearer " + this.$store.state.UserModule.token
				}
			});

			console.log(response);
			this.makePostError.hideError();
			this.$router.push("/")
		}
		catch (error)
		{
			if (!error.response)
			{
				this.makePostError.showErrorWithMsg("Could not reach server!")
			}
			else
			{
				this.makePostError.showErrorWithMsg(error.response.data.message)
			}
		}
	}
}
</script>

<style scoped>
</style>