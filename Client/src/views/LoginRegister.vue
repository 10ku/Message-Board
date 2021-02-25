<template>
	<div class="LoginRegister">
		<NavigateLogin/>
		<LoginCreateAccount/>
	</div>
</template>

<script>
import LoginCreateAccount from "@/components/LoginCreateAccount.vue"
import NavigateLogin from "@/components/NavigateLogin.vue"

export default {
	name: "LoginRegister",
	components: {
		LoginCreateAccount,
		NavigateLogin
	}
}
</script>