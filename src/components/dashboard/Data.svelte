<script lang="ts">
	import Input from '$components/input/Input.svelte';
	import { createEventDispatcher } from 'svelte';
	export let category: any;
	const dispatch = createEventDispatcher();

	const onChange = () => {
		dispatch('change');
	};
</script>

<Input label="Delete Userdata on Leave">
	<input
		class="card checkbox"
		on:change={onChange}
		type="checkbox"
		bind:checked={category.deleteonleave}
	/>
</Input>
<Input label="Automatically clear Data">
	<input class="card input" on:input={onChange} type="date" bind:value={category.cleardate} />
</Input>

<style lang="scss">
	.card {
		background-color: transparent;
		box-shadow: none;
		border: solid 4px #00000040;
	}
	.input {
		resize: none;
		padding: 15px;
		color: white;
		width: var(--width, 100%);
		background-color: transparent;
		box-shadow: none;
		border: solid 1px #00000040;
	}

	.input:focus {
		outline: rgba(0, 0, 0, 0.25) solid;
	}
</style>
