<script>
	import DiscordLogo from '$lib/img/discord_logo.svg';
	/**
	 * @type {String}
	 */
	export let url = "";
	export let img = DiscordLogo;
    export let alt = "Discord Logo"
</script>

<a class="login" href={url}>
	<img src={img} alt={alt} />
	<slot />
</a>

<style>
	.login {
		margin: var(--margin, auto);
		background-color: var(--color, #5865f2);
		padding: 1vh;
		border: none;
		border-radius: 5px;
		color: white;
		text-align: center;
		cursor: pointer;
		transition: all .3s ease-in-out;
	}

	.login img {
		height: 1vh;
	}

	.login:hover {
		filter: brightness(90%);
	}
</style>
