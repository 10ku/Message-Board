import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"

export interface AvatarBase64 extends Object
{
	contentType: string;
	base64Img: string;
}

@Module
export default class UserModule extends VuexModule
{
	token = "";
	user = "";
	avatarBase64 = "";
	loggedIn = false;

	@Mutation
	setToken(token: string)
	{
		this.token = token;

		if (token)
		{
			this.loggedIn = true;
		}
		else
		{
			this.loggedIn = false;
		}
	}

	@Mutation
	setUser(user: string)
	{
		this.user = user;
	}

	@Mutation
	setAvatar(avatar: AvatarBase64)
	{
		if (!avatar)
		{
			this.avatarBase64 = "";
			return;
		}
		this.avatarBase64 = "data:" + avatar.contentType + ";base64," + avatar.base64Img;
	}

	@Action({ commit: "setToken" })
	setTokenAction(token: string)
	{
		return token;
	}

	@Action({ commit: "setUser" })
	setUserAction(user: string)
	{
		return user;
	}

	@Action({ commit: "setAvatar" })
	setAvatarAction(avatar: object)
	{
		return avatar;
	}
}