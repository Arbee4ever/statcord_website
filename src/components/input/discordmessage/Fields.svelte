<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Field from './Field.svelte';

	const dispatch = createEventDispatcher();

	export let fields: any;

	function onInput(event) {
		if (event.detail.id + 1 == fields.length && fields.length < 15) {
			fields.push({
				name: '',
				value: '',
				inline: false
			});
		}
		fields[event.detail.id] = {
			name: event.detail.value.name,
			value: event.detail.value.value,
			inline: event.detail.value.inline
		};
		console.log(fields)
		dispatch('input', {
			fields
		});
	}
</script>

<div class="fields">
	{#each fields as field, i}
		<Field {field} id={i} on:input={onInput} />
	{/each}
</div>

<style lang="scss">
	.fields {
		width: calc(100% - 11vw);
	}
</style>
