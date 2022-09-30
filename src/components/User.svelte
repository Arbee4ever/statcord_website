<script>
	/**
	 * @type {{ username: any; discriminator: any; id: any; avatar: any; }}
	 */
	export let user;
</script>

<div id="user">
	<img
		alt="{user.username}#{user.discriminator} avatar"
		src="https://cdn.discordapp.com/avatars/{user.id}/{user.avatar}.png"
	/>
	<h1>{user.username}#{user.discriminator}</h1>
	<a href="api/signout" class="signout">
		<img src="https://api.iconify.design/fe/logout.svg?color=white" alt="Sign Out" />
	</a>
</div>

<style>
	#user {
		height: min-content;
		display: flex;
		flex-direction: row;
	}

	#user h1 {
		font-size: 2.5vh;
	}

	#user img {
		height: 2.5vh;
	}
</style>
