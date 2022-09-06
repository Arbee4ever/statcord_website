<script lang="ts">
	import { page } from '$app/stores';

	import Member from '$components/Member.svelte';
	import { onMount } from 'svelte';
	let json: any;

	onMount(async () => {
		let body = { serverId: $page.params.serverId };
		let discorddata = await fetch('https://statcord-data.arbee.workers.dev', {
			method: 'POST',
			body: JSON.stringify(body)
		});
		json = await discorddata.json();
        json.sort(function(a: any, b: any){
            return b.score - a.score;
        });
    });
</script>

<main>
	<div class="card">
		{#if json}
			{#each json as { name, pfp, score }, i}
				<Member {pfp} {name} {score} {i}/>
			{/each}
		{:else}
			<p>Please wait, data is loading...</p>
		{/if}
	</div>
</main>

<style>
	.card {
		position: relative;
		margin-left: 1vw;
		height: fit-content;
		background: #1a1a1a99;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		width: max-content;
		height: min-content;
		padding: 1vw;
		width: 95vw;
	}
</style>
