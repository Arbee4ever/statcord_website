<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import PlusIcon from '$lib/img/plusIcon.svg';
	import SettingsIcon from '$lib/img/settingsIcon.svg';
	import XIcon from '$lib/img/xIcon.svg';
	import DetailsDropdown from './discordmessage/DetailsDropdown.svelte';
	import Input2 from './Input2.svelte';
	export let options: any;
	let optionsCopy = JSON.parse(JSON.stringify(options));
	export let selected: any = [];
	let filterString: string;

	options = JSON.parse(JSON.stringify(options));
	selected = JSON.parse(JSON.stringify(selected));

	const filterCheck = () => {
		options = JSON.parse(JSON.stringify(optionsCopy)).filter(function (item) {
			return item.name.includes(filterString);
		});
	};

	const removeSelected = () => {
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
		optionsCopy = JSON.parse(JSON.stringify(options));
	};
	removeSelected();

	const dispatch = createEventDispatcher();

	const selectOption = (option: any) => {
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
		dispatch('select');
	};

	function onChange() {
		dispatch('select');
	}
</script>

<div class="optionSelector">
	<p><slot /></p>
	<div class="optionHolder card">
		<DetailsDropdown height="26px" icon={PlusIcon}>
			<span slot="filter">
				<Input2 label="Filter">
					<div class="filter">
						<input
							type="text"
							class="card input"
							bind:value={filterString}
							on:input={filterCheck}
						/>
					</div>
				</Input2>
			</span>
			{#each options as option}
				<p
					class="card option pointer"
					style="--color: #{option.color === 0 ? 'b9bbbe' : parseInt(option.color).toString(16)}"
					on:click={() => selectOption(option)}
					on:keydown={() => selectOption(option)}
				>
					{#if option.color != undefined}
						<span class="optionCircle" />
					{/if}
					{#if option.icon}
						<img
							class="optionIcon"
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
		{#each selected as option}
			<p
				class="card option"
				style="--color: #{option.color === 0 ? 'b9bbbe' : parseInt(option.color).toString(16)}"
			>
				{#if option.color != undefined}
					<span class="optionCircle" />
				{/if}
				{#if option.icon}
					<img
						class="optionIcon"
						src="https://cdn.discordapp.com/role-icons/{option.id}/{option.icon}.png"
						alt="Role Icon"
					/>
				{/if}
				{#if option.name != undefined}
					{option.name}
					<span class="iconWrapper">
						<DetailsDropdown height="auto" icon={SettingsIcon}>
							<Input2 label="Static">
								<input
									type="checkbox"
									on:input={onChange}
									class="card input"
									bind:checked={option.static}
								/>
							</Input2>
						</DetailsDropdown>
					</span>
				{:else}
					{option.id}
					<span class="iconWrapper">
						<DetailsDropdown height="auto" icon={SettingsIcon}>
							<Input2 label="Value">
								<input
									type="number"
									on:input={onChange}
									class="card input"
									bind:value={option.value}
								/>
							</Input2>
						</DetailsDropdown>
					</span>
				{/if}
				<span class="remove iconWrapper">
					<img
						src={XIcon}
						alt="Close"
						on:click={() => selectOption(option)}
						on:keydown={() => selectOption(option)}
					/>
				</span>
			</p>
		{/each}
	</div>
</div>

<style lang="scss">
	.optionSelector {
		display: flex;
		flex-direction: column;

		.optionHolder {
			display: flex;
			flex-wrap: wrap;
			padding: 15px;
			width: 100%;
			height: 100%;
		}

		.pointer {
			cursor: pointer;
		}

		.option {
			border-radius: 4px;
			font-size: 12px;
			font-weight: 500;
			box-sizing: border-box;
			padding: 4px;
			height: 22px;
			margin: 2px 4px 2px 4px;
			background: #292b2f;
			display: flex;
			align-items: center;

			.remove {
				display: block;
				cursor: pointer;
				height: 22px;
				line-height: 24px;
				text-align: center;
				margin: 0 0 0 4px;
			}

			.optionCircle {
				min-width: 12px;
				height: 12px;
				border-radius: 50%;
				padding: 0;
				margin: 0 4px 0 0;
				background-color: var(--color);
				position: relative;
				display: inline-block;
			}

			.optionIcon {
				min-width: 16px;
				height: 16px;
				padding: 0;
				margin: 0 4px 0 0;
				position: relative;
				display: inline-block;
			}

			.iconWrapper {
				:global(img) {
					height: 15px;
				}
				height: 100%;
				margin: 0 0 0 4px;
				color: #292b2f;
			}
		}
	}

	.input {
		resize: none;
		padding: 10px;
		color: white;
		border: none;
	}

	.input:focus {
		outline: rgba(0, 0, 0, 0.25) solid;
	}

	input[type='number'] {
		appearance: textfield;
		-moz-appearance: textfield;
		-webkit-appearance: textfield;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	.card {
		box-shadow: none;
	}
</style>
