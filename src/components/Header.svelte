<script lang="ts">
	import arbeeLogo from '/src/assets/img/2022-01_ARBEE_Wort-Marke_rgb_weiss_01.svg';
	import TopIcon from '/src/assets/img/TopIcon.svg';
	var topBtn: HTMLImageElement;

	function onScroll() {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			topBtn.style.display = 'block';
		} else {
			topBtn.style.display = 'none';
		}
	}

	function scrollUp() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	}
</script>

<svelte:window on:scroll={onScroll} />

<header>
	<noscript>
		<div id="error">
			<strong> This site works best with JavaScript enabled! (╯°□°）╯︵ ┻━┻ </strong>
		</div>
	</noscript>
	<img
		id="topBtn"
		src={TopIcon}
		alt="Click to go back to top."
		on:click={scrollUp}
		bind:this={topBtn}
	/>
	<div id="vignette" />
	<a href="/">
		<img src={arbeeLogo} id="wordmark" alt="ARBEE's Wordmark" />
	</a>
</header>

<style>
	#vignette {
		pointer-events: none;
		position: fixed;
		top: 0;
		width: 100vw;
		height: 100vh;
		box-shadow: 0px 0px 250px 0px #000000 inset;
		z-index: 3;
	}

	#wordmark {
        width: 100%;
		padding-top: 5vh;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 3vh;
		height: 2vh;
	}

	#error {
		font-family: sans-serif;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 500;
		text-align: center;
		font-weight: bold;
		font-size: 120%;
		color: hsl(0, 0%, 100%);
		background-color: #c22e32;
		padding: 5px 0;
	}
	#topBtn {
		display: none;
		position: fixed;
		bottom: 0;
		right: 0;
		z-index: 2;
		cursor: pointer;
	}
</style>
