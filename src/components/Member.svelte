<script lang="ts">
	export let pfp: string;
	export let name: string;
	export let score: string;
</script>

<div class="member">
	<div class="user">
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

	.avatar {
		height: 5vh;
		border-radius: 100%;
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
