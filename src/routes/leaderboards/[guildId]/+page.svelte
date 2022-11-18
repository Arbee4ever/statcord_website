<script lang="ts">
	import { page } from '$app/stores';
	import GuildInfo from '$components/index/GuildInfo.svelte';
	import User from '$components/index/User.svelte';

	import Member from '$components/leaderboard/Member.svelte';
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/private';
	let guild: any;
	let user: any = $page.data.user;
	let guildId = $page.params.guildId;
	let members: any;

	onMount(async () => {
		let data = await fetch(env.PUBLIC_STATCORD_API_URL + '/guilds/' + guildId, {
			headers: { Authorization: `${env.DISCORD_AUTH}` },
			method: 'GET'
		});
		if (data.status == 200) {
			const json = await data.json();
			members = json.members;
			guild = json.guild;
		}
	});
</script>

<svelte:head>
	{#if guild}
		<meta property="og:title" content="Statcord | {guild.name}'s Leaderboard" />
		<title>Statcord | {guild.name}'s Leaderboard</title>
	{/if}
</svelte:head>

<div class="holder">
	<User {user} />
	{#if guildId}
		<GuildInfo {user} />
	{/if}
	<div class="card leaderboard">
		{#if members}
			{#each members as { pos, id, score }}
				<Member {pos} {id} {score} />
			{/each}
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

	@media only screen and (max-width: 1356px) {
		.holder {
			flex-direction: column;
		}
	}
</style>
