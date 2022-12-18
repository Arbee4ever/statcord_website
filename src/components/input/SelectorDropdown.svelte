<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import PlusIcon from '$lib/img/plusIcon.svg';
	import DetailsDropdown from './discordmessage/DetailsDropdown.svelte';
	import { scale } from 'svelte/transition';
	export let options: any;
	export let selected: any = [];

	if (selected.length > 0) {
		selected.forEach((option) => {
			var found = options.filter(function (item) {
				return item.id === option.id;
			});
			const index = options.indexOf(found[0]);
			if (index != -1) {
				options.splice(index, 1);
			}
		});
	}

	const dispatch = createEventDispatcher();

	function selectOption(option) {
		var index = options.indexOf(option);
		var index2 = selected.indexOf(option);
		if (index !== -1) {
			selected.push(option);
			options.splice(options.indexOf(option), 1);
		} else if (index2 !== -1) {
			options.push(option);
			selected.splice(selected.indexOf(option), 1);
		}
		selected = selected;
		options = options;
		dispatch('select', {
			option: selected
		});
	}

	console.log(selected);
</script>

<div class="optionSelector">
	<p><slot /></p>
	<div class="optionHolder card">
		{#each selected as option}
			<p
				transition:scale
				class="card option"
				style="--color: #{option.color == 0 ? 'b9bbbe' : option.color}"
				on:click={() => selectOption(option)}
				on:keydown={() => selectOption(option)}
			>
				{#if option['color']}
					<span class="optionCircle" />
				{/if}
				{#if option.icon}
					<img
						src="https://cdn.discordapp.com/role-icons/{option.id}/{option.icon}.png"
						alt="Role Icon"
					/>
				{/if}
				{#if option.name != undefined}
					{option.name}
				{:else}
					{option.id}
				{/if}
			</p>
		{/each}
		<DetailsDropdown height="auto" icon={PlusIcon}>
			{#each options as option}
				<p
					transition:scale
					class="card option"
					style="--color: #{option.color == 0 ? 'b9bbbe' : option.color}"
					on:click={() => selectOption(option)}
					on:keydown={() => selectOption(option)}
				>
					{#if option.color}
						<span class="optionCircle" />
					{/if}
					{#if option.icon}
						<img
							src="https://cdn.discordapp.com/role-icons/{option.id}/{option.icon}.png"
							alt="Role Icon"
						/>
					{/if}
					{#if option.name != undefined}
						{option.name}
					{:else}
						{option.id}
					{/if}
				</p>
			{/each}
		</DetailsDropdown>
	</div>
</div>

<style lang="scss">
	.optionSelector {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1vh;
		align-items: center;

		.optionHolder {
			display: flex;
			padding: 15px;
			width: 100%;
		}

		.option {
			cursor: pointer;
			border-radius: 4px;
			font-size: 12px;
			font-weight: 500;
			box-sizing: border-box;
			padding: 4px;
			width: fit-content;
			height: 22px;
			margin: 4px 4px 4px 4px;
			background: #292b2f;

			.optionCircle {
				min-width: 12px;
				height: 12px;
				border-radius: 50%;
				padding: 0;
				margin: 0 4px;
				background-color: var(--color);
				z-index: 99;
				position: relative;
				display: inline-block;
			}
		}
	}
</style>
