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
				<v-form ref="avatarForm" v-model="validAvatar">
					<v-file-input v-model="uploadedImage" :rules="[rules.required, rules.maxSize1MiB, isImage(this.uploadedImage)]" accept="image/png, image/jpeg, image/bmp, image/gif" label="Upload Avatar" @change="setAvatar()" @click:clear="clearAvatar()"></v-file-input>
					<v-btn :disabled="!validAvatar" @click="uploadAvatar()">Upload Avatar</v-btn>
				</v-form>
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
	private token = "";
	private contentType = "";
	private base64URL: string | ArrayBuffer | null = "";
	private base64Img = "";
	private validFormats = ["image/png", "image/jpeg", "image/bmp", "image/gif"]
	private accountError = new ErrorAlert();

	//Client-Side Validation
	private validAvatar = false;
	private rules =
	{
		maxSize1MiB: (input: File) => !input || input.size < 1048576 || "File size should be 1 MiB or less",
		required: (input: File) => !!input || "Required"
	};

	private setAvatar()
	{
		if (!this.uploadedImage)
		{
			return;
		}

		const reader = new FileReader();
		reader.readAsDataURL(this.uploadedImage);
		reader.onload = () =>
		{
			//Here for type checking
			if (!this.uploadedImage)
			{
				return;
			}

			this.base64URL = reader.result;
			this.username = this.$store.state.UserModule.user;
			this.token = this.$store.state.UserModule.token;
			this.contentType = this.uploadedImage.type;
			this.base64Img = (this.base64URL as string).split(",")[1]
			this.accountError.hideError();
		}
		reader.onerror = () =>
		{
			this.accountError.showErrorWithMsg("Reader Error");
		}
	}

	private clearAvatar()
	{
		this.base64URL = "";
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
			},
			{
				headers:
				{
					Authorization: "Bearer " + this.token
				}
			});

			// console.log(response);
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

	private isImage(file: File): boolean | string
	{
		if (!file)
		{
			return false;
		}

		let isImage = false;

		for (let i = 0; i < this.validFormats.length; i++)
		{
			if (file.type === this.validFormats[i])
			{
				isImage = true;
				break;
			}
		}

		return isImage || "File Is Not a Image!";
	}
}
</script>

<style scoped>
</style>