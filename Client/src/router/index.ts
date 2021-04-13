import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
	{
		path: "/",
		name: "Root",
		component: () => import("../views/Root.vue")
	},
	{
		path: "/loginregister",
		name: "LoginRegister",
		component: () => import("../views/LoginRegister.vue")
	},
	{
		path: "/createpost",
		name: "CreatePost",
		component: () => import("../views/CreatePost.vue")
	}
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})

export default router