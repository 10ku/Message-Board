import Vue from "vue"
import Vuex from "vuex"
import UserModule from "@/store/modules/user";

Vue.use(Vuex)

export default new Vuex.Store(
{
	modules:
	{
		UserModule: UserModule
	}
})