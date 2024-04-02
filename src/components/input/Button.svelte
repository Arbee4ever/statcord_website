<script lang='ts'>
	import { createEventDispatcher } from 'svelte';

	export let url: any = undefined;
	export let color = '#000000';
	export let width = 'min-content';
	const backgroundColor = color + '40';
	const shadowColor = color + '5E';
	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('click');
	}
</script>

<a
	href={url}
	style='--shadowColor: {shadowColor}; --backgroundColor: {backgroundColor}; --width: {width}'
	on:mousedown={handleClick}
	class='button card {$$props.class}'
>
	<slot />
</a>

<style>
    .button {
				display: grid;
        cursor: pointer;
        white-space: nowrap;
        background-color: var(--backgroundColor);
        box-shadow: 0 0 32px 0 var(--shadowColor);
        border-radius: 5px;
        padding: 5px;
        width: var(--width);
        text-align: center;
    }

    .button:hover {
        filter: brightness(90%);
    }
</style>
