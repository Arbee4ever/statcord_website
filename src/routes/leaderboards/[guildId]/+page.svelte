<script lang="ts">
	import { page } from '$app/stores';

	import Member from '$components/Member.svelte';
	import { onMount } from 'svelte';
	let members: any;
	let guild: any;
	let error: string;
	let guildId = $page.params.guildId;

	onMount(async () => {
		let data = await fetch('https://api.statcord.arbeeco.de/guilds/' + guildId, {
			method: 'GET'
		});
		if (data.status == 200) {
			const json = await data.json();
			members = json.members;
			guild = json.guild;
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
				<p>{guild.textcount} Textchannels</p>
				<p>{guild.voicecount} Voicechannels</p>
				<p>{guild.rolecount} Roles</p>
			</div>
		</div>
	{/if}
	<div class="card leaderboard">
		{#if members}
			{#if members.length == 0}
				<div class="loading">
					<p>Statcord is not on this Server!</p>
					<a id="addToDiscord">Not yet available</a>
				</div>
			{:else}
				{#each members as { pos, id, score }}
					<Member {pos} {id} {score} />
				{/each}
			{/if}
		{:else}
			<p class="loading">Please wait, data is loading...</p>
		{/if}
		{#if error != null}
			<div class="loading">
				<p>{error}</p>
			</div>
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

	#addToDiscord {
		margin-top: 1vh;
		border-top-right-radius: 10px;
		border-top-left-radius: 10px;
		height: 4vh;
		align-content: center;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		border-radius: 10px;
		text-align: center;
		grid-area: 1 / 1 / 2 / 2;
		color: gray;
		cursor: default;
		height: 4vh;
		line-height: 4vh;
		padding: 1vh;
	}
</style>
