<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	let showItems = false;

	function handleClick() {
		showItems = !showItems;
	}
</script>

<div class="card" id="dropdown" on:mousedown={handleClick}>
	<div class="elementList" transition:slide>
		<slot name="selected" />
	</div>
	{#if showItems}
		<div class="elementList" transition:slide>
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	.elementName {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.elementList {
		margin-top: 1vh;
		display: grid;
		gap: 1vh;

		:global(a) {
			box-shadow: none;
		}
	}

	#dropdown {
		cursor: pointer;
		line-height: 5vh;
		width: 100%;
		max-height: min-content;
		overflow: hidden;
	}
</style>
