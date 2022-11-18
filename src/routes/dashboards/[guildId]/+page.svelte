<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

	import Button from '$components/input/Button.svelte';
	import User from '$components/index/User.svelte';
	import Input from '$components/input/Input.svelte';
	import GuildInfo from '$components/index/GuildInfo.svelte';
	import Dropdown from '$components/input/Dropdown.svelte';
	import { env } from '$env/dynamic/public';

	let user: any = $page.data.user;
	let config: any = $page.data.config;
	let guildId = $page.params.guildId;
	let category: any;
	let vpw: any;
	let saveVisibile: boolean = false;
	let json: any = {};
	let id;
	let value;

	let guild: any;

	onMount(function () {
		category = [];
		let selected = config[0];
		for (var i in selected) category.push(selected[i]);
	});

	function updateCategory(event: { detail: { category: { [x: string]: any } } }) {
		category = [];
		for (var i in event.detail.category) category.push(event.detail.category[i]);
	}

	function updateCategoryLocal(x: { [x: string]: any }) {
		category = [];
		for (var i in x) category.push(x[i]);
	}

	function onChange(event) {
		id = category[1] + '.' + event.detail.value;
		value = event.detail.newValue;
		saveVisibile = true;

		json[id] = {
			value: value
		};
	}

	onMount(async () => {
		let data = await fetch(env.PUBLIC_STATCORD_API_URL + '/guilds/' + guildId, {
			method: 'GET'
		});
		if (data.status == 200) {
			const json = await data.json();
			guild = json.guild;
		}
	});
</script>

<svelte:head>
	{#if guild}
		<meta property="og:title" content="Statcord | {guild.name}'s Dashboard" />
		<title>Statcord | {guild.name}'s Leaderboard</title>
	{/if}
</svelte:head>

<svelte:window bind:outerWidth={vpw} />

<div class="holder">
	<User {user} />
	{#if guildId}
		<GuildInfo {user} />
	{/if}
	{#if category}
		<div class="card configHolder">
			{#if vpw > 1356}
				<div class="selectorHolder">
					{#each config as val}
						<p class="card categorySelector" on:click={() => updateCategoryLocal(val)}>
							{val.name}
						</p>
					{/each}
				</div>
			{:else}
				<Dropdown elements={config} on:click={updateCategory}>{category[0]}</Dropdown>
			{/if}
			<div class="card categoryHolder">
				{#each category as { name, value, type, id }}
					{#if name != undefined}
						<Input {value} {id} {type} on:input={onChange} label={name} />
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</div>
{#if saveVisibile}
	<div class="save card" transition:slide>
		<Button>{value}</Button>
		<Button>{id}</Button>
		<Button color="#00ff00">Save</Button>
	</div>
{/if}

<style>
	.holder {
		display: flex;
		flex-direction: row-reverse;
		margin: 2vw;
		margin-top: 10vh;
		gap: 1vw;
		min-height: 90vh;
	}

	.configHolder {
		width: 100%;
		display: flex;
		gap: 1vh;
	}

	.selectorHolder {
		display: flex;
		flex-direction: column;
		gap: 1vh;
	}

	.categorySelector {
		cursor: pointer;
		width: 100%;
		min-width: 15vw;
	}

	.categoryHolder {
		width: 100%;
		display: grid;
		gap: 1vh;
	}

	.save {
		display: flex;
		z-index: 2;
		position: fixed;
		width: 80vw;
		bottom: 2vh;
		left: 10vw;
	}

	@media only screen and (max-width: 1356px) {
		.holder {
			flex-direction: column;
		}

		.configHolder {
			flex-direction: column;
		}
	}
</style>
