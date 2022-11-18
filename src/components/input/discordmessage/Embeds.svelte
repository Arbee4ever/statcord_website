<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Embed from './Embed.svelte';

	export let embeds: any;
	
	const dispatch = createEventDispatcher();

	function onInput(event) {
		embeds[event.detail.id] = {
			
		}
		console.log(event.detail)
		dispatch('input', {
			embeds
		});
	}
</script>

{#each embeds as embed, i}
	<Embed {embed} id={i} on:input={onInput} />
{/each}
