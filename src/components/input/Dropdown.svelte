<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	export let elements: any;
	let slot;
	let showItems = false;
	const dispatch = createEventDispatcher();

	function handleClick() {
		showItems = !showItems;
	}

	function updateCategory(category: any) {
		handleClick();
		dispatch('click', {
			category: category
		});
	}
</script>

<div class="card" id="dropdown">
	{#if elements}
		<div class="element" on:click={handleClick}>
			<p bind:this={slot}><slot /></p>
		</div>
		<div class="elementList">
			{#if showItems}
				{#if elements}
					{#each elements as el}
						<p
							class="elementName elements card"
							transition:slide
							on:click={() => updateCategory(el)}
						>
							{el.name}
						</p>
					{/each}
				{/if}
			{/if}
		</div>
	{/if}
</div>

<style>
	.elementName {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.elementList {
		z-index: 1;
	}

	.element,
	.elements {
		display: flex;
	}

	.elements {
		margin-top: 1vh;
		box-shadow: none;
	}

	#dropdown {
		cursor: pointer;
		line-height: 5vh;
		width: 100%;
		max-height: min-content;
		overflow: hidden;
	}
</style>
