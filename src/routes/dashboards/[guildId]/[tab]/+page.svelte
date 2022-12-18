<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import Button from '$components/input/Button.svelte';
	import User from '$components/index/User.svelte';
	import GuildInfo from '$components/index/GuildInfo.svelte';
	import { env } from '$env/dynamic/public';
	import Conversionvalues from '$components/dashboard/Conversionvalues.svelte';
	import Auth from '$components/dashboard/Auth.svelte';
	import Data from '$components/dashboard/Data.svelte';
	import Roles from '$components/dashboard/Roles.svelte';

	let user: any = $page.data.user;
	let config: any = $page.data.config;
	let guildId = $page.params.guildId;
	let tab = $page.params.tab;
	let category: any;
	let vpw: any;
	let saveVisibile: boolean = false;
	let resp: any = {};
	let id: any;
	let value: any;
	let showTabs: boolean;
	let guild: any;

	function updateCategory(t) {
		window.removeEventListener('beforeunload', beforeUnload);
		saveVisibile = false;
		resp = {};
		tab = t;
		category = config[tab];
	}

	function onChange(event) {
		id = event.detail.id;
		value = event.detail.value;
		saveVisibile = true;

		resp = { ...resp };
		resp[id] = value;

		window.addEventListener('beforeunload', beforeUnload);
	}

	function beforeUnload(e) {
		var confirmationMessage = 'You have unsaved Changes!';

		(e || window.event).returnValue = confirmationMessage; //Gecko + IE
		return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
	}

	onMount(async () => {
		updateCategory(tab);

		let data = await fetch(`${env.PUBLIC_STATCORD_API_URL}/guilds/${guildId}`, {
			method: 'GET'
		});
		if (data.status == 200) {
			const json = await data.json();
			guild = json.guild;
		}
	});

	async function save() {
		let req = await fetch(`${env.PUBLIC_STATCORD_API_URL}/guilds/${guildId}/${tab}`, {
			headers: {
				Authorization: `${config['auth']['token']}`
			},
			method: 'PATCH',
			body: JSON.stringify(resp)
		});
		const json = await req.json();
		if (req.status == 200) {
			config = json;
			updateCategory(tab);
		}
	}

	function toggleTabs() {
		showTabs = !showTabs;
	}
</script>

<svelte:head>
	{#if guild}
		<meta property="og:title" content="Statcord | {guild.name}'s Dashboard" />
		<title>Statcord | {guild.name}'s Dashboard</title>
	{/if}
</svelte:head>

<svelte:window bind:outerWidth={vpw} />

<User {user} />
<div class="holder">
	{#if guildId}
		<div class="info">
			<GuildInfo {user} />
		</div>
	{/if}
	{#if category}
		<div class="card configHolder">
			{#if vpw < 1356}
				<Button on:click={toggleTabs}>Go to another Category</Button>
			{/if}
			{#if vpw > 1356 || showTabs}
				<div class="selectorHolder" transition:slide>
					<a
						href="values"
						on:mousedown={() => updateCategory('values')}
						class="card categorySelector"
					>
						Values
					</a>
					<a href="data" on:mousedown={() => updateCategory('data')} class="card categorySelector">
						Data
					</a>
					<a
						href="roles"
						on:mousedown={() => updateCategory('roles')}
						class="card categorySelector"
					>
						Roles
					</a>
					<!-- TODO: Add back when better Permissions System is done!
					<a href="auth" on:mousedown={() => updateCategory('auth')} class="card categorySelector">
						Auth
					</a> -->
				</div>
			{/if}
			<div class="card categoryHolder">
				{#key category}
					{#if tab == 'values'}
						<Conversionvalues {category} on:change={onChange} />
					{:else if tab == 'data'}
						<Data {category} on:change={onChange} />
					{:else if tab == 'roles'}
						<Roles {category} on:change={onChange} />
					{:else if tab == 'auth'}
						<Auth {category} on:change={onChange} />
					{/if}
				{/key}
			</div>
		</div>
	{/if}
</div>
{#if saveVisibile}
	<div class="save card" transition:slide>
		{#if vpw > 1356}
			<p>Unsaved Changes!</p>
		{/if}
		<Button color="#ff0000" on:click={() => updateCategory(tab)}>Reset</Button>
		<Button color="#00ff00" on:click={save}>Save Changes</Button>
	</div>
{/if}

<style lang="scss">
	.holder {
		display: grid;
		grid-template-columns: 3fr 1fr;
		grid-template-areas: 'board info';
		gap: 2vw;
		margin: 2vw;
		margin-top: 10vh;
		min-height: 90vh;

		.info {
			width: 100%;
			grid-area: info;
		}
		.configHolder {
			width: 100%;
			display: flex;
			gap: 1vh;
			width: 100%;
			grid-area: board;
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
	}

	.save {
		display: flex;
		gap: 4vh;
		z-index: 2;
		position: fixed;
		max-width: 80vw;
		left: 50%;
		transform: translateX(-50%);
		bottom: 2vh;
		align-items: center;
	}

	@media only screen and (max-width: 1356px) {
		.holder {
			display: flex;
			flex-direction: column;
		}
		.configHolder {
			flex-direction: column;
		}
	}
</style>
