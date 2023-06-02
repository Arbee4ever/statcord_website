<script lang='ts'>
	import { createEventDispatcher } from 'svelte';
	import Messagebuilder from '$components/input/discordmessage/Messagebuilder.svelte';

	export let category: any;
	const dispatch = createEventDispatcher();

	const onChange = () => {
		dispatch('change');
	};
</script>

<Messagebuilder bind:value={category.rankup} on:change={onChange} />

<style lang='scss'>
</style>
