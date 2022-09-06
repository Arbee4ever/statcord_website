<script>
	import { page } from '$app/stores';
</script>

<main>
	<div id="notFound">
		<h1>{$page.status}</h1>
		<p><strong>{$page.error.message}</strong></p>
	</div>
</main>

<style>
	#notFound {
		width: 100px;
		transform: translate(0, 50%);
		width: 100%;
		text-align: center;
		font-size: 150%;
		color: hsl(0, 0%, 100%);
	}
</style>
