<script lang='ts'>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import Button from '$components/input/Button.svelte';
	import User from '$components/index/User.svelte';
	import GuildInfo from '$components/index/GuildInfo.svelte';
	import { env } from '$env/dynamic/public';
	import Conversionvalues from '$components/dashboard/Conversionvalues.svelte';
	import Data from '$components/dashboard/Data.svelte';
	import Roles from '$components/dashboard/Roles.svelte';
	import Errors from '$components/dashboard/Errors.svelte';
	import Messages from '$components/dashboard/Messages.svelte';

	let user = $page.data.user;
	let config;
	let guildId = $page.params.guildId;
	let tab = $page.params.tab;
	let vpw: number;
	let saveVisibile = false;
	let showTabs: boolean;
	let guild;
	let category;

	function updateCategory(t) {
		if (typeof t != 'string') {
			t = tab;
		}
		config = config;
		saveVisibile = false;
		tab = t;
		if (config[tab] == undefined) {
			category = {};
		} else {
			category = structuredClone(config[tab]);
		}
	}


	function onChange() {
		setTimeout(() => {
			if (JSON.stringify(category) === JSON.stringify(config[tab])) {
				saveVisibile = false;
				return;
			}
			saveVisibile = true;
		}, 1);
	}

	onMount(async () => {
		config = structuredClone($page.data.config);
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
			body: JSON.stringify(category)
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
		<meta property='og:title' content="Statcord | {guild.name}'s Dashboard" />
		<title>Statcord | {guild.name}'s Dashboard</title>
	{/if}
</svelte:head>

<svelte:window bind:outerWidth={vpw} />

<User {user} />
<div class='holder'>
	{#if guildId}
		<div class='info'>
			<GuildInfo {user} />
		</div>
	{/if}
	<div class='card configHolder'>
		{#if config}
			{#if vpw < 500}
				<Button on:click={toggleTabs}>Go to another Category</Button>
			{/if}
			{#if vpw > 500 || showTabs}
				<div class='selectorHolder'>
					<a
						href='values'
						on:mousedown={() => updateCategory('values')}
						class='card categorySelector'
					>
						Values
					</a>
					<a
						href='messages'
						on:mousedown={() => updateCategory('messages')}
						class='card categorySelector'
					>
						Messages
					</a>
					<a href='data' on:mousedown={() => updateCategory('data')} class='card categorySelector'>
						Data
					</a>
					<a
						href='roles'
						on:mousedown={() => updateCategory('roles')}
						class='card categorySelector'
					>
						Roles
					</a>
					<a
						href='errors'
						on:mousedown={() => updateCategory('errors')}
						class='card categorySelector'
					>
						Errors
					</a>
					<!--TODO: Add back when better Permissions System is done!-->
					<!--<a href="auth" on:mousedown={() => updateCategory('auth')} class="card categorySelector">
						Auth
					</a>-->
				</div>
				<div class='card categoryHolder'>
					{#key tab}
						{#key config}
							{#if tab === 'values'}
								<Conversionvalues bind:category on:change={onChange} />
							{:else if tab === 'messages'}
								<Messages bind:category on:change={onChange} />
							{:else if tab === 'data'}
								<Data bind:category on:change={onChange} />
							{:else if tab === 'roles'}
								<Roles bind:category on:change={onChange} />
								<!--{:else if tab === 'auth'}
									<Auth bind:category on:change={onChange} />-->
							{:else if tab === 'errors'}
								<Errors bind:category on:change={onChange} />
							{:else}
								<p>Nothing here yet!</p>
							{/if}
						{/key}
					{/key}
				</div>
			{/if}
		{:else}
			<p class='loading'>Please wait, data is loading...</p>
		{/if}
	</div>
</div>
{#if saveVisibile}
	<div class='save card' transition:slide>
		{#if vpw > 1356}
			<p>Unsaved Changes!</p>
		{/if}
		<Button color='#ff0000' on:click={updateCategory}>Reset</Button>
		<Button color='#00ff00' on:click={save}>Save Changes</Button>
	</div>
{/if}

<style lang='scss'>
  .holder {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-areas: 'board info';
    gap: 2vw;
    margin: 10vh 2vw 2vw;
    min-height: 90vh;

    .configHolder {
      display: flex;
      gap: 1vh;
      width: 100%;
      grid-area: board;
    }

    .info {
      width: 100%;
      grid-area: info;
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

  @media only screen and (max-width: 500px) {
    .holder {
      display: flex;
      flex-direction: column;
    }
    .configHolder {
      flex-direction: column;
    }
  }
</style>
