<script lang="ts">
	import { page } from '$app/stores';
	import DiscordButton from '$components/DiscordButton.svelte';

	import Member from '$components/Member.svelte';
	import { onMount } from 'svelte';
	let data: any;
	let members: any;
	let guild: any;
	let error: string;
	let guildId = $page.params.guildId;

	onMount(async () => {
		data = await fetch('https://api.arbeeco.de/guilds/' + guildId, {
			method: 'GET'
		});
		if (data.status == 200) {
			const json = await data.json();
			members = json.members;
			guild = json.guild;
		} else if (data.status == 404) {
			error = '404';
		} else {
			error = data.status + ': ' + (await (await data.json()).message);
		}
	});
</script>

<div class="holder">
	{#if guild}
		<div class="card guildInfo">
			{#if guild.banner}
				<img
					class="guildBanner"
					src="https://cdn.discordapp.com/banners/{guild.id}/{guild.banner}"
					alt="Guild Banner"
				/>
			{/if}
			<div class="card infoHeader">
				{#if guild.icon}
					<img
						class="guildIcon"
						src="https://cdn.discordapp.com/icons/{guild.id}/{guild.icon}"
						alt="Guild Icon"
					/>
				{/if}
				<p class="guildName">{guild.name}</p>
			</div>
			{#if guild.description}
				<p class="card guildDescription">{guild.description}</p>
			{/if}
			<div class="card infoOther">
				<p>{guild.membercount} Members</p>
				<p>{guild.rolecount} Roles</p>
				<p>{guild.textcount} Textchannels</p>
				<p>{guild.voicecount} Voicechannels</p>
			</div>
		</div>
	{/if}
	<div class="card leaderboard">
		{#if members}
			{#each members as { pos, id, score }}
				<Member {pos} {id} {score} />
			{/each}
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
</div>

<style>
	.holder {
		display: flex;
		flex-direction: row-reverse;
		margin: 2vw;
		margin-top: 10vh;
		gap: 1vw;
		min-height: 90vh;
	}

	.leaderboard {
		width: 100%;
	}

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

	.infoHeader {
		display: flex;
		line-height: 5vh;
		text-align: center;
	}

	.guildIcon {
		height: 5vh;
		border-radius: 100%;
		margin-right: 1vh;
	}

	.infoOther {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 1vh;
	}

	@media only screen and (max-width: 1356px) {
		.holder {
			flex-direction: column;
		}

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

	.card {
		position: relative;
		margin-left: auto;
		margin-right: auto;
		height: fit-content;
		background: #1a1a1a99;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		padding: 2vh;
	}

	.loading {
		text-align: center;
		vertical-align: middle;
		margin: 1vh;
	}
</style>
