<script>
	import StatcordImg from '/src/assets/img/StatcordImg.png';
</script>

<div class="card" data-tilt data-tilt-scale="0.95" data-tilt-max="5">
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
	@keyframes transform {
		0%,
		100% {
			border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
		}
		14% {
			border-radius: 40% 60% 54% 46% / 49% 60% 40% 51%;
		}
		28% {
			border-radius: 54% 46% 38% 62% / 49% 70% 30% 51%;
		}
		42% {
			border-radius: 61% 39% 55% 45% / 61% 38% 62% 39%;
		}
		56% {
			border-radius: 61% 39% 67% 33% / 70% 50% 50% 30%;
		}
		70% {
			border-radius: 50% 50% 34% 66% / 56% 68% 32% 44%;
		}
		84% {
			border-radius: 46% 54% 50% 50% / 35% 61% 39% 65%;
		}
	}

	@keyframes movement {
		0%,
		100% {
			transform: translateY(0vh);
		}
		50% {
			transform: translateY(-2vh);
		}
	}

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
