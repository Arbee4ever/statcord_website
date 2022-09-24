<script>
	import { page } from '$app/stores';
</script>

<main>
	<div id="notFound">
		<div>
			<h1>{$page.status}</h1>
			<p><strong>{$page.error.message}</strong></p>
		</div>
	</div>
</main>

<style>
	#notFound {
		min-height: 100vh;
		font-size: 150%;
		display: flex;
		align-items: center;
	}

	#notFound div {
		width: 100%;
		text-align: center;
	}
</style>
