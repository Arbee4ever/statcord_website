<script lang="ts">
	import { page } from '$app/stores';
	import DiscordLogo from '$lib/img/discord_logo.svg';
	import { onMount } from 'svelte';

	let user: any;
	let guilds: any;
	let botGuildsResp: any;
	let count;

	onMount(async () => {
		if ($page.data.userGuilds != undefined) {
			page.subscribe((value) => {
				user = value.data.user;
			});
			page.subscribe((value) => {
				guilds = value.data.userGuilds;
			});
			guilds.sort(function (a, b) {
				return compareStrings(a.name, b.name);
			});

			const botGuildsReq = await fetch('/api/guild', {
				method: 'GET'
			});
			botGuildsResp = await botGuildsReq.json();
			count = botGuildsResp.length;
            console.log(count)
		}
	});

	function compareStrings(a, b) {
		a = a.toLowerCase();
		b = b.toLowerCase();

		return a < b ? -1 : a > b ? 1 : 0;
	}
</script>

<div class="cardHolder">
	<div class="card dashboards">
		<h1 id="title">Your Servers</h1>
		{#key count}
			{count}
		{/key}
		{#key user}
			{#if user}
				<div class="dataHolder card">
					<p>Logged in as</p>
					<div id="user">
						<img
							alt="{user.username}#{user.discriminator} avatar"
							src="https://cdn.discordapp.com/avatars/{user.id}/{user.avatar}.png"
						/>
						<h1>{user.username}#{user.discriminator}</h1>
						<a href="api/signout" class="signout">
							<img src="https://api.iconify.design/fe/logout.svg?color=white" alt="Sign Out" />
						</a>
					</div>
					<div class="guildList">
						{#if guilds}
							{#each guilds as { name, icon, id, permissions }}
								{#if (permissions & (1 << 5)) != 0}
									<a href="dashboard/{id}" class="guild">
										{#if icon != null}
											<img src="https://cdn.discordapp.com/icons/{id}/{icon}.png" alt="Guild" />
										{/if}
										<p>{name}</p>
									</a>
								{/if}
							{/each}
						{/if}
					</div>
				</div>
			{:else}
				<form class="dataHolder card" action="api/auth">
					<button class="login" type="submit">
						<img src={DiscordLogo} alt="Discord Logo" />
						<span>Log in with Discord</span>
					</button>
				</form>
			{/if}
		{/key}
	</div>
</div>

<style>
	.cardHolder {
		margin-left: auto;
		margin-right: auto;
		width: min-content;
		min-height: 100vh;
		display: flex;
		align-items: center;
		/*display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		grid-column-gap: 0px;
		grid-row-gap: 0px;*/
	}

	.card {
		position: relative;
		height: fit-content;
		background: #1a1a1a99;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		padding: 1vh;
		width: max-content;
	}

	.dashboards {
		min-width: 20vw;
		min-height: min-content;
	}

	.dataHolder {
		display: flex;
		overflow: hidden;
		align-items: center;
		flex-direction: column;
		height: 30vh;
		width: calc(100% - 2vh);
	}

	.guildList {
		width: 100%;
		display: flex;
		overflow-y: overlay;
		align-items: center;
		flex-direction: column;
	}

	.login {
		margin: auto;
		padding: 1vh;
		background-color: #5865f2;
		border: none;
		border-radius: 0.5vh;
		color: white;
		text-align: center;
		cursor: pointer;
	}

	.login:hover {
		filter: brightness(90%);
	}

	.login img {
		height: 1vh;
	}

	#user {
		height: min-content;
		display: flex;
	}

	#user img {
		height: 2.5vh;
	}

	.signout {
		margin-left: 0.5vw;
	}

	.guild {
		width: calc(100% - 2vh);
		min-height: 5vh;
		height: min-content;
		display: flex;
		align-items: center;
		padding: 1vh;
	}

	.guild:hover {
		transition: all 0.2s ease-in-out;
		position: relative;
		height: fit-content;
		background: #1a1a1a99;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
	}

	.guild img {
		border-radius: 100%;
		height: 5vh;
		margin-right: 0.5vh;
	}
</style>
