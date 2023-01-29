<script lang="ts">
	import { error } from '@sveltejs/kit';
	import XIcon from '$lib/img/xIcon.svg';
	import Input2 from '$components/input/Input2.svelte';
	import { createEventDispatcher } from 'svelte';
	import Button from '$components/input/Button.svelte';
	export let category: any;
	const dispatch = createEventDispatcher();

	function onChange() {
		dispatch('change');
	}

	const deleteOption = (i) => {
		category.errors.splice(i, 1);
		category = category;
		onChange();
	};

	function clear() {
		category.errors = [];
		category = category;
		onChange();
	}
</script>

<Button class="left fancyCard" on:click={clear}>Clear all</Button>
{#if category.errors.length != 0}
	{#each category.errors as error, i}
		<div class="card fancyCard inline">
			<p>{error}</p>
			<span class="remove iconWrapper">
				<img
					src={XIcon}
					alt="Close"
					on:click={() => deleteOption(i)}
					on:keydown={() => deleteOption(i)}
				/>
			</span>
		</div>
	{/each}
{:else}
	<div class="card content">
		<p>Nothing here yet!</p>
	</div>
{/if}

<style lang="scss">
	.content {
		padding: 10px;
		border-radius: 10px;
		width: 100%;
		color: #36393f;
		display: grid;
		gap: 1vh;
	}

	.card {
		background-color: transparent;
		box-shadow: none;
		border: solid 1px #00000040;
	}

	.inline {
		display: inline-flex;
		.remove {
			display: block;
			cursor: pointer;
			height: 22px;
			line-height: 24px;
			text-align: center;
			margin: 0 0 0 4px;
		}
	}

	:global(.left) {
		float: left;
	}

	:global(.fancyCard) {
		background-color: transparent;
		box-shadow: none;
		border: solid 1px #00000040;
	}
</style>
