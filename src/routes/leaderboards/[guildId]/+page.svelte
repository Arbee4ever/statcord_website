<script lang="ts">
	import { page } from '$app/stores';

	import Member from '$components/Member.svelte';
	import { onMount } from 'svelte';
	let json: any;
	let error: string;
	let hasMore: boolean = true;
	let index = 0;
	let guildId = $page.params.guildId;

	onMount(async () => {
		window.addEventListener('scroll', onScroll);
		let data = await fetch('/api/guilds/' + guildId + '?i=0', {
			method: 'GET'
		});
		if (data.status == 200) {
			json = await data.json();
		} else {
			error = data.status + ': ' + (await (await data.json()).message);
		}
	});

	const onScroll = async () => {
		if (hasMore) {
			if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
				index++;
				let newData = await fetch('/api/guilds/' + guildId + '?i=' + index, {
					method: 'GET'
				});
				let newJson = await newData.json();
				if (newJson.end == 'end') {
					hasMore = false;
				} else if (newData.status == 200) {
					for (let i = 0; i < newJson.length; i++) {
						const element = newJson[i];
						json.push(element);
					}
				} else {
					error = newData.status + ': ' + (await newJson.message);
				}
			}
		}
	};
</script>

<div class="card leaderboard">
	{#if json}
		{#if json.length == 0}
			<div class="loading">
				<p>Statcord is nota on this Server!</p>
				<a id="addToDiscord">Not yet available</a>
			</div>
		{:else}
			{#each json as { pos, id, score }}
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

<style>
	.card {
		position: relative;
		margin-left: auto;
		margin-right: auto;
		height: fit-content;
		background: #1a1a1a99;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		height: min-content;
		padding: 2vh;
	}

    .leaderboard {
        margin: 10vh;
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
