<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let url = '';
	export let color = '#000000';
	const backgroundColor = color + '40';
	const shadowColor = color + '5E';
	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click');
	}
</script>

<a
	href={url}
	style="--shadowColor: {shadowColor}; --backgroundColor: {backgroundColor}"
	class={$$props.class}
	on:click|preventDefault={handleClick}
>
	<div class="button card">
		<slot />
	</div>
</a>

<style>
	.button {
		white-space: nowrap;
		background-color: var(--backgroundColor);
		box-shadow: 0 0 32px 0 var(--shadowColor);
		border-radius: 5px;
		padding: 5px;
		width: min-content;
	}

	.button:hover {
		filter: brightness(90%);
	}
</style>
