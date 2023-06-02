<script lang="ts">
	export let label = '';
</script>

<div class="holder">
	{#if label}
		<p>{label}</p>
	{/if}
	<slot />
</div>

<style lang="scss">
	.holder {
		align-items: center;
		height: fit-content;
	}
</style>
