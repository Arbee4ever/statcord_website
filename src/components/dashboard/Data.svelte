<script lang="ts">
	import Input2 from '$components/input/Input2.svelte';
	import { createEventDispatcher } from 'svelte';
	export let category: any;
	const dispatch = createEventDispatcher();

	const onChange = () => {
		dispatch('change');
	};
</script>

<Input2 label="Delete Userdata on Leave">
	<input
		class="card checkbox"
		on:change={onChange}
		type="checkbox"
		bind:checked={category.deleteonleave}
	/>
</Input2>

<style lang="scss">
	.card {
		background-color: transparent;
		box-shadow: none;
		border: solid 4px #00000040;
	}
</style>
