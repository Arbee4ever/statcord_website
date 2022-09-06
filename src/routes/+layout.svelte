<script>
	import Footer from '$components/Footer.svelte';
	import Header from '$components/Header.svelte';
</script>

<svelte:head>
    <meta charset="utf-8" />
    <title>Statcord</title>
    <meta name="description" content="Just another leveling Bot with some unique Features.">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="/src/assets/img/2022-01_ARBEE_Bild-Marke_rgb_Verlauf_01.png">
    <link rel="canonical" href="https://arbeeco.de">
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@0Arbee0" />
    <meta name="twitter:creator" content="@0Arbee0" />
    <meta property="og:url" content="https://arbeeco.de" />
    <meta property="og:title" content="Statcord" />
    <meta property="og:description" content="Just another leveling Bot with some unique Features." />
    <meta property="og:image"
        content="https://arbeeco.de/authorImg/2022-01_ARBEE_Bild-Marke_rgb_weiss_bg_verlauf_01.png" />
    <meta name="theme-color" content="#2b8eaf" />
    <meta name="keywords" content="Programming, Bot, Discord, Arbee, GitHub">
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

	:global(body) {
		--scroll-behavior: smooth;
		scroll-behavior: smooth;
		overflow: overlay;
		overflow-x: hidden;
		background: linear-gradient(to bottom right, #2b8eaf, #b222a8);
		background-attachment: fixed;
	}

	:global(h1,
	h2,
	h3,
	a,
	p) {
		color: White;
		text-decoration: none;
	}

    :global(main) {
        min-height: 50vh;
    }

	:global(.hide) {
		opacity: 0;
	}
</style>
