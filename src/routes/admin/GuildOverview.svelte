<script lang='ts'>
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import AutoGrowTextarea from '$components/input/AutoGrowTextarea.svelte';

	export let guildId: string | null;
	let guild: string;
	onMount(async () => {
		let guildReq = await fetch(`${env.PUBLIC_STATCORD_API_URL}/guilds/${guildId}`);
		guild = JSON.stringify(await guildReq.json(), null, 2);
		console.log('guild', guild);
	});
</script>

{#if guild}
	<div class='holder standalone card'>
		<AutoGrowTextarea value={guild}></AutoGrowTextarea>
	</div>
{/if}

<style lang='scss'>
  :global(textarea) {
    border: none;
    resize: none;
    background-color: transparent;
    color: white;
  }
</style>