<template>
	<div class="LoginRegister">
		<LoginCreateAccount/>
	</div>
</template>

<script>
import LoginCreateAccount from "@/components/LoginCreateAccount.vue"

export default {
	name: "LoginRegister",
	components: {
		LoginCreateAccount
	}
}
</script>