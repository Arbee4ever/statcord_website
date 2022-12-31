<script lang="ts">
	import PlaceholderImg from '$lib/img/icon_clyde_circle_white.svg';
	import DetailsDropdown from '$components/input/discordmessage/DetailsDropdown.svelte';

	export let user: any;

	let pfp: any;

	if (user != null) {
		pfp = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
	} else {
		pfp = PlaceholderImg;
	}
</script>

<div id="user">
	{#if user}
		<DetailsDropdown icon={pfp} height="5vh">
			<span class="wrapper">
				<h1>{user.username}#{user.discriminator}</h1>
				<a href="/api/signout" class="signout">Sign out </a>
			</span>
		</DetailsDropdown>
	{:else}
		<DetailsDropdown icon={pfp} height="5vh">
			<a href="/api/auth" class="signout">Log in </a>
		</DetailsDropdown>
	{/if}
</div>

<style>
	#user {
		position: fixed;
		z-index: 2;
		left: 3vh;
		top: 3vh;
		color: rgba(0, 0, 0, 0.25);
	}

	#user h1 {
		font-size: 2vh;
		white-space: nowrap;
	}

	#user a {
		white-space: nowrap;
	}
</style>
