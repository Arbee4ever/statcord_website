<script lang="ts">
	import { env } from '$env/dynamic/private';
	import PlaceholderImg from '$lib/img/icon_clyde_circle_white.svg';
	import { onMount } from 'svelte';
	export let pos: number;
	export let id: string;
	export let score: any;
	score = Math.round(score);
	let discordDataJson: any = {
		name: 'Loading...',
		pfp: PlaceholderImg
	};

	onMount(async () => {
		const discordData = await fetch(env.STATCORD_API_URL + '/user/' + id, {
			headers: { Authorization: `${env.DISCORD_AUTH}` },
			method: 'GET'
		});
		discordDataJson = await discordData.json();
	});
</script>

<div class="member">
	<div class="user">
		{#key discordDataJson}
			<div class="namepos">
				<p class="position">{pos}</p>
				{#if pos == 1}
					<img class="avatar first" src={discordDataJson.pfp} alt="User" />
				{:else if pos == 2}
					<img class="avatar second" src={discordDataJson.pfp} alt="User" />
				{:else if pos == 3}
					<img class="avatar third" src={discordDataJson.pfp} alt="User" />
				{:else}
					<img class="avatar" src={discordDataJson.pfp} alt="User" />
				{/if}
				<p class="name">{discordDataJson.name}</p>
			</div>
		{/key}
	</div>
	<div class="stats">
		<p class="score">{score}</p>
	</div>
</div>

<style>
	.member {
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		padding: 2vh;
		margin: 1vh;
		display: grid;
		grid-template-columns: 1fr, 1fr, 1fr;
		grid-template-rows: 1fr;
		grid-column-gap: 10px;
		height: fit-content;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
	}

	.first {
		outline: 3px solid rgb(218 158 59);
		box-shadow: 0 0 32px 0 rgb(218 158 59);
	}

	.second {
		outline: 3px solid rgb(152 152 152);
		box-shadow: 0 0 32px 0 rgb(152 152 152);
	}

	.third {
		outline: 3px solid rgb(174, 116, 65);
		box-shadow: 0 0 32px 0 rgb(174, 116, 65);
	}

	.user {
		grid-area: 1 / 1 / 2 / 2;
		display: flex;
	}

	.namepos {
		display: inline-flex;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		width: min-content;
		line-height: 3vh;
		height: 3vh;
		width: min-content;
		align-self: center;
		align-items: center;
		padding-top: 0.3vh;
		padding-right: 0.8vh;
		padding-left: 0.8vh;
		margin-right: 2vh;
	}

	.position {
		font-weight: bold;
	}

	.name {
		margin-left: 1vh;
	}

	.avatar {
		border-radius: 100%;
		width: 5vh;
		height: 5vh;
		margin-left: 1vh;
	}

	.stats {
		grid-area: 1 / 3 / 2 / 4;
	}

	.score {
		height: fit-content;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		border-radius: 100%;
		font-weight: bold;
		line-height: 5vh;
		width: 5vh;
		text-align: center;
		float: right;
	}
</style>
