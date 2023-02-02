<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Messagebuilder from './discordmessage/Messagebuilder.svelte';

	export let value: any = '';
	export let type: any = 'text';
	export let id: any;
	export let placeholder = '';
	export let label = '';
	export let width = '';
	export let checked = false;
	export let editable = true;
	const dispatch = createEventDispatcher();

	const onInput = (e) => {
		value = type.match(/^(number|range)$/) ? +e.target.value : e.target.value;
		value = type.match(/^(checkbox)$/) ? e.target.checked : value;
		dispatch('input', {
			id: id,
			value: value
		});
	};
</script>

<div class="holder" style="--width: {width}">
	{#if label}
		<p>{label}</p>
	{/if}
	{#if type == 'color'}
		<input contenteditable={editable} {type} {value} class="card color" on:input={onInput} />
	{:else if type == 'message'}
		<Messagebuilder on:input={onInputComponent} bind:value />
	{:else if type == 'checkbox'}
		<input readonly={!editable} class="card checkbox" on:input={onInput} type="checkbox" bind:checked={checked} />
	{:else}
		<input
			readonly={!editable}
			{placeholder}
			class="card input"
			{type}
			{value}
			on:input={onInput}
		/>
	{/if}
</div>

<style lang="scss">
	.holder {
		align-items: center;
		height: fit-content;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1vh;

		.input {
			resize: none;
			padding: 15px;
			color: white;
			border: none;
			width: var(--width, 100%);
		}

		.input:focus {
			outline: rgba(0, 0, 0, 0.25) solid;
		}

		input[type='number'] {
			appearance: textfield;
			-moz-appearance: textfield;
			-webkit-appearance: textfield;
		}

		.color {
			padding: 0;
			background-color: var(--color);
			border: rgba(0, 0, 0, 0.25) solid;
			border-radius: 0;
			height: 100%;
			width: 100%;
		}

		.color:active {
			border: rgba(0, 0, 0, 0.5) solid;
		}

		.checkbox {
			margin-right: 0;
		}

		input::-webkit-outer-spin-button,
		input::-webkit-inner-spin-button {
			-webkit-appearance: none;
			margin: 0;
		}
	}
</style>
