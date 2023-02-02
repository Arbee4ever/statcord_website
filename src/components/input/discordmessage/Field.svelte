<script lang="ts">
	import AutoGrowTextarea from '$components/input/AutoGrowTextarea.svelte';
	import Input from '$components/input/Input.svelte';
	import { createEventDispatcher } from 'svelte';

	export let field: any = false;
	export let id: any;
	const dispatch = createEventDispatcher();

	function onInput() {
		dispatch('input', {
			id: id,
			value: {
				field
			}
		});
	}
</script>

<div class="inline">
	<Input type="checkbox" bind:checked={field.inline} id="{id}.inline" on:input={onInput} />
	<AutoGrowTextarea
		placeholder="Field {id + 1} name"
		id="{id}.name"
		bind:value={field.name}
		on:input={onInput}
	/>
</div>
<AutoGrowTextarea placeholder="Field {id + 1} value" id="{id}.value" bind:value={field.value} on:input={onInput} />

<style lang="scss">
	.inline {
		display: flex;
	}
</style>