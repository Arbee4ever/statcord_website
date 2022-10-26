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
	const dispatch = createEventDispatcher();
	let input: HTMLInputElement;

	function onInput() {
		dispatch('input', {
			value: id,
			newValue: input.value
		});
	}

	function onInputComponent(event) {
		dispatch('input', {
			value: id + "." + event.detail.value,
			newValue: event.detail.newValue
		});
	}
</script>

<div class="holder" style="--width: {width}">
	<label>
		{#if label}
			<p>{label}</p>
		{/if}
		{#if type == 'color'}
			<input {type} {value} class="card color" on:input={onInput} bind:this={input} />
		{:else if type == 'message'}
			<Messagebuilder on:input={onInputComponent} bind:value />
		{:else}
			<input
				{placeholder}
				class="card input"
				{type}
				{value}
				on:input={onInput}
				bind:this={input}
				{checked}
			/>
		{/if}
	</label>
</div>

<style>
	p {
		margin-right: 1vw;
	}

	.holder {
		align-items: center;
		height: min-content;
	}

	.input {
		resize: none;
		padding: 1vw;
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

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
