<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Messagebuilder from './discordmessage/Messagebuilder.svelte';

	export let value: any = '';
	export let type: any = 'text';
	export let id: any = '';
	export let placeholder = '';
	export let label = '';
	export let width = '';
	export let checked = false;
	const dispatch = createEventDispatcher();
	let input: any;

	function onChange() {
		dispatch('change', {
			value: id,
			newValue: input.value
		});
	}
</script>

<div class="holder" style="--width: {width}">
	<label>
		{#if label}
			<p>{label}</p>
		{/if}
		{#if type == 'color'}
			<input {type} class="card color" on:change={onChange} bind:this={input} {value} />
		{:else if type == 'message'}
			<Messagebuilder {value} on:change={onChange} bind:this={input} />
		{:else}
			<input
				{placeholder}
				class="card input"
				{type}
				on:change={onChange}
				bind:this={input}
				{value}
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
		padding: 5px;
		background-color: white;
		height: 100%;
		width: 100%;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
