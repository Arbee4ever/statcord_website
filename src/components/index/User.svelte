<script lang="ts">
	import PlaceholderImg from '$lib/img/icon_clyde_circle_white.svg';
	import DetailsDropdown from '$components/input/discordmessage/DetailsDropdown.svelte';

	export let user: any;
	let showDetails = false;
</script>

<div id="user">
	{#if user}
		<DetailsDropdown placeholderIcon="https://cdn.discordapp.com/avatars/{user.id}/{user.avatar}.png" height="5vh">
			<h1>{user.username}#{user.discriminator}</h1>
			<a href="/api/signout" class="signout">Sign out </a>
		</DetailsDropdown>
	{:else}
		<DetailsDropdown placeholderIcon={PlaceholderImg}>
			<a href="/api/auth" class="signout">Log in </a>
		</DetailsDropdown>
	{/if}
</div>

<style>
	#user {
		position: absolute;
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
