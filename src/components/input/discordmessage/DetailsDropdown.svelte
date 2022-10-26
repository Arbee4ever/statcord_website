<script lang="ts">
	import { slide } from 'svelte/transition';
	import { clickOutside } from '$lib/script/clickOutside.ts';

	export let placeholderIcon = '';
	export let icon;
	export let height = '15px';
	export let border_radius = '4px';
	let expanded = false;
	let details: HTMLDivElement;
	let overflow = '0px';

	function toggleExpand() {
		expanded = !expanded;
		setTimeout(function () {
			if (expanded) {
				if (details.firstChild) {
					if (details.firstChild.getBoundingClientRect().right >= window.innerWidth) {
						overflow =
							window.innerWidth - details.firstChild.getBoundingClientRect().right - 20 + 'px';
					}
				}
			}
		}, 1);
	}

	function handleClickOutside() {
		if (expanded) {
			toggleExpand();
		}
	}
</script>

<div
	class="dropdown"
	style="--height:{height}; --overflow: {overflow}; --border-radius: {border_radius}"
	use:clickOutside
	on:click_outside={handleClickOutside}
>
	{#if icon}
		<img src={icon} class="icon" alt="Dropdown Icon" on:click={toggleExpand} />
	{:else}
		<img src={placeholderIcon} class="icon" alt="Dropdown Icon" on:click={toggleExpand} />
	{/if}
	<div bind:this={details}>
		{#if expanded}
			<div class="details card" transition:slide>
				<slot />
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.dropdown {
		width: min-content;
	}

	.icon {
		cursor: pointer;
		padding: 2px;
		height: var(--height);
		border-radius: var(--border-radius);
		max-height: 300px;
		max-width: 400px;
	}

	.details {
		z-index: 1;
		background-color: currentColor;
		position: absolute;
		transform: translateX(var(--overflow));
	}
</style>
