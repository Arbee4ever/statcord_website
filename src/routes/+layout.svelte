<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Footer from '$components/general/Footer.svelte';
	import Header from '$components/general/Header.svelte';
	import StatcordLogo from '$lib/img/statcord_logo.jpg';
	import StatcordLogoRound from '$lib/img/statcord_logo_round.png';

	if (browser) {
		if ($page.url.searchParams.get('do') == 'abarrelroll') {
			setTimeout(() => {
				document.body.classList.add('roll');
			}, 1000);
		}
	}
</script>

<svelte:head>
	<meta charset="utf-8" />
	<title>Statcord</title>
	<meta name="description" content="Just another leveling Bot with some unique Features." />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="icon" href={StatcordLogoRound} />
	<link rel="canonical" href="https://statcord.arbeeco.de" />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:site" content="@0Arbee0" />
	<meta name="twitter:creator" content="@0Arbee0" />
	<meta property="og:url" content="https://arbeeco.de" />
	<meta property="og:title" content="Statcord" />
	<meta property="og:description" content="Just another leveling Bot with some unique Features." />
	<meta property="og:image" content={StatcordLogo} />
	<meta name="theme-color" content="#2b8eaf" />
	<meta name="keywords" content="Programming, Bot, Discord, Arbee, GitHub" />
</svelte:head>

<main>
	<Header />
	<slot />
	<Footer />
</main>

<style>
	@import url(https://fonts.bunny.net/css?family=josefin-sans:400);

	:global(*) {
		font-family: 'Josefin Sans', sans-serif;
		margin: 0%;
		scrollbar-width: auto;
		scrollbar-color: rgba(127, 127, 127, 0.502) #000000;
	}

	:global(*)::-webkit-scrollbar {
		width: 12px;
	}

	:global(*)::-webkit-scrollbar-thumb {
		background-color: #00000080;
		border-radius: 10px;
		border: 0px;
	}

	:global(html) {
		scroll-behavior: smooth;
		overflow: overlay;
		background: linear-gradient(to bottom right, #2b8eaf, #b222a8);
		transition: all 1s;
	}

	:global(h1, h2, h3, a, p) {
		color: White;
		text-decoration: none;
	}

	:global(main) {
		min-height: 100vh;
	}

	:global(.hide) {
		opacity: 0;
	}

	:global(.roll) {
		rotate: 360deg;
	}

	:global(.card) {
		position: relative;
		margin-left: auto;
		margin-right: auto;
		height: fit-content;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		padding: 2vh;
	}

	:global(.loading) {
		text-align: center;
		vertical-align: middle;
	}
</style>
