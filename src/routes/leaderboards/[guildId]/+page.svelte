<script lang="ts">
	import { page } from '$app/stores';
	import GuildInfo from '$components/index/GuildInfo.svelte';
	import User from '$components/index/User.svelte';

	import Member from '$components/leaderboard/Member.svelte';
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import Button from '$components/input/Button.svelte';
	let guild: any;
	let user: any = $page.data.user;
	let guildId = $page.params.guildId;
	let members: any = [];

	let index: any = 0;
	let newBatch: never[] = [];
	let hasMore: boolean = true;

	async function fetchData() {
		if (hasMore) {
			let data = await fetch(`${env.PUBLIC_STATCORD_API_URL}/guilds/${guildId}?page=${index}`, {
				method: 'GET'
			});
			if (data.status == 200) {
				const json = await data.json();
				newBatch = json.members;
				guild = json.guild;
				index++;
				if (newBatch.length < 50) {
					hasMore = false;
				}
			}
		}
	}

	onMount(async () => {
		await fetchData();
	});

	$: members = [...members, ...newBatch];
</script>

<svelte:head>
	{#if guild}
		<meta property="og:title" content="Statcord | {guild.name}'s Leaderboard" />
		<title>Statcord | {guild.name}'s Leaderboard</title>
	{/if}
</svelte:head>

<User {user} />
<div class="holder">
	{#if guildId}
		<div class="info">
			<GuildInfo {user} />
		</div>
	{/if}
	<div class="card leaderboard">
		{#if members.length != 0}
			{#each members as { pos, id, textscore, voicescore }}
				<Member {pos} {id} score={textscore + voicescore} />
			{/each}
			{#if hasMore}
				<Button on:click={fetchData}>Load more</Button>
			{/if}
		{:else}
			<p class="loading">Please wait, data is loading...</p>
		{/if}
	</div>
</div>

<style lang="scss">
	.holder {
		display: grid;
		grid-template-columns: 2.5fr 1fr;
		grid-template-areas: 'board info';
		gap: 2vw;
		margin: 2vw;
		margin-top: 10vh;
		min-height: 90vh;

		.leaderboard {
			display: flex;
			flex-direction: column;
			gap: 1vh;
			width: 100%;
			grid-area: board;
		}
		.info {
			grid-area: info;
		}
	}

	@media only screen and (max-width: 1356px) {
		.holder {
			grid-template-columns: 1fr;
			grid-template-areas: 'info' 'board';
		}
	}
</style>
