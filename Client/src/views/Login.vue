<template>
	<div class="Login">
		<NavigateLogin/>
		<LoginCreateAccount/>
	</div>
</template>

<script>
import LoginCreateAccount from '@/components/LoginCreateAccount.vue'
import NavigateLogin from '@/components/NavigateLogin.vue'

export default {
	name: 'Login',
	components: {
		LoginCreateAccount,
		NavigateLogin
	}
}
</script>