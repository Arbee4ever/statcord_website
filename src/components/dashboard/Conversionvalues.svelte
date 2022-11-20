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
	value={category.vcsecondsperpoint}
	id="vcsecondsperpoint"
	type="number"
	on:input={onChange}
	label="Seconds in voicechat / Point"
/>
<Input
	value={category.msgsperpoint}
	id="msgsperpoint"
	type="number"
	on:input={onChange}
	label="Messages / Point"
/>
<Input
	value={category.cooldown}
	id="cooldown"
	type="number"
	on:input={onChange}
	label="Cooldown (in ms)"
/>
