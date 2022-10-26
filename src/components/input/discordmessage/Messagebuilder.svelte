<svelte:options accessors />

<script lang="ts">
	import StatcordLogo from '$lib/img/statcord_logo.jpg';
	import { createEventDispatcher } from 'svelte';
	import Button from '../Button.svelte';
	import Embed from './Embed.svelte';
	import AutoGrowTextarea from '../AutoGrowTextarea.svelte';
	import { scale } from 'svelte/transition';
	import { clickOutside } from '$lib/script/clickOutside';

	export let value: string;
	let json: any;
	let open = false;
	const dispatch = createEventDispatcher();

	json = JSON.parse(value);

	function handleClick() {
		open = !open;
	}

	function onChange(event) {
		dispatch('input', {
			value: event.detail.value,
			newValue: event.detail.newValue
		});
		var a = event.detail.value.split('.'),
			i;

		for (i = 0; i < a.length; i++) {
			// console.log(json['embeds']);
		}
	}
</script>

<div style="--scroll: {scroll}">
	<Button on:click={handleClick}>Open Editor</Button>
</div>
{#if open}
	<div class="holder card" transition:scale use:clickOutside on:click_outside={handleClick}>
		<div class="close">
			<Button on:click={handleClick}>✖</Button>
		</div>
		<div class="botUser">
			<img src={StatcordLogo} alt="Statcord Logo" />
		</div>
		<div class="content">
			<div class="name">
				<p>Statcord</p>
				<span class="botTag">
					<svg width="14" height="14" viewBox="0 0 16 16">
						<path d="M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z" fill="currentColor" />
					</svg>
					BOT
				</span>
			</div>
			{#if json}
				<AutoGrowTextarea
					placeholder="Message content"
					on:input={onChange}
					value={json.content}
					id="content"
				/>
				{#each json.embeds as embed, i}
					<Embed {embed} id={i} on:input={onChange} />
				{/each}
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.background {
		height: 100vh;
		width: 100vw;
		left: 0;
		top: 0;
		position: fixed;
		z-index: 2;
	}

	.holder {
		z-index: 2;
		background-color: #36393f;
		position: fixed;
		padding: 10px;
		border-radius: 10px;
		display: flex;
		gap: 10px;
		top: 10vh;
		left: 20vw;
		width: 60vw;
		height: 80vh;
		.close {
			position: absolute;
			right: 10px;
		}

		@media only screen and (max-width: 1356px) {
			height: 100vh;
			width: 100vw;
			top: 0;
			left: 0;
		}
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
				-ms-flex-negative: 0;
				background: #5966f3;
				border-radius: 3px;
				color: #fff !important;
				flex-shrink: 0;
				font-size: 10px;
				font-weight: 500;
				line-height: 16px;
				margin-left: 6px;
				padding: 1px 2px 1px 0px;
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
