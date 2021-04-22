<template>
<div id="error_alert">
	<div class="errorSpace">
		<v-alert v-model="showError" type="error" transition="scale-transition">{{errorToDisplay}}</v-alert>
	</div>
</div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from "vue-property-decorator";

@Component
export default class ErrorAlert extends Vue
{
	@Prop() private showError = false;
	@Prop() private errorToDisplay = "";

	public showErrorWithMsg(msg: string)
	{
		this.errorToDisplay = msg;
		this.showError = true;
	}
	
	public hideError()
	{
		this.errorToDisplay = "";
		this.showError = false;
	}
}
</script>

<style scoped>
.errorSpace
{
	height: 68px;
}
</style>
