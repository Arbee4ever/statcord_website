<script lang="ts">
	export let mutualGuilds: any;
	export let guilds: any;
	export let type: any;
	if (type == 'leaderboards') {
		guilds = [];
	}
</script>

{#if !mutualGuilds || !guilds}
	<p class="guild">Loading your Servers...</p>
{:else}
	{#each mutualGuilds as { name, icon, id }}
		<a href="{type}/{id}" class="guild">
			<span class="guildIcon">
				{#if icon != null}
					<img src="https://cdn.discordapp.com/icons/{id}/{icon}.png" alt="Guild" />
				{/if}
			</span>
			<p>{name}</p>
		</a>
	{/each}
	{#each guilds as { name, icon, id }}
		<a href="{type}/{id}" class="guild noStatcord">
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
