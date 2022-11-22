<script lang="ts">
	import PlaceholderImg from '$lib/img/icon_clyde_circle_white.svg';
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	export let pos: number;
	export let id: string;
	export let score: any;
	score = Math.round(score);
	let discordDataJson: any = {
		name: 'Loading...',
		pfp: PlaceholderImg
	};
	let pfp: any;

	onMount(async () => {
		const discordData = await fetch(env.PUBLIC_STATCORD_API_URL + '/user/' + id, {
			method: 'GET'
		});
		discordDataJson = await discordData.json();
		if (discordDataJson.pfp != null) {
			pfp = 'https://cdn.discordapp.com/avatars/' + id + '/' + discordDataJson.pfp;
		} else {
			pfp = PlaceholderImg;
		}
	});

	let color: string = "#00000000";
	switch (pos) {
		case 1:
			color = 'rgb(218 158 59)';
			break;
		case 2:
			color = 'rgb(152 152 152)';
			break;
		case 3:
			color = 'rgb(174, 116, 65)';
			break;
		default:
			break;
	}
</script>

<div class="member card">
	<div class="user">
		{#key discordDataJson}
			<div class="namepos card">
				<p class="position">{pos}</p>
				<img class="avatar" style="--color:{color}" src={pfp} alt="User" />
				<p class="name">{discordDataJson.name}</p>
			</div>
		{/key}
	</div>
	<div class="stats">
		<p class="score">{score}</p>
		<p />
	</div>
</div>

<style>
	.member {
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		padding: 2vh;
		display: grid;
		width: 100%;
		overflow-x: auto;
	}

	.member:last-of-type {
		margin: 0;
	}

	.user {
		grid-area: 1 / 1 / 2 / 2;
		display: flex;
	}

	.namepos {
		display: flex;
		gap: 1vh;
		height: 3vh;
		align-self: center;
		align-items: center;
		margin: 0;
		padding: 1vh;
	}

	.position {
		font-weight: bold;
	}

	.name {
		white-space: nowrap;
	}

	.avatar {
		border-radius: 100%;
		width: 5vh;
		height: 5vh;
		border: 3px solid var(--color);
		box-shadow: 0 0 32px 0 var(--color);
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
