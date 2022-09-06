<script lang="ts">
	export let pfp: string;
	export let name: string;
	export let score: string;
	export let i: number;
    let pos: number = i+1;
</script>

<div class="member">
	<div class="user">
		{#if pos == 1}
			<p class="position first">{pos}</p>
		{:else if pos == 2}
			<p class="position second">{pos}</p>
		{:else if pos == 3}
			<p class="position third">{pos}</p>
		{:else}
			<p class="position">{pos}</p>
		{/if}
		<img class="avatar" src={pfp} alt="User" />
		<p class="name">{name}</p>
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
		background-color: rgb(218 158 59) !important;
		box-shadow: 0 0 32px 0 rgb(218 158 59) !important;
	}

	.second {
		background-color: rgb(152 152 152) !important;
		box-shadow: 0 0 32px 0 rgb(152 152 152) !important;
	}

	.third {
		background-color: rgb(174, 116, 65) !important;
		box-shadow: 0 0 32px 0 rgb(174, 116, 65) !important;
	}

	.user {
		grid-area: 1 / 1 / 2 / 2;
		display: flex;
	}

	.position {
		height: fit-content;
		border-radius: 10px;
		background: rgba(0, 0, 0, 0.25);
		box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
		border-radius: 100%;
		font-weight: bold;
		line-height: 5vh;
		width: 5vh;
		text-align: center;
	}

	.avatar {
		height: 5vh;
		border-radius: 100%;
		margin-left: 1vh;
	}

	.name {
		margin-left: 1vh;
		text-align: center;
		height: 5vh;
		line-height: 5vh;
	}

	.stats {
		grid-area: 1 / 3 / 2 / 4;
	}

	.score {
		height: fit-content;
		background: #1a1a1a99;
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
