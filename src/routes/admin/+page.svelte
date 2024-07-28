<script lang='ts'>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import GuildList from '$components/index/GuildList.svelte';
	import User from '$components/index/User.svelte';
	import { env } from '$env/dynamic/public';
	import Input from '$components/input/Input.svelte';
	import { afterNavigate } from '$app/navigation';
	import GuildOverview from './GuildOverview.svelte';
	import GuildInfo from '$components/index/GuildInfo.svelte';
	import BotInfo from './BotInfo.svelte';

	let user: any = $page.data.user;
	let guilds: { id: string, name: string, icon: string, moderator?: boolean }[] = [];
	let filteredGuilds: any = [];
	let selectedGuild: { id: string, name: string, icon: string, moderator?: boolean } | undefined;

	onMount(() => loadData());

	async function loadData() {
		let guildsReq;
		try {
			guildsReq = await fetch(`${env.PUBLIC_STATCORD_API_URL}/guilds?user=${user.id}`, {
				headers: {
					user: JSON.stringify(user) == null ? '' : JSON.stringify(user)
				}
			});
		} catch (err) {
			setTimeout(async () => {
				console.log('Retrying');
				await loadData();
			}, 5000);
			return;
		}
		const guildsJson = await guildsReq.json();
		guilds.push(...guildsJson.mutual_guilds);
		guilds.push(...guildsJson.other_guilds);
		filteredGuilds = guilds;

		const id = $page.url.searchParams.get('guildId');
		if (id == undefined) return;
		selectedGuild = filteredGuilds.find((el) => el['id'] == id);
	}

	function onChange(e) {
		let search = e.target.value;
		filteredGuilds = guilds.filter((guild) => {
			const name: string = guild.name;
			const id: string = guild.id;
			return name.includes(search) || id.includes(search);
		});
	}

	afterNavigate(() => {
		const id = $page.url.searchParams.get('guildId');
		if (id == undefined) return;
		selectedGuild = filteredGuilds.find((el) => el['id'] == id);
	});
</script>

<main>
	<User {user} />
	{#if guilds}
		<div class='holder'>
			<div class='guildList card'>
				<Input label='Search'>
					<div>
						<input class='card input' on:input={onChange} type='search' />
						<p>{filteredGuilds.length}</p>
					</div>
				</Input>
				<GuildList type='admin' mutualGuilds={filteredGuilds} separator='?guildId=' />
			</div>
			<div class='center'>
				{#if $page.url.searchParams.get("guildId") !== null}
					{#key selectedGuild}
						<GuildInfo user={user} sticky={false}></GuildInfo>
					{/key}
				{/if}
				{#if selectedGuild}
					<GuildOverview bind:guildId={selectedGuild.id}></GuildOverview>
				{/if}
			</div>
			<div class='right'>
				<BotInfo></BotInfo>
			</div>
		</div>
	{/if}
</main>

<style lang='scss'>
  main {
    min-height: 100vh;
    display: grid;
    align-items: center;

    .holder {
      gap: 2vw;
      margin: 10vh 2vw 2vw;
      display: grid;
      grid-template-columns: 1fr 3fr 1fr;

      .guildList {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 80vh;
        width: 20vw;
        overflow-y: auto;

        div {
          display: flex;
          align-items: center;
          gap: 1vw;

          .input {
            resize: none;
            padding: 15px;
            color: white;
            width: var(--width, 100%);
            background-color: transparent;
            box-shadow: none;
            border: solid 1px #00000040;
          }

          .input:focus {
            outline: rgba(0, 0, 0, 0.25) solid;
          }
        }
      }

			.right {
				width: 20vw;
			}
    }
  }
</style>