<script lang='ts'>
	import StatcordLogo from '$lib/img/statcord_logo.jpg';
	import { createEventDispatcher } from 'svelte';
	import Embed from './Embed.svelte';
	import AutoresizingTextArea from 'svelte-textarea-autoresize';
	import AutoGrowTextarea from '$components/input/AutoGrowTextarea.svelte';
	import { slide } from 'svelte/transition';

	export let value = {};
	const dispatch = createEventDispatcher();

	function onChange() {
		dispatch('change');
	}

	const newEmbed = {
		'type': 'rich'
	};

	function addEmbed(e) {
		if (value['embeds'] == undefined) {
			value['embeds'] = [
				newEmbed
			];
			value = value;
		} else {
			value['embeds'].splice(e.detail.index + 1, 0, structuredClone(newEmbed));
			value = value;
		}
	}

	function deleteEmbed(e) {
		if (value['embeds'] == undefined) return;
		if (e.detail.index > -1) {
			value['embeds'].splice(e.detail.index, 1);
		}
		if (value['embeds'].length == 0) {
			value['embeds'] = [
				structuredClone(newEmbed)
			];
		}
		value = value;
		dispatch('change');
	}

	let selectedEditor = 'visual';

	function selectEditor(editor: string) {
		selectedEditor = editor;
	}
</script>

<main transition:slide>
	<div class='editorSelector {selectedEditor}'>
		<p class={selectedEditor == "visual"} on:click={() => {selectEditor("visual")}}>Visual Builder</p>
		<p class={selectedEditor == "json"} on:click={() => {selectEditor("json")}}>JSON</p>
	</div>
	{#if selectedEditor === "visual"}
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
					<AutoresizingTextArea bind:value={value.content} on:input={onChange} placeholder='Message content' style='width: 100%'/>
					{#if value.embeds && value.embeds.length != 0}
						{#each value.embeds as embed, i (embed)}
							<Embed bind:embed={embed} index={i} on:change={onChange} on:delete={deleteEmbed} on:add={addEmbed} />
						{/each}
					{/if}
				{/if}
			</div>
		</div>
	{:else if selectedEditor === "json"}
		<div class='holder standalone card'>
			<AutoGrowTextarea on:input={onChange} bind:value={value} autowrap={false}></AutoGrowTextarea>
		</div>
	{/if}
</main>


<style lang='scss'>
  .editorSelector {
    cursor: pointer;
    display: flex;
    width: 100%;

    p {
      border-radius: 10px 10px 0 0;
      width: 100%;
      height: 4vh;
      text-align: center;
      line-height: 4vh;
      background-color: #2f3136;

      &.true {
        background-color: #36393f;
      }
    }
  }

  .holder {
    background-color: #36393f;
    padding: 10px;
    border-radius: 0 0 10px 10px;
    display: flex;
    gap: 10px;
    width: 100%;
    box-shadow: none;
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

    main {
      position: relative;
    }

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
  }

  :global(textarea) {
    border: none;
    outline: none;
    resize: none;
    background-color: transparent;
    color: white;
  }

  .standalone {
    :global(textarea) {
      border: #2f3136 solid 3px;
      background-color: #2f3136;
      border-radius: 10px;
    }
  }
</style>
