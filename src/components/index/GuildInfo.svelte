<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import DiscordButton from '$components/input/DiscordButton.svelte';
	import GuildsDropdown from '$components/index/GuildsDropdown.svelte';
	import { env } from '$env/dynamic/public';
	let guild: any;
	let data;
	export let user: any;
	let error: string;
	let other_guilds: any;
	let guildId = $page.params.guildId;

	onMount(async () => {
		data = await fetch(env.PUBLIC_STATCORD_API_URL + '/guilds/' + guildId, {
			method: 'GET'
		});
		if (data.status == 200) {
			const json = await data.json();
			guild = json.guild;
		} else if (data.status == 404) {
			error = '404';
		} else {
			error = (await data.json()).error;
		}
		if (user != null) {
			data = await fetch(env.PUBLIC_STATCORD_API_URL + '/guilds?user=' + user.id, {
				method: 'GET'
			});
			if (data.status == 200) {
				const json = await data.json();
				other_guilds = json.mutual_guilds;
				other_guilds = other_guilds.filter((val: any) => {
					return guild.id != val.id;
				});
			} else if (data.status == 404) {
				error = '404';
			} else {
				error = (await data.json()).error;
			}
		} else {
			other_guilds = [];
		}
	});
</script>

<div class="card guildInfo">
	{#if guild}
		{#if guild.banner}
			<img
				class="guildBanner"
				src="https://cdn.discordapp.com/banners/{guild.id}/{guild.banner}"
				alt="Guild Banner"
			/>
		{/if}
		<GuildsDropdown {guild} {other_guilds} />
		{#if guild.description}
			<p class="card guildDescription">{guild.description}</p>
		{/if}
		<div class="card infoOther">
			<p>{guild.membercount} Members</p>
			<p>{guild.rolecount} Roles</p>
			<p>{guild.textcount} Textchannels</p>
			<p>{guild.voicecount} Voicechannels</p>
		</div>
	{:else if error == '404'}
		<div class="loading">
			<p>Statcord is not on this Server!</p>
			<br />
			<DiscordButton
				--margin="0"
				url="https://discord.com/api/oauth2/authorize?client_id=959915020152627271&permissions=1515318660160&scope=bot&guild_id={guildId}"
			>
				Add to Discord
			</DiscordButton>
		</div>
	{:else if error != null}
		<div class="loading">
			<p>{error}</p>
		</div>
	{:else}
		<p class="loading">Please wait, data is loading...</p>
	{/if}
</div>

<style>
	.guildInfo {
		width: 40%;
		display: flex;
		flex-direction: column;
		gap: 1vh;
	}

	.guildInfo > * {
		width: 100%;
	}

	.guildBanner {
		width: 100%;
		border-radius: 10px;
	}

	.infoOther {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 1vh;
	}

	@media only screen and (max-width: 1356px) {
		.guildInfo {
			width: 100%;
		}

		.guildBanner {
			display: none;
		}

		.guildDescription {
			display: none;
		}

		.infoOther {
			display: none;
		}
	}
</style>
