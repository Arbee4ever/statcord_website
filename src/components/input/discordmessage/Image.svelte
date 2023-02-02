<script lang="ts">
	import DetailsDropdown from './DetailsDropdown.svelte';
	import Input from '$components/input/Input.svelte';
	import PlaceholderImg from '$lib/img/image_placeholder.svg';
	import { createEventDispatcher } from 'svelte';

	export let imageUrl: any;
	
	const dispatch = createEventDispatcher();

	function onInput() {
		dispatch('input', {
			thumbnail: {
				url: imageUrl
			}
		});
	}
</script>

<DetailsDropdown height="20vw" placeholderIcon={PlaceholderImg} bind:icon={imageUrl}>
	<Input label="Imagelink:" type="url" id="url" on:input={onInput} bind:value={imageUrl} />
</DetailsDropdown>
