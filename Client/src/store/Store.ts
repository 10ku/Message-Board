import Vue from "vue"

export const store = Vue.observable(
{
	token: "",
	user: "",
	loggedIn: false
});

export const mutations = {
setToken(token: string)
{
	store.token = token;

	if (token)
	{
		store.loggedIn = true;
	}
	else
	{
		store.loggedIn = false;
	}
},

setUser(user: string)
{
	store.user = user;
}
};