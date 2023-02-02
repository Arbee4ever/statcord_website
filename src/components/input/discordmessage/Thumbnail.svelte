<script lang="ts">
	import DetailsDropdown from './DetailsDropdown.svelte';
	import Input from '$components/input/Input.svelte';
	import PlaceholderImg from '$lib/img/image_placeholder.svg';
	import { createEventDispatcher } from 'svelte';

	export let thumbnailUrl: any;

	const dispatch = createEventDispatcher();

	function onInput() {
		dispatch('input', {
			thumbnail: {
				url: thumbnailUrl
			}
		});
	}
</script>

<div class="thumbnail">
	<DetailsDropdown height="10vw" placeholderIcon={PlaceholderImg} icon={thumbnailUrl}>
		<Input
			label="Thumbnail:"
			type="url"
			width="200px"
			id="url"
			on:input={onInput}
			bind:value={thumbnailUrl}
		/>
	</DetailsDropdown>
</div>

<style lang="scss">
	.thumbnail {
		float: right;
		right: 20px;
	}
</style>
