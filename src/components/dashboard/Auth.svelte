<script lang="ts">
	import Input from '$components/input/Input.svelte';
	import { createEventDispatcher } from 'svelte';
	export let category: any;
	const dispatch = createEventDispatcher();

	const onChange = (event: { detail: { id: any; value: any } }) => {
		dispatch('change', {
			id: event.detail.id,
			value: event.detail.value
		});
	};
</script>

<Input
	value={category.token}
	id="token"
	type="Text"
	editable={false}
	on:input={onChange}
	label="Token"
/>
