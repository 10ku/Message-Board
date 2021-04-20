<template>
<div id="account_settings">
	<ErrorAlert :showError="accountError.showError" :errorToDisplay="accountError.errorToDisplay"/>
	<v-container>
		<v-row>
			<v-spacer/>
			<v-col align="center">
				<v-avatar size="300">
					<v-img :lazy-src="$store.state.UserModule.avatarBase64" :src="base64URL"></v-img>
				</v-avatar>
				<v-file-input v-model="uploadedImage" accept="image/png, image/jpeg, image/bmp, image/gif" label="Upload Avatar" @change="setAvatar()"></v-file-input>
				<v-btn @click="uploadAvatar()">Upload Avatar</v-btn>
			</v-col>
			<v-spacer/>
		</v-row>
	</v-container>
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
export default class AccountSettings extends Vue
{
	private uploadedImage: File | null = null;
	private username = "";
	private contentType = "";
	private base64URL: string | ArrayBuffer | null = "";
	private base64Img = "";
	private accountError = new ErrorAlert();
	
	private setAvatar()
	{
		if (!this.uploadedImage)
		{
			this.accountError.showErrorWithMsg("No Image!");
			return;
		}

		const reader = new FileReader();
		reader.readAsDataURL(this.uploadedImage);
		reader.onload = () =>
		{
			//Here for type checking
			if (!this.uploadedImage)
			{
				this.accountError.showErrorWithMsg("No Image!");
				return;
			}

			this.base64URL = reader.result;
			this.username = this.$store.state.UserModule.user;
			this.contentType = this.uploadedImage.type;
			this.base64Img = (this.base64URL as string).split(",")[1]
			this.accountError.hideError();
		}
		reader.onerror = () =>
		{
			this.accountError.showErrorWithMsg("Reader Error");
		}
	}

	private async uploadAvatar()
	{
		try
		{
			const response = await Request.changeAvatar(
			{
				username: this.username,
				avatar:
				{
					contentType: this.contentType,
					base64Img: this.base64Img
				}
			});

			console.log(response);
			this.$store.dispatch("setAvatarAction", response.data.userDocument.avatar);
			this.accountError.hideError();
		}
		catch (error)
		{
			if (!error.response)
			{
				this.accountError.showErrorWithMsg("Could not reach server!")
			}
			else
			{
				this.accountError.showErrorWithMsg(error.response.data.message)
			}
		}
	}
}
</script>

<style scoped>
</style>