<script lang='ts'>
	import XIcon from '$lib/img/xIcon.svg';
	import arrowDownIcon from '$lib/img/arrowDownIcon.svg';
	import Messagebuilder from '$components/input/discordmessage/Messagebuilder.svelte';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	export let message;
	export let category;
	export let index;
	export let defaultMsg = false;

	const dispatch = createEventDispatcher();

	function onChange() {
		dispatch('change');
	}

	function deleteMessage() {
		dispatch('delete', {
			index: index
		});
	}

	let visible = -1;

	function toggleMessageOpen(i: number) {
		if (visible == i) {
			visible = -1;
		} else {
			visible = i;
		}
	}
</script>

<div class='content card' transition:slide>
	<div class='inline'>
		{#if defaultMsg}
			<p class='input test'>{message.name}</p>
		{:else}
			<input class='card input' on:input={onChange} bind:value={message.name} />
		{/if}
		<span class='iconWrapper'>
			{#if !defaultMsg}
				<img
					src={XIcon}
					alt='Delete'
					on:click={() => deleteMessage(index)}
					on:keydown={() => deleteMessage(index)}
				/>
			{/if}
			<img
				src={arrowDownIcon}
				class:open={visible === index}
				class='toggleOpenBtn'
				alt='Toggle Open'
				class:clickable={defaultMsg}
				on:click={() => defaultMsg ? toggleMessageOpen(index) : null}
				on:keydown={() => defaultMsg ? toggleMessageOpen(index) : null}
			/>
		</span>
	</div>
	{#if visible === index}
		<Messagebuilder bind:value={message} on:change={onChange} />
	{/if}
</div>

<style lang='scss'>
  .content {
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    color: #36393f;
    display: grid;
    gap: 1vh;

    .inline {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      .iconWrapper {
        cursor: pointer;
        text-align: center;
        display: flex;
        flex-direction: column;
        margin: 0 0 0 1vh;

        img {
          transition: transform .3s ease-in-out;
        }

        .open {
          transform: rotate(180deg);
        }

        .clickable {
          cursor: pointer;
        }
      }
    }

    .input {
      resize: none;
      padding: 15px;
      color: white;
      width: 100%;
    }

    .input:focus {
      outline: rgba(0, 0, 0, 0) solid;
    }
  }

  .card {
    background-color: transparent;
    box-shadow: none;
    border: solid 1px #00000040;
  }
</style>
