<script lang='ts'>
	import Button from '$components/input/Button.svelte';
	import { page } from '$app/stores';
	import XIcon from '$lib/img/xIcon.svg';
	import { createEventDispatcher } from 'svelte';
	import SelectorDropdown from '$components/input/SelectorDropdown.svelte';
	import { slide } from 'svelte/transition';

	export let category: any;
	const dispatch = createEventDispatcher();
	const newRole = {
		name: [],
		requirements: [],
		roles: []
	};
	let possibleValues = [{ id: 'textmessages' }, { id: 'voiceseconds' }];
	let roles = JSON.parse(JSON.stringify($page.data.roles));
	var found = roles.filter(function(item) {
		return item.id === $page.params.guildId;
	});
	const index = roles.indexOf(found[0]);
	if (index != -1) {
		roles.splice(index, 1);
	}

	function handleClick() {
		category.roles.push(newRole);
		category = category;
	}

	function onChange() {
		dispatch('change');
	}

	function deleteOption(i) {
		category.roles.splice(i, 1);
		category = category;
		onChange();
	}
</script>

{#if category.roles.length !== 0}
	{#each category.roles as role, i}
		<div class='content card' transition:slide>
			<div class='inline'>
				<input
					class='input card'
					on:input={onChange}
					type='text'
					placeholder='Name'
					bind:value={role.name}
				/>
				<span class='delete iconWrapper'>
					<img
						src={XIcon}
						alt='Delete'
						on:click={() => deleteOption(i)}
						on:keydown={() => deleteOption(i)}
					/>
				</span>
			</div>
			<div class='wrapper'>
				<SelectorDropdown
					on:select={onChange}
					bind:selected={role.requirements}
					bind:options={possibleValues}
				>
					Requirements
				</SelectorDropdown>
				<SelectorDropdown on:select={onChange} bind:selected={role.roles} bind:options={roles}>
					Roles
				</SelectorDropdown>
			</div>
		</div>
	{/each}
{:else}
	<div class='card content' transition:slide>
		<p>Nothing here yet!</p>
	</div>
{/if}
<span class='holder' transition:slide>
	<Button class='noshadow' width='100%' on:click={handleClick}>Add Role</Button>
</span>

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

      .delete {
        display: block;
        cursor: pointer;
        height: 22px;
        line-height: 24px;
        text-align: center;
        margin: 0 0 0 4px;
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

    .wrapper {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1vw;
    }
  }

  .card {
    background-color: transparent;
    box-shadow: none;
    border: solid 1px #00000040;
  }

  .holder :global(.noshadow) {
    box-shadow: none;
  }
</style>
