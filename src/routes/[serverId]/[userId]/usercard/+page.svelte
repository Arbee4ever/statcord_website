<script lang="ts">
	import { page } from '$app/stores';

	import MemberCard from '$components/MemberCard.svelte';
	import { onMount } from 'svelte';
	let json: any;

	onMount(async () => {
		let body = { serverId: $page.params.serverId, userId: $page.params.userId };
		console.log(JSON.stringify(body));
		let discorddata = await fetch('https://statcord-data.arbee.workers.dev', {
			method: 'POST',
			body: JSON.stringify(body)
		});
		json = await discorddata.json();
		json.sort(function (a: any, b: any) {
			return b.score - a.score;
		});
	});
</script>

<main>
	<div class="card">
		{#if json}
			{#if json.length == 0}
				<div class="loading">
					<p>This User is not on this Server!</p>
				</div>
			{:else}
				{#each json as { name, pfp, score }, i}
					<MemberCard {pfp} {name} {score} {i} />
				{/each}
			{/if}
		{:else}
			<p class="loading">Please wait, data is loading...</p>
		{/if}
	</div>
</main>

<style>
	@import url(https://fonts.bunny.net/css?family=josefin-sans:400);

	.card {
		position: relative;
		margin-left: 3vh;
		margin-right: 3vh;
		height: fit-content;
		background: #1a1a1a99;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		height: min-content;
		padding: 2vh;
	}

	.loading {
		text-align: center;
		vertical-align: middle;
		margin: 1vh;
	}
</style>
