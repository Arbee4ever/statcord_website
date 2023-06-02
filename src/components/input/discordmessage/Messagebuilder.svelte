<script lang='ts'>
	import StatcordLogo from '$lib/img/statcord_logo.jpg';
	import { createEventDispatcher } from 'svelte';
	import Button from '../Button.svelte';
	import Embed from './Embed.svelte';
	import AutoresizingTextArea from 'svelte-textarea-autoresize';

	export let value = {};
	const dispatch = createEventDispatcher();

	function addEmbed(e) {
		const newEmbed = {
			'type': 'rich'
		};
		if (value['embeds'] == undefined) {
			value['embeds'] = [
				newEmbed
			];
			value = value;
		} else {
			value['embeds'].splice(e.detail.index + 1, 0, newEmbed);
			/*value['embeds'].push(newEmbed);*/
			value = value;
		}
	}

	function onChange() {
		dispatch('change');
	}

	function deleteEmbed(e) {
		if (e.detail.index > -1) {
			value['embeds'].splice(e.detail.index, 1);
		}
		if (value['embeds'].length == 0) {
			delete value['embeds'];
		}
		value = value;
		dispatch('change');
	}
</script>

<div class='holder card'>
	<div class='botUser'>
		<img src={StatcordLogo} alt='Statcord Logo' />
	</div>
	<div class='content'>
		<div class='name'>
			<p>Statcord</p>
			<span class='botTag'>
				<svg width='14' height='14' viewBox='0 0 16 16'>
					<path d='M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z' fill='currentColor' />
				</svg>
					BOT
				</span>
		</div>
		{#if value}
			<AutoresizingTextArea bind:value={value.content} on:input={onChange} placeholder='Message content' />
			{#if value.embeds}
				{#each value.embeds as embed, i}
					<Embed bind:embed={embed} index={i} on:change={onChange} on:delete={deleteEmbed} on:add={addEmbed} />
				{/each}
			{/if}
			<!--<Button on:click={addEmbed}>Add Embed</Button>-->
		{/if}
	</div>
</div>

<style lang='scss'>
  .holder {
    z-index: 2;
    background-color: #36393f;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    gap: 10px;
    width: 100%;
  }

  .botUser {
    display: flex;
    height: 40px;
    width: 40px;

    img {
      border-radius: 100%;
    }
  }

  .content {
    width: 100%;

    .name {
      display: flex;
      margin: 0;
      color: white;

      p {
        font-weight: bold;
        width: min-content;
        margin: 0;
      }

      .botTag {
        display: flex;
        background: #5966f3;
        border-radius: 3px;
        color: #fff !important;
        flex-shrink: 0;
        font-size: 10px;
        font-weight: 500;
        line-height: 16px;
        margin-left: 6px;
        padding: 1px 2px 1px 0;
        text-transform: uppercase;
        vertical-align: bottom;
        height: 14px;
      }
    }

    :global(textarea) {
      width: 100%;
      border: none;
      outline: none;
      resize: none;
      background-color: transparent;
      color: white;
    }
  }
</style>
