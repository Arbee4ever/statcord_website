<script lang="ts">
	import { page } from '$app/stores';

	import MemberCard from '$components/MemberCard.svelte';
	import { onMount } from 'svelte';
	let json: any;
	let error: string;

	onMount(async () => {
		let data = await fetch('https://statcord.arbeeco.de/api/guild/' + $page.params.serverId + "?userId=" + $page.params.userId, {
			method: 'GET'
		});
		if (data.status == 200) {
			json = await data.json();
		} else {
			console.log(data.statusText);
			error = data.status + ': ' + (await (await data.blob()).text());
		}
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
		{:else if error != null}
			<div class="loading">
				<p>{error}</p>
			</div>
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
