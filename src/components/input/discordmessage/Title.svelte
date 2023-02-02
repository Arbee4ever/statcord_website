<script lang="ts">
	import AutoGrowTextarea from '$components/input/AutoGrowTextarea.svelte';
	import DetailsDropdown from './DetailsDropdown.svelte';
	import Input from '$components/input/Input.svelte';
	import IconLink from '$lib/img/link_icon.svg';
	import { createEventDispatcher } from 'svelte';

	export let url: any;
	export let title: any;

	const dispatch = createEventDispatcher();

	function onInput() {
		dispatch('input', {
			url: url,
			text: title
		});
	}
</script>

<div class="title inline">
	<DetailsDropdown icon={IconLink}>
		<Input label="Url:" type="url" id="url" bind:value={url} on:input={onInput} />
	</DetailsDropdown>
	<AutoGrowTextarea placeholder="Title" bind:value={title} id="title" on:input={onInput} />
</div>
