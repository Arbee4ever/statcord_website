<script lang='ts'>
	import { createEventDispatcher } from 'svelte';
	import { autoresize } from 'svelte-textarea-autoresize';

	export let autowrap: boolean = true;
	export let value;
	let localValue = '';
	export let placeholder = '';
	const dispatch = createEventDispatcher();

	let errorDisplay: HTMLParagraphElement;

	if (typeof value == 'object') {
		localValue = JSON.stringify(value, null, 2);
	}

	function init() {
		if (value == undefined) {
			value = '';
		}
	}

	function onInput() {
		if (localValue != '') {
			try {
				errorDisplay.textContent = '';
				value = JSON.parse(localValue);
			} catch (e) {
				errorDisplay.textContent = e;
			} finally {
				dispatch('input');
			}
		}
		dispatch('input');
	}
</script>

<div style='--auto-wrap: {autowrap ? "initial" : "pre"}'>
	{#if localValue === ""}
		<textarea use:autoresize bind:value {placeholder} on:click={init} on:input={onInput} />
	{:else}
		<textarea use:autoresize bind:value={localValue} {placeholder} on:click={init} on:input={onInput} />
		<p class='error' bind:this={errorDisplay}></p>
	{/if}
</div>

<style lang='scss'>
  div {
    width: 100%;
    display: flex;
    flex-direction: column;

    textarea {
      resize: none;
      white-space: var(--auto-wrap);
    }

    p {
      color: red;
    }
  }
</style>
