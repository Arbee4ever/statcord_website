<script lang="ts">
	import Button from '$components/input/Button.svelte';
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import SelectorDropdown from '$components/input/SelectorDropdown.svelte';
	export let category: any;
	const dispatch = createEventDispatcher();
	const newRole = {
		requirements: [],
		roles: []
	};
	const possibleValues = [{ id: 'textmessages' }, { id: 'voiceseconds' }];
	const roles = $page.data.roles;

	const onChange = (event: { detail: { id: any; value: any } }) => {
		dispatch('change', {
			id: event.detail.id,
			value: event.detail.value
		});
	};

	function handleClick() {
		category.roles.push(newRole);
		category = category;
	}

	function onSelect(event) {
		console.log(event.detail.option);
	}

	function getRoles(roles1) {
		let roles2 = [];
		for (let i = 0; i < roles1.length; i++) {
			const role = roles1[i];
			var found = roles.filter(function (item) {
				return item.id === role.id;
			});
			roles2.push(found[0]);
		}
		return roles2;
	}
</script>

{#each category.roles as role}
	<div class="content card" transition:slide>
		<SelectorDropdown on:select={onSelect} selected={getRoles(role.roles)} options={roles}>
			Roles
		</SelectorDropdown>
		<SelectorDropdown selected={role.requirements} options={possibleValues}>
			Requirements
		</SelectorDropdown>
	</div>
{/each}
<Button width="100%" on:click={handleClick}>Add Role</Button>

<style lang="scss">
	.content {
		padding: 10px;
		border-radius: 10px;
		width: 100%;
		color: #36393f;
		display: grid;
		gap: 1vh;
	}
</style>
