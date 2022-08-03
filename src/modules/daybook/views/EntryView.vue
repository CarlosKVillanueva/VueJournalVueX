<template>
	<template v-if="entry">

		<div class="entry-title d-flex justify-content-between p-2">
			<div>
				<span class="text-success fs-3 fw-bold">{{ day }}</span>
				<span class="mx-1 fs-3">{{ month }}</span>
				<span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
			</div>

			<div>
				<button class="btn btn-danger mx-2">
					Borrar <i class="fa fa-trash-alt"/>
				</button>
				<button class="btn btn-primary mx-2">
					Subir Foto <i class="fa fa-upload"/>
				</button>
			</div>
		</div>


		<div class="d-flex flex-column px-3 h-75">
			<textarea placeholder="Que sucedio hoy?" v-model="entry.text"></textarea>
		</div>

	</template>
	<FabComponent
		icon="fa-save"
	/>

	<img src="https://culturageek.com.ar/wp-content/uploads/2022/07/pjimage-4-3.jpg" alt="entry-picture" class="img-thumbnail">

</template>

<script>
import { defineAsyncComponent } from "vue"
import { mapGetters } from "vuex";
import getDayMonthYear from "@/modules/daybook/helpers/getDayMonthYear"

export default {
	props: {
		id: {
			type: String,
			required: true
		},
	},
	components: {
		FabComponent: defineAsyncComponent( () => import('../components/FabComponent') )
	},
	data() {
		return {
			entry: null
		}
	},
	computed: {
		...mapGetters( 'journal', [ 'getEntriesByID' ] ),
		day() {
			const { day } = getDayMonthYear( this.entry.date )
			return day
		},
		month() {
			const { month } = getDayMonthYear( this.entry.date )
			return month
		},
		yearDay() {
			const { yearDay } = getDayMonthYear( this.entry.date )
			return yearDay
		},
	},

	methods: {
		loadEntry() {
			const entry = this.getEntriesByID( this.id )
			if ( !entry ) return this.$router.push( { name: 'no-entry' } )

			this.entry = entry
		},
	},

	created() {
		this.loadEntry()
	},

	watch: {
		id() {
			this.loadEntry()
		},
	},

}
</script>

<style lang="scss" scoped>

textarea {
	border: none;
	font-size: 20px;
	height: 100%;

	&:focus {
		outline: none;
	}
;

}

img {
	bottom: 150px;
	box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
	position: fixed;
	right: 20px;
	width: 500px;
}
</style>