<script lang="ts">
	import { slide } from 'svelte/transition';
	import { clickOutside } from '$lib/script/clickOutside.js';

	export let placeholderIcon;
	export let icon = placeholderIcon;
	export let height = '15px';
	let expanded = false;

	function toggleExpand() {
		expanded = !expanded;
	}

	function handleClickOutside() {
		if (expanded) {
			toggleExpand();
		}
	}
</script>

<div
	class="imageSelector"
	style="--height:{height}"
	use:clickOutside
	on:click_outside={handleClickOutside}
>
	<img src={icon} class="imageIcon" alt="Dropdown Icon" on:click={toggleExpand} />
	{#if expanded}
		<div class="details card" transition:slide>
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	.imageSelector {
		width: min-content;
	}
	.imageIcon {
		cursor: pointer;
		padding: 2px;
		height: var(--height);
	}

	.details {
		z-index: 1;
		background-color: currentColor;
		position: absolute;
	}
</style>
