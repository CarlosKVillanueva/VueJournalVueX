<template>
	<div class="entry-list-container">
		<div class="px-2 pt-2">
			<input type="text" class="form-control" placeholder="Buscar entradas" v-model="term">
		</div>
	</div>

	<div class="mt-2 d-flex flex-column">
		<button class="btn btn-primary mx-3" @click="$router.push({name: 'entry', params: { id:'new' }})">
			<i class="fa fa-plus-circle"></i>
			Nueva Entrada
		</button>
	</div>

	<div class="entry-scroll-area">
		<EntryComponent v-for="entry in entriesByTerm" :key="entry.id" :entry="entry"/>
	</div>
</template>

<script>
import { defineAsyncComponent } from "vue"
import { mapGetters } from "vuex";


export default {
	components: {
		EntryComponent: defineAsyncComponent( () => import('./EntryComponent') )
	},
	computed: {
		...mapGetters( 'journal', [ 'getEntriesByTerm' ] ),
		entriesByTerm() {
			return this.getEntriesByTerm( this.term )
		},
	},
	data() {
		return {
			term: ''
		}

	},
}
</script>

<style lang="scss" scoped>

input {
	height: 25px;
}

.entry-list-container {
	//border-right: 1px solid #2c3e50;
	height: calc(100vh - 870px);
}

.entry-scroll-area {
	height: calc(100vh - 110px);
	overflow: scroll;
}
</style>