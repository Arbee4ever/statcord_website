<script lang="ts">
	import Input2 from '$components/input/Input2.svelte';
	import { createEventDispatcher } from 'svelte';
	export let category: any;
	const dispatch = createEventDispatcher();

	const onChange = () => {
		dispatch('change')
	};
</script>

<Input2 label="Token">
	<input contenteditable="false" class="card input" on:input={onChange} type="text" bind:value={category.token} />
</Input2>
