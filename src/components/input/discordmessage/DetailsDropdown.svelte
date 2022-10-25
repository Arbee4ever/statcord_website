<script lang="ts">
	import { slide } from 'svelte/transition';
	import { clickOutside } from '$lib/script/clickOutside.js';

	export let placeholderIcon;
	export let icon = placeholderIcon;
	export let height = '15px';
	let expanded = false;
	let details: HTMLDivElement;
	let overflow = '0px';

	function toggleExpand() {
		expanded = !expanded;
		setTimeout(function () {
			if (expanded) {
				if (details.firstChild) {
					console.log(details.firstChild.getBoundingClientRect().right)
					if (details.firstChild.getBoundingClientRect().right >= window.innerWidth) {
						overflow = (window.innerWidth - details.firstChild.getBoundingClientRect().right) - 20 + 'px';
					}
					console.log(overflow)
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
	class="imageSelector"
	style="--height:{height}; --overflow: {overflow}"
	use:clickOutside
	on:click_outside={handleClickOutside}
>
	<img src={icon} class="imageIcon" alt="Dropdown Icon" on:click={toggleExpand} />
	<div bind:this={details}>
		{#if expanded}
			<div class="details card" transition:slide>
				<slot />
			</div>
		{/if}
	</div>
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
		transform: translateX(var(--overflow));
	}
</style>
