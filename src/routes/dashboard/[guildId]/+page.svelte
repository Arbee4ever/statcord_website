<script lang="ts">
	import { page } from '$app/stores';
</script>

<main>
	<div class="card">
		<p>{$page.params.guildId}</p>
	</div>
</main>

<style>
	main {
		display: flex;
		align-items: center;
	}

	.card {
		margin: auto;
		position: relative;
		height: fit-content;
		background: #1a1a1a99;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		padding: 1vh;
		width: 30vw;
		height: 30vh;
	}
</style>
