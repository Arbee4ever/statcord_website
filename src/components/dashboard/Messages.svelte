<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Message from '$components/input/discordmessage/Message.svelte';
	import Input from '$components/input/Input.svelte';

	export let category: any;
	const dispatch = createEventDispatcher();

	function onChange() {
		dispatch('change');
	}

	function onDelete(e) {
		category.messages.splice(e.detail.index, 1);
		category = category;
	}

	const newMessage = {
		name: [],
		embeds: [
			{
				type: 'rich'
			}
		]
	};

	function handleClick() {
		category.messages.push(newMessage);
		category = category;
	}
</script>

<Input label="">
	{#each Object.values(category.default_messages) as message, i}
		<Message bind:message {category} index={i} on:change={onChange} defaultMsg={true} />
	{/each}
</Input>
<!--<Input label="Custom Messages">
	{#if Object.values(category.messages).length !== 0}
		{#each category.messages as message, i}
			<Message bind:message {category} index={i} on:change={onChange} on:delete={onDelete} />
		{/each}
	{:else}
		<div class="card content">
			<p>Check back later!</p>
		</div>
	{/if}
</Input>-->
<!--<span class="holder">
	<Button class="noshadow" width="100%" on:click={handleClick}>Add Custom Message</Button>
</span>-->

<style lang="scss">
	.content {
		padding: 10px;
		border-radius: 10px;
		width: 100%;
		color: #36393f;
		display: grid;
		gap: 1vh;
	}

	.card:not(.headerCard) {
		background-color: transparent;
		box-shadow: none;
		border: solid 1px #00000040;
	}

	.holder :global(.noshadow) {
		box-shadow: none;
	}
</style>
