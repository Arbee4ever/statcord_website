<script lang="ts">
	export let pfp: string;
	export let name: string;
	export let score: string;
	export let i: number;
	let pos: number = i + 1;
</script>

<div class="member">
	<div class="user">
		<div class="namepos">
			<p class="position">{pos}</p>
			<p class="name">{name}</p>
		</div>
		{#if pos == 1}
			<img class="avatar first" src={pfp} alt="User" />
		{:else if pos == 2}
			<img class="avatar second" src={pfp} alt="User" />
		{:else if pos == 3}
			<img class="avatar third" src={pfp} alt="User" />
		{:else}
			<img class="avatar" src={pfp} alt="User" />
		{/if}
	</div>
	<div class="stats">
		<p class="score">{score}</p>
	</div>
</div>

<style>
	.member {
		padding: 2vh;
		margin: 1vh;
		display: grid;
		grid-template-columns: 1fr, 1fr, 1fr;
		grid-template-rows: 1fr;
		grid-column-gap: 10px;
		height: fit-content;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
	}

	.first {
		outline: 3px solid rgb(218 158 59);
		box-shadow: 0 0 32px 0 rgb(218 158 59);
	}

	.second {
		outline: 3px solid rgb(152 152 152);
		box-shadow: 0 0 32px 0 rgb(152 152 152);
	}

	.third {
		outline: 3px solid rgb(174, 116, 65);
		box-shadow: 0 0 32px 0 rgb(174, 116, 65);
	}

	.user {
		grid-area: 1 / 1 / 2 / 2;
		display: flex;
	}

	.namepos {
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		width: min-content;
		height: 3vh;
		line-height: 3vh;
		height: 3vh;
		width: min-content;
		align-self: center;
		padding-top: 0.3vh;
		padding-right: 0.5vw;
		padding-left: 0.5vw;
		margin-right: 2vh;
	}

	.position {
		position: absolute;
		font-weight: bold;
	}

	.avatar {
		position: absolute;
		border-radius: 100%;
		width: 5vh;
		margin-left: 3vh;
	}

	.name {
		margin-left: 9vh;
		text-align: center;
	}

	.stats {
		grid-area: 1 / 3 / 2 / 4;
	}

	.score {
		height: fit-content;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		border-radius: 100%;
		font-weight: bold;
		line-height: 5vh;
		width: 5vh;
		text-align: center;
		float: right;
	}
</style>
