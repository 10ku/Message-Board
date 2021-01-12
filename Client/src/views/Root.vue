<template>
	<div class="Root">
		<MyComponent/>
	</div>
</template>

<script>
import MyComponent from '@/components/MyComponent.vue'

export default {
	name: 'Root',
	components: {
		MyComponent
	}
}
</script>
