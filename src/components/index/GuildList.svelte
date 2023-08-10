<script lang="ts">
	import { slide } from 'svelte/transition';

	export let mutualGuilds: any;
	export let guilds: any = undefined;
	export let type: any;
	if (type == 'leaderboards') {
		guilds = [];
	}
</script>

{#if !mutualGuilds || !guilds}
	<p class="guild">Loading your Servers...</p>
{:else if mutualGuilds.length == 0 && guilds.length == 0}
	<p class="guild">You don't share a Server with Statcord!</p>
{:else}
	{#each mutualGuilds as { name, icon, id, moderator }}
		{#if moderator || type == "leaderboards"}
			<a href="/{type}/{id}" class="guild" transition:slide>
				<span class="guildIcon">
					{#if icon != null}
						<img src="https://cdn.discordapp.com/icons/{id}/{icon}.png" alt="Guild" />
					{/if}
				</span>
				<p>{name}</p>
			</a>
		{/if}
	{/each}
	{#each guilds as { name, icon, id }}
		<a
			href="https://discord.com/oauth2/authorize?client_id=959915020152627271&permissions=1515318660160&scope=bot&guild_id={id}"
			class="guild noStatcord"
			transition:slide
		>
			<span class="guildIcon">
				{#if icon != null}
					<img src="https://cdn.discordapp.com/icons/{id}/{icon}.png" alt="Guild" />
				{/if}
			</span>
			<p>{name}</p>
		</a>
	{/each}
{/if}

<style>
	.noStatcord {
		filter: brightness(50%);
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

	.guildIcon {
		height: 5vh;
		width: 5vh;
		margin-right: 0.5vh;
	}

	.guildIcon img {
		border-radius: 100%;
		height: 100%;
	}
</style>
