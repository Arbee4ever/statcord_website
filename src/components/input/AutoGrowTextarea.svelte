<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { autoresize } from 'svelte-textarea-autoresize'


	export let value = '';
	export let id: string
	export let placeholder = '';
	let textarea: HTMLTextAreaElement;
	const dispatch = createEventDispatcher();

	function onInput() {
		dispatch('input', {
			value: id,
			newValue: textarea.value
		});
	}
</script>

<textarea use:autoresize bind:value bind:this={textarea} {placeholder} on:input={onInput} />

<style>
	textarea {
		resize: none;
		overflow-x: scroll;
		overflow: hidden;
	}
</style>
