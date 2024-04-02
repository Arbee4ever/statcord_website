<script lang="ts">
	import Input from '$components/input/Input.svelte';
	import { createEventDispatcher } from 'svelte';
	export let category: any;
	const dispatch = createEventDispatcher();

	const onChange = () => {
		dispatch('change');
	};
</script>

<Input label="Seconds in voicechat / Point">
	<input
		class="card input"
		on:input={onChange}
		type="number"
		bind:value={category.vcsecondsperpoint}
	/>
</Input>
<Input label="Messages / Point">
	<input class="card input" on:input={onChange} type="number" bind:value={category.msgsperpoint} />
</Input>
<Input label="Cooldown (in ms)">
	<input class="card input" on:input={onChange} type="number" bind:value={category.cooldown} />
</Input>

<style lang="scss">
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

	input[type='number'] {
		appearance: textfield;
		-moz-appearance: textfield;
		-webkit-appearance: textfield;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
