<template>
	<div class="Two">
		<h1>2</h1>
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