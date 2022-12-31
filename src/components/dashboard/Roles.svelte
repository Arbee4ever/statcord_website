<script lang="ts">
	import Button from '$components/input/Button.svelte';
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import SelectorDropdown from '$components/input/SelectorDropdown.svelte';
	export let category: any;
	const dispatch = createEventDispatcher();
	const newRole = {
		name: [],
		requirements: [],
		roles: []
	};
	let possibleValues = [{ id: 'textmessages' }, { id: 'voiceseconds' }];
	let roles = JSON.parse(JSON.stringify($page.data.roles));
	var found = roles.filter(function (item) {
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
</script>

{#each category.roles as role}
	<div class="content card">
		<input class="input card" on:input={onChange} type="text" placeholder="Name" bind:value={role.name} />
		<div class="wrapper">
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
<span class="holder">
	<Button class="test" width="100%" on:click={handleClick}>Add Role</Button>
</span>

<style lang="scss">
	.content {
		padding: 10px;
		border-radius: 10px;
		width: 100%;
		color: #36393f;
		display: grid;
		gap: 1vh;
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

	.holder :global(.test) {
		box-shadow: none;
	}
</style>
