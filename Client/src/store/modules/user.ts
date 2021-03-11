import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators"

@Module
export default class UserModule extends VuexModule
{
	token = "";
	user = "";
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
}