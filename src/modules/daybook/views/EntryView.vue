<template>
	<template v-if="entry">

		<div class="entry-title d-flex justify-content-between p-2">
			<div>
				<span class="text-success fs-3 fw-bold">{{ day }}</span>
				<span class="mx-1 fs-3">{{ month }}</span>
				<span class="mx-2 fs-4 fw-light">{{ yearDay }}</span>
			</div>

			<div>

				<input
					v-show="false"
					type="file"
					@change="onSelectedImage"
					ref="imageSelector"
				>
				<button
					class="btn btn-danger mx-2"
					@click="onDeleteEntry"
					v-if="entry.id"
				>
					Borrar <i class="fa fa-trash-alt"/>
				</button>

				<button
					class="btn btn-primary mx-2"
					@click="onSelectImage"
				>
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
		@on:click="saveEntry"
	/>

	<img
		v-if="entry.picture && !localImage"
		:src="entry.picture"
		alt="entry-picture"
		class="img-thumbnail">

	<img
		v-if="localImage"
		:src="localImage"
		alt="entry-picture"
		class="img-thumbnail"
	>
</template>

<script>
import { defineAsyncComponent } from "vue"
import { mapActions, mapGetters } from "vuex";
import getDayMonthYear from "@/modules/daybook/helpers/getDayMonthYear"
import Swal from 'sweetalert2'
import uploadImage from "@/modules/daybook/helpers/uploadImage"


export default {
	name:'EntryView',
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
			entry: null,
			localImage: null,
			file: null
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
		...mapActions( 'journal', [ 'updateEntry', 'createEntry', 'deleteEntry' ] ),
		loadEntry() {
			let entry
			if ( this.id === 'new' ) {
				entry = {
					text: '',
					date: new Date().getTime()
				}
			} else {
				entry = this.getEntriesByID( this.id )
				if ( !entry ) return this.$router.push( { name: 'no-entry' } )
			}


			this.entry = entry
		},
		async saveEntry()
		{

			new Swal({
				title: 'Espere por favor',
				allowOutsideClick: false
			})
			Swal.showLoading()

			this.entry.picture = await uploadImage( this.file )


			if ( this.entry.id ) {
				await this.updateEntry( this.entry )
			} else {
				const id = await this.createEntry( this.entry )

				this.$router.push( { name: 'entry', params: { id } } )
			}

			this.file = null
			await Swal.fire( 'Guardado', 'Entrada guardada con Exito', 'success' )
		}
,
		async onDeleteEntry() {
			const { isConfirmed } = await Swal.fire({
				title: 'Esta Seguro?',
				text: 'Una vez borrado, no se puede recuperar...',
				showDenyButton: true,
				confirmButtonText: 'Si, estoy seguro'
			} )

			if ( isConfirmed ) {
				new Swal({
					title: 'Espere por favor',
					allowOutsideClick: false
				})

				Swal.showLoading()
				await this.deleteEntry( this.entry.id )
				this.$router.push( { name: 'no-entry' } )
				await Swal.fire( 'Eliminado', '', 'success' )
			}
		},
		onSelectedImage( event ) {
			const file = event.target.files[0]
			if ( !file ) {
				this.localImage = null
				this.file = null
				return
			}

			this.file = file

			const fr = new FileReader()
			fr.onload = () => this.localImage = fr.result
			fr.readAsDataURL(file)

		},
		onSelectImage() {
			this.$refs.imageSelector.click()
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