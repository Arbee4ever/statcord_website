<script lang="ts">
	import StatcordLogo from '$lib/img/statcord_logo.jpg';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import GuildList from '$components/GuildList.svelte';
	import User from '$components/User.svelte';
	import DiscordButton from '$components/DiscordButton.svelte';

	let user: any = $page.data.user;
	let mutualGuilds: any;
	let guilds: any;
	let token: any;

	onMount(async () => {
		if (user) {
			const guildsReq = await fetch('http://api.arbeeco.de:8080/guilds?user=' + user.id);
			const guildsJson = await guildsReq.json();
			mutualGuilds = guildsJson.mutual_guilds;
			token = $page.data.token;

			const guildReq = await fetch(`https://discordapp.com/api/users/@me/guilds`, {
				headers: { Authorization: `Bearer ${token}` }
			});

			const guildResp = await guildReq.json();

			let jsonResponse: { id: any; name: any; icon: any }[] = [];
			for (let i = 0; i < guildResp.length; i++) {
				const element = guildResp[i];
				if ((element.permissions & (1 << 5)) != 0) {
					const jsonElement = {
						id: element.id,
						name: element.name,
						icon: element.icon
					};
					jsonResponse.push(jsonElement);
				}
			}
			guilds = jsonResponse.filter((val) => {
				return !JSON.stringify(mutualGuilds).includes(JSON.stringify(val));
			});
		}
	});
</script>

<main>
	<div class="cardHolder">
		<div class="info card">
			<h1 id="title" class="name">
				<img src={StatcordLogo} alt="Statcord Logo" />
				Statcord
			</h1>
			<p id="description">Just another leveling Bot with some unique Features.</p>
			<div class="buttons">
				<DiscordButton
					--margin="0"
					url="https://discord.com/api/oauth2/authorize?client_id=959915020152627271&permissions=1515318660160&scope=bot"
				>
					Add to Discord
				</DiscordButton>
				<DiscordButton --margin="0" --color="#00000040" url="https://arbeeco.de/links/discord">
					Join Support Server
				</DiscordButton>
			</div>
		</div>
		<div class="utils">
			<div class="dashboards card">
				<h1 id="title">Dashboards</h1>
				<div class="guildList card">
					{#if !user}
						<DiscordButton url="/api/auth">Login with Discord</DiscordButton>
					{:else}
						<GuildList type="dashboard" {guilds} {mutualGuilds} />
					{/if}
				</div>
			</div>
			<div class="leaderboards card">
				<h1 id="title">Leaderboards</h1>
				<div class="guildList card">
					{#if !user}
						<DiscordButton url="/api/auth">Login with Discord</DiscordButton>
					{:else}
						<GuildList type="leaderboards" {mutualGuilds} />
					{/if}
				</div>
			</div>
		</div>
		{#if user}
			<div class="user card">
				<User {user} />
			</div>
		{/if}
	</div>
</main>

<style>
	main {
		display: grid;
		align-items: center;
	}

	.cardHolder {
		margin: auto;
	}

	.card {
		position: relative;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		height: min-content;
		padding: 1vh;
	}

	.user {
		margin-top: 1vh;
	}

	.utils {
		flex-wrap: wrap;
		display: flex;
		margin-top: 1vh;
		gap: 1vh;
	}

	.info {
		flex-basis: 100%;
	}

	/*small screens (phones)*/
	@media only screen and (max-width: 480px) {
		main {
			margin-top: 10vh;
		}

		.cardHolder {
			margin-left: 2vh;
			margin-right: 2vh;
		}

		.leaderboards {
			width: 100%;
		}

		.dashboards {
			width: 100%;
		}
	}

	#title {
		display: flex;
		align-items: center;
	}

	#title img {
		border-radius: 100%;
		height: 32pt;
	}

	.name {
		text-decoration: underline;
	}

	#description {
		margin: 1vh 0;
	}

	.buttons {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr;
		grid-column-gap: 1vh;
	}

	.guildList {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 30vw;
		height: 30vh;
		overflow-y: overlay;
	}

	.user {
		float: right;
		text-align: end;
	}
</style>
