<script lang="ts">
	import AutoGrowTextarea from '$components/input/AutoGrowTextarea.svelte';
	import DetailsDropdown from './DetailsDropdown.svelte';
	import Input from '$components/input/Input.svelte';
	import PlaceholderImg from '$lib/img/image_placeholder.svg';
	import IconLink from '$lib/img/link_icon.svg';
	import { createEventDispatcher } from 'svelte';

	export let iconUrl: any;
	export let author: any;

	const dispatch = createEventDispatcher();

	function onInput() {
		dispatch('input', {
			author: {
				icon_url: iconUrl,
				url: author.url,
				name: author.name
			}
		});
	}
</script>

<div class="author inline">
	<DetailsDropdown placeholderIcon={PlaceholderImg} icon={iconUrl} border_radius="100%">
		<Input label="Author Icon Url:" type="url" id="icon_url" on:input={onInput} bind:value={iconUrl} />
	</DetailsDropdown>
	<DetailsDropdown icon={IconLink}>
		<Input label="Author Url:" type="url" id="url" bind:value={author.url} on:input={onInput} />
	</DetailsDropdown>
	<AutoGrowTextarea placeholder="Author Name" bind:value={author.name} id="name" on:input={onInput} />
</div>
