<script lang='ts'>
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { page } from '$app/stores';

	let data: { other_guilds: object[] };
	let bot;
	let online: boolean;
	onMount(async () => {
		const req = await fetch(`${env.PUBLIC_STATCORD_API_URL}/guilds`);
		online = req.status == 200;
		data = await req.json();
		bot = $page.data.bot;
	});
</script>

<div class='botInfo'>
	<div class='card'>
		{#if data}
			{#if bot.banner}
				<img
					class='botBanner'
					src='https://cdn.discordapp.com/banners/{bot.id}/{bot.banner}'
					alt='Guild Banner'
				/>
			{/if}
			<div class='card'>
				<div class='element'>
					{#if bot.avatar}
						<img
							class='avatar'
							src='https://cdn.discordapp.com/avatars/{bot.id}/{bot.avatar}'
							alt='Bot'
						/>
					{/if}
					<p class='botName'>{bot.username}</p>
				</div>
			</div>
			{#if bot.description}
				<p class='card guildDescription'>{bot.description}</p>
			{/if}
			<div class='card infoOther'>
				<p>{data.other_guilds.length} Guilds</p>
			</div>
		{:else}
			<p class='loading'>Please wait, data is loading...</p>
		{/if}
	</div>
</div>

<style lang='scss'>
  .botInfo {
    display: flex;
    flex-direction: column;
    gap: 1vh;
    position: sticky;
    align-self: start;
    top: 2vh;

    .card {
      display: flex;
      flex-direction: column;
      gap: 1vh;

      & > * {
        width: 100%;
      }

      .botBanner {
        width: 100%;
        border-radius: 10px;
      }

      .infoOther {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        gap: 1vh;

        p {
          white-space: nowrap;
        }
      }
    }
  }

  @media only screen and (max-width: 500px) {
    .botInfo {
      width: 100%;
    }

    .guildBanner {
      display: none;
    }

    .guildDescription {
      display: none;
    }

    .infoOther {
      display: none;
    }
  }

  .avatar {
    height: 5vh;
    border-radius: 100%;
    margin-right: 1vh;
  }

  .botName {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    line-height: 5vh;
  }

  .elementList {
    z-index: 1;
  }

  .element,
  .elements {
    display: flex;
  }

  .elements {
    margin-top: 1vh;
    box-shadow: none;
  }
</style>