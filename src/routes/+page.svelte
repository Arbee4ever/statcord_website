<script>
	import StatcordImg from '/src/assets/img/StatcordImg.png';
    import tilt from '../lib/script/tilt.js';
	
	let reverse = false;
</script>

<div class="card" use:tilt={{ scale: .9, max: 5, reverse }}>
	<h1 id="title">Statcord</h1>
	<p id="description">Just another leveling Bot with some unique Features.</p>
	<img src={StatcordImg} alt="Statcord placeholder" />
	<div id="buttons">
		<a id="addToDiscord">Not yet available</a>
		<a href="https://discord.gg/E2DNKGVfwq" id="joinTestingServer">
			Join the testing Server to help
		</a>
	</div>
</div>

<style>
	.card {
		position: relative;
		margin-left: 35vw;
		height: fit-content;
		background: #1a1a1a99;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		width: 30vw;
		height: min-content;
		padding: 1vh;
	}

	.card img {
		margin-top: 1vh;
		object-position: 0% 0%;
		width: 100%;
		height: calc(100% - 15vh);
		object-fit: cover;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		border-radius: 10px;
	}

	#description {
		margin-top: 1vh;
	}

	#buttons {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr;
		grid-column-gap: 1vh;
	}

	#addToDiscord {
		margin-top: 1vh;
		border-top-right-radius: 10px;
		border-top-left-radius: 10px;
		height: 4vh;
		align-content: center;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		border-radius: 10px;
		text-align: center;
		grid-area: 1 / 1 / 2 / 2;
		color: gray;
		cursor: default;
		height: 4vh;
		line-height: 4vh;
	}

	#joinTestingServer {
		margin-top: auto;
		border-top-right-radius: 10px;
		border-top-left-radius: 10px;
		height: 4vh;
		align-content: center;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		border-radius: 10px;
		text-align: center;
		grid-area: 1 / 2 / 2 / 3;
		height: 4vh;
		line-height: 4vh;
	}

	/*medium screens (tablets)*/
	@media only screen and (max-width: 1024px) {
		.card {
			width: 60vw;
			margin-left: 20vw;
		}
	}

	/*small screens (phones)*/
	@media only screen and (max-width: 480px) {
		.card {
			width: auto;
			margin-left: 1vw;
		}
	}
</style>
