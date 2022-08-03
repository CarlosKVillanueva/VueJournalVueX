<template>
	<div class="entry-list-container">
		<div class="px-2 pt-2">
			<input type="text" class="form-control" placeholder="Buscar entradas">
		</div>
	</div>

	<div class="entry-scroll-area">
		<EntryComponent v-for="item in 100" :key="item"/>
	</div>
</template>

<script>
import { defineAsyncComponent } from "vue"

export default {
	components:{
		EntryComponent: defineAsyncComponent(() => import('./EntryComponent'))
	}
}
</script>

<style lang="scss" scoped>

input {
	height: 25px;
}
.entry-list-container {
	//border-right: 1px solid #2c3e50;
	height: calc( 100vh - 870px );
}
.entry-scroll-area {
	height: calc(100vh - 110px);
	overflow: scroll;
}
</style>