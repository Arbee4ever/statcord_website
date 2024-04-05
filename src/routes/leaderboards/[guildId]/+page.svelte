<script lang='ts'>
	import { page } from '$app/stores';
	import GuildInfo from '$components/index/GuildInfo.svelte';
	import User from '$components/index/User.svelte';

	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';

	let guild: any;
	let user: any = $page.data.user;
	let guildId = $page.params.guildId;
	let members: any = [];

	let index: any = 0;
	let newBatch: never[] = [];
	let hasMore = true;

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
				if (newBatch.length < 100) {
					hasMore = false;
				}
			}
		}
	}

	let Member = new Promise(() => {});
	onMount(async () => {
		Member = import('/src/components/leaderboard/Member.svelte');
		await fetchData();
	});

	let innerHeight = 0;
	let scroll = 0;

	function infiniteScroll() {
		if (scroll / innerHeight >= 1) {
			fetchData();
		}
		console.log('innerHeight', innerHeight);
		console.log('scroll', scroll);
	}

	$: members = [...members, ...newBatch];
</script>

<svelte:window on:scrollend={infiniteScroll} bind:outerHeight={innerHeight} bind:scrollY={scroll} />

<svelte:head>
	{#if guild}
		<meta property='og:title' content="Statcord | {guild.name}'s Leaderboard" />
		<title>Statcord | {guild.name}'s Leaderboard</title>
	{/if}
</svelte:head>

<User {user} />
<div class='holder'>
	{#if guildId}
		<div class='info'>
			<GuildInfo {user} />
		</div>
	{/if}
	<div class='card leaderboard'>
		{#if members.length != 0}
			{#each members as { pos, name, id, texthistory, voicehistory, textmessages, voiceseconds, avatar }}
				{#await Member then module}
					<svelte:component this={module.default}
														{pos}
														{id}
														{texthistory}
														{voicehistory}
														score={textmessages / guild.values.msgsperpoint + voiceseconds / guild.values.vcsecondsperpoint}
														{name}
														{avatar}
					/>
				{/await}
			{/each}
			<!--{#if hasMore}
				<Button on:click={fetchData}>Load more</Button>
			{/if}-->
		{:else}
			<p class='loading'>Please wait, data is loading...</p>
		{/if}
	</div>
</div>

<style lang='scss'>
  .holder {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-areas: 'board info';
    gap: 2vw;
    margin: 10vh 2vw 2vw;
    min-height: 90vh;

    .leaderboard {
      display: flex;
      flex-direction: column;
      gap: 1vh;
      width: 100%;
      grid-area: board;
    }

    .info {
      width: 100%;
      grid-area: info;
    }
  }

  @media only screen and (max-width: 500px) {
    .holder {
      display: flex;
      flex-direction: column;
    }
  }
</style>
