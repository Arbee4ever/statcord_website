<script lang='ts'>
	import { createEventDispatcher } from 'svelte';
	import { autoresize } from 'svelte-textarea-autoresize';

	export let value;

	function init() {
		if (value == undefined) {
			value = "";
		}
	}
	export let id: string;
	export let placeholder = '';
	const dispatch = createEventDispatcher();

	function onInput(event) {
		dispatch('input', event.detail);
	}
</script>

<textarea use:autoresize bind:value {placeholder} on:click={init} on:input={onInput} />

<style>
    textarea {
        resize: none;
        overflow-x: scroll;
        overflow: hidden;
    }
</style>
