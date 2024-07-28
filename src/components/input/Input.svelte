<script lang='ts'>
	export let label = '';
	export let color = '#FFFFFF';
</script>

<div class='holder' style='--color: {color}'>
	{#if label}
		<p>{label}</p>
	{/if}
	<div class='slotHolder'>
		<slot />
	</div>
</div>

<style lang='scss'>
  .holder {
    align-items: center;
    height: fit-content;
    color: var(--color);

    p {
      color: var(--color);
    }

		.slotHolder {
			display: flex;
			flex-direction: column;
			gap: 1vh;
		}
  }
</style>
