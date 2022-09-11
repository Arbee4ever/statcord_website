<script lang="ts">
	import { page } from '$app/stores';

	import Member from '$components/Member.svelte';
	import { onMount } from 'svelte';
	let json: any;
	let error: string;
	let serverId = $page.params.serverId;

	onMount(async () => {
		let data = await fetch('https://statcord.arbeeco.de/api/guild/' + serverId, {
			method: 'GET'
		});
		if (data.status == 200) {
			json = await data.json();
		} else {
			error = data.status + ': ' + (await (await data.json()).message);
		}
	});
</script>

<main>
	<div class="card">
		{#if json}
			{#if json.length == 0}
				<div class="loading">
					<p>Statcord is not on this Server!</p>
					<a id="addToDiscord">Not yet available</a>
				</div>
			{:else}
				{#each json as { pos, name, pfp, score }}
					<Member {pfp} {name} {score} {pos} />
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
