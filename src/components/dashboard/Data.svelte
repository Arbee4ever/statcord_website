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
	checked={category.deleteonleave}
	id="deleteonleave"
	type="checkbox"
	on:input={onChange}
	label="Delete Userdata on Leave"
/>