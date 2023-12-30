<script lang='ts'>
	import StatcordLogo from '$lib/img/statcord_logo.jpg';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import GuildList from '$components/index/GuildList.svelte';
	import User from '$components/index/User.svelte';
	import DiscordButton from '$components/input/DiscordButton.svelte';
	import { env } from '$env/dynamic/public';

	let user: any = $page.data.user;
	let mutualGuilds: any;
	let allGuildsCount: any;
	let guilds: any;
	let token: any;

	onMount(() => loadData());

	async function loadData() {
		const userId = user ? user.id : '';
		let guildsReq;
		try {
			 guildsReq = await fetch(env.PUBLIC_STATCORD_API_URL + '/guilds?user=' + userId);
		} catch (err) {
			console.log("Retrying")
			setTimeout(async () => {
				await loadData();
			}, 5000);
			return;
		}
		const guildsJson = await guildsReq.json();
		mutualGuilds = guildsJson.mutual_guilds ? guildsJson.mutual_guilds : [];
		allGuildsCount = guildsJson.other_guilds.length + mutualGuilds.length;
		if (user) {
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
						icon: element.icon,
						moderator: true
					};
					jsonResponse.push(jsonElement);
				}
			}
			guilds = jsonResponse.filter((val) => {
				return !JSON.stringify(mutualGuilds).includes(JSON.stringify(val));
			});

			mutualGuilds = mutualGuilds.filter((val: any) => {
				return !JSON.stringify(val).includes(
					JSON.stringify({
						moderator: true
					})
				);
			});
		}
	}
</script>

<svelte:head>
	<meta property='og:title' content='Statcord' />
	<title>Statcord</title>
</svelte:head>

<main>
	<User {user} />
	<div class='cardHolder'>
		<div class='info card'>
			<h1 id='title'>
				<img src={StatcordLogo} alt='Statcord Logo' />
				STATCORD
			</h1>
			<p id='description'>Just another leveling Bot with some unique Features.</p>
			<p id='description'>
				Thank you to all
				{#if allGuildsCount}
					{allGuildsCount}
				{:else}
					x
				{/if}
				Guilds for using this Bot.
			</p>
			<div class='buttons'>
				<DiscordButton
					--margin='0'
					url='https://discord.com/api/oauth2/authorize?client_id=959915020152627271&permissions=1515318660160&scope=bot'
				>
					Add to Discord
				</DiscordButton>
				<DiscordButton --margin='0' --color='#00000040' url='https://arbeeco.de/links/discord'>
					Join Support Server
				</DiscordButton>
			</div>
		</div>
		<div class='utils'>
			<div class='dashboards card'>
				<h1 id='title'>DASHBOARDS</h1>
				<div class='guildList card'>
					{#if !user}
						<DiscordButton url='/api/auth'>Login with Discord</DiscordButton>
					{:else}
						<GuildList type='dashboards' {guilds} {mutualGuilds} />
					{/if}
				</div>
			</div>
			<div class='leaderboards card'>
				<h1 id='title'>LEADERBOARDS</h1>
				<div class='guildList card'>
					{#if !user}
						<DiscordButton url='/api/auth'>Login with Discord</DiscordButton>
					{:else}
						<GuildList type='leaderboards' {mutualGuilds} />
					{/if}
				</div>
			</div>
		</div>
	</div>
</main>

<style>
    main {
        min-height: 100vh;
        display: grid;
        align-items: center;
    }

    .cardHolder {
        margin: auto;
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
        overflow-y: scroll;
    }
</style>
