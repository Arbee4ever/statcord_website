<script lang="ts">
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

	export let guild: any;
	export let other_guilds: any;
	let showItems = false;

	function handleClick() {
		showItems = !showItems;
	}
</script>

<div class="card" id="dropdown">
	{#if guild}
		<div class="element" on:mousedown={handleClick}>
			{#if guild.icon}
				<img
					class="icon"
					src="https://cdn.discordapp.com/icons/{guild.id}/{guild.icon}"
					alt="Guild Icon"
				/>
			{/if}
			<p class="elementName">{guild.name}</p>
		</div>
		<div class="elementList">
			{#if showItems}
				{#if other_guilds}
					{#each other_guilds as el}
						<a
							class="elements card"
							href={$page.url.pathname.replace($page.params.guildId, el.id)}
							target="_self"
							transition:slide
						>
							{#if el.icon}
								<img
									class="icon"
									src="https://cdn.discordapp.com/icons/{el.id}/{el.icon}"
									alt="Guild Icon"
								/>
							{/if}
							<p class="elementName">{el.name}</p>
						</a>
					{/each}
				{/if}
			{/if}
		</div>
	{/if}
</div>

<style>
	.icon {
		height: 5vh;
		border-radius: 100%;
		margin-right: 1vh;
	}

	.elementName {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.elementList {
		z-index: 1;
	}

	.element,
	.elements {
		display: flex;
	}

	.elements {
		margin-top: 1vh;
		box-shadow: none;
	}

	#dropdown {
		cursor: pointer;
		line-height: 5vh;
		width: 100%;
		max-height: min-content;
		overflow: hidden;
	}
</style>
