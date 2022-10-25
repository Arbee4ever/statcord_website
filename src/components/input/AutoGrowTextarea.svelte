<script lang="ts">
	export let value = '';
	export let placeholder = '';

	$: rows = (value.match('[\n\r]+') || []).length + 1 || 1;
</script>

<textarea {rows} bind:value {placeholder} />

<style>
	textarea {
		white-space: nowrap;
		resize: none;
		overflow-x: scroll;
	}
</style>
