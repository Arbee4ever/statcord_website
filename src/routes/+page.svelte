<script>
	import DiscordLogo from '$lib/img/discord_logo.svg';
	import StatcordLogo from '$lib/img/statcord_logo.jpg';
</script>

<main>
	<div class="cardHolder">
		<div class="info card">
			<h1 id="title" class="name">
				<img src={StatcordLogo} alt="Statcord Logo" />Statcord
			</h1>
			<p id="description">Just another leveling Bot with some unique Features.</p>
			<div class="buttons">
				<a
					id="addToDiscord"
					href="https://discord.com/api/oauth2/authorize?client_id=959915020152627271&permissions=1515318660160&scope=bot"
				>
					<img src={DiscordLogo} alt="Discord Logo" />
					Add to Discord
				</a>
				<a id="joinSupportServer" href="https://arbeeco.de/links/discord">
					<img src={DiscordLogo} alt="Discord Logo" />
					Join Support Server
				</a>
			</div>
		</div>
		<div class="leaderboards card">
			<h1 id="title">Leaderboards</h1>
			<div class="buttons guildList card">
				<a id="joinSupportServer" class="login" href="/"> Coming soon... </a>
			</div>
		</div>
		<div class="dashboards card">
			<h1 id="title">Dashboards</h1>
			<div class="buttons guildList card">
				<a id="joinSupportServer" class="login" href="/"> Coming soon... </a>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		display: grid;
		align-items: center;
	}

	.cardHolder {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: repeat(2, 1fr);
		gap: 1vh;
		margin-left: auto;
		margin-right: auto;
		align-items: center;
	}

	.card {
		position: relative;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		height: min-content;
		padding: 1vh;
	}

	.info {
		grid-area: 1 / 1 / 2 / 3;
	}

	#title {
		display: flex;
		align-items: center;
	}

	#title img {
		border-radius: 100%;
		height: 32pt;
	}

	.name {
		text-decoration: underline;
	}

	#description {
		margin: 1vh 0 1vh;
	}

	.buttons {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 1fr;
		grid-column-gap: 1vh;
	}

	.buttons img {
		height: 1vh;
	}

	.buttons a {
		padding: 1vh;
		border: none;
		border-radius: 0.5vh;
		color: white;
		text-align: center;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
	}

	.buttons a:hover {
		filter: brightness(90%);
	}

	#addToDiscord {
		background-color: #5865f2;
	}

	#joinSupportServer {
		background: rgba(0, 0, 0, 0.25);
	}

	.login {
		margin: auto;
	}

	.guildList {
		display: flex;
		align-items: center;
		min-width: 30vw;
	}

	/*medium screens (tablets)*/
	@media only screen and (max-width: 1024px) {
		.info {
			grid-area: 1 / 1 / 1 / 1;
		}

		.cardHolder {
			display: grid;
			grid-template-columns: 1fr;
			grid-template-rows: repeat(3, 1fr);
		}
	}
</style>
