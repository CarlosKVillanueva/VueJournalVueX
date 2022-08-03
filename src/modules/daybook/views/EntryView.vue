<template>
	<div class="entry-title d-flex justify-content-between p-2">
		<div>
			<span class="text-success fs-3 fw-bold">01</span>
			<span class="mx-1 fs-3">Agosto</span>
			<span class="mx-2 fs-4 fw-light">2022, lunes</span>
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
		<textarea placeholder="Que sucedio hoy?"></textarea>
	</div>

	<FabComponent
		icon="fa-save"
	/>

	<img src="https://culturageek.com.ar/wp-content/uploads/2022/07/pjimage-4-3.jpg" alt="entry-picture" class="img-thumbnail">

</template>

<script>
import { defineAsyncComponent } from "vue"

export default {
	components: {
		FabComponent: defineAsyncComponent(() => import('../components/FabComponent'))
	}
}
</script>

<style lang="scss" scoped>

	textarea {
		border: none;
		font-size: 20px;
		height: 100%;

		&:focus{
			outline: none;
		};

	}

	img {
		bottom: 150px;
		box-shadow: 0px 5px 10px rgba($color: #000000, $alpha:0.2);
		position: fixed;
		right: 20px;
		width: 500px;
	}
</style>