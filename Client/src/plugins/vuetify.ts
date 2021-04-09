import Vue from "vue"
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"

Vue.use(Vuetify)

const opts =
{
	theme:
	{
		dark: true,
		themes:
		{
			dark:
			{
				primary: "#4067b5",
				secondary: "#424242",
				accent: "#5768c7",
				error: "#b54040",
				info: "#347cbc",
				success: "#46914c",
				warning: "#b57340"
			}
		}
	}
}

export default new Vuetify(opts)