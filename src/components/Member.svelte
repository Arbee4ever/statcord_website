<script lang="ts">
	export let pfp: string;
	export let name: string;
	export let score: string;
	export let i: number;
</script>

<div class="member">
	<div class="user">
		<p class="position">{i + 1}</p>
		<img class="avatar" src={pfp} alt="ARBEE Logo" />
		<p class="name">{name}</p>
	</div>
	<div class="stats">
		<p class="score">{score}</p>
	</div>
</div>

<style>
	.member {
		padding: 0.5vw;
		display: grid;
		grid-template-columns: 1fr, 1fr, 1fr;
		grid-template-rows: 1fr;
		grid-column-gap: 10px;
	}

	.user {
		grid-area: 1 / 1 / 2 / 2;
		display: flex;
	}

	.position {
		height: fit-content;
		background: #1a1a1a99;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		border-radius: 100%;
		display: inline-block;
		font-weight: bold;
		line-height: 5vh;
		width: 5vh;
		text-align: center;
	}

	.avatar {
		height: 5vh;
		border-radius: 100%;
		margin-left: 1vw;
	}

	.name {
		margin-left: 1vw;
		text-align: center;
		height: 5vh;
		line-height: 5vh;
	}

	.stats {
		grid-area: 1 / 3 / 2 / 4;
	}

	.score {
		text-align: end;
		height: 5vh;
		line-height: 5vh;
	}
</style>
