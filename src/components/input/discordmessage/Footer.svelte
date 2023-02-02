<script lang="ts">
	import AutoGrowTextarea from '$components/input/AutoGrowTextarea.svelte';
	import DetailsDropdown from './DetailsDropdown.svelte';
	import Input from '$components/input/Input.svelte';
	import PlaceholderImg from '$lib/img/image_placeholder.svg';
	import { createEventDispatcher } from 'svelte';

	export let iconUrl: any;
	export let value: any;

	const dispatch = createEventDispatcher();

	function onInput() {
		dispatch('input', {
			footer: {
				url: iconUrl,
				text: value
			}
		});
	}
</script>

<div class="inline footer">
	<DetailsDropdown placeholderIcon={PlaceholderImg} icon={iconUrl}>
		<Input
			label="Footer Icon Url:"
			type="url"
			id="icon_url"
			on:input={onInput}
			bind:value={iconUrl}
		/>
	</DetailsDropdown>
	<AutoGrowTextarea placeholder="Footer Text" bind:value id="text" on:input={onInput} />
</div>
