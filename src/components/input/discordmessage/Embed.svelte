<script lang="ts">
	import AutoGrowTextarea from '$components/input/AutoGrowTextarea.svelte';
	import DetailsDropdown from './DetailsDropdown.svelte';
	import Input from '$components/input/Input.svelte';
	import PlaceholderImg from '$lib/img/image_placeholder.svg';
	import IconCalendar from '$lib/img/calendar_icon.svg';
	import IconLink from '$lib/img/link_icon.svg';
	import { clickOutside } from '$lib/script/clickOutside';

	export let embed: any;

	const author = embed.author ? embed.author : {};
	const fields = embed.fields ? embed.fields : [];
	fields.push({});
	const footer = embed.footer ? embed.footer : {};

	let color = embed.color;

	let colorSelectorOpen = false;
	let colorSelector: HTMLDivElement;
	let arrowButton: HTMLParagraphElement;
	let openDiv: HTMLDivElement;

	function toggleColorSelector() {
		colorSelectorOpen = !colorSelectorOpen;
		colorSelector.classList.toggle('closed');
		if (colorSelectorOpen) {
			arrowButton.style.transform = 'rotateZ(180deg)';
			openDiv.style.opacity = '100%';
		} else {
			arrowButton.style.transform = 'rotateZ(0deg)';
			openDiv.style.opacity = '30%';
		}
	}

	function handleClickOutside() {
		if (colorSelectorOpen) {
			toggleColorSelector();
		}
	}
</script>

<div class="embed" style="--color:{color}">
	<div class="bar" use:clickOutside on:click_outside={handleClickOutside}>
		<div class="color closed" bind:this={colorSelector}>
			<div class="colorSelector">
				<Input label="Color:" type="color" bind:value={color} />
			</div>
		</div>
		<div class="open" on:click={toggleColorSelector} bind:this={openDiv}>
			<p class="card" bind:this={arrowButton}>▶</p>
		</div>
	</div>
	<div class="content">
		<div class="thumbnail">
			<DetailsDropdown height="10vw" placeholderIcon={PlaceholderImg}>
				<Input label="Thumbnail:" type="url" width="200px" />
			</DetailsDropdown>
		</div>
		<div class="author inline">
			<DetailsDropdown placeholderIcon={PlaceholderImg}>
				<Input label="Author Icon Url:" type="url" />
			</DetailsDropdown>
			<DetailsDropdown placeholderIcon={IconLink}>
				<Input label="Author Url:" type="url" />
			</DetailsDropdown>
			<AutoGrowTextarea placeholder="Author Name" value={author.name} />
		</div>
		<div class="title inline">
			<DetailsDropdown placeholderIcon={IconLink}>
				<Input label="Url:" type="url" />
			</DetailsDropdown>
			<AutoGrowTextarea placeholder="Title" value={embed.title} />
		</div>
		<div class="description">
			<AutoGrowTextarea placeholder="Description" value={embed.description} />
		</div>
		<div class="fields">
			{#each fields as { name, value, inline }, i}
				<div class="inline">
					<Input type="checkbox" checked={inline} />
					<AutoGrowTextarea placeholder="Field {i + 1} name" value={name} />
				</div>
				<AutoGrowTextarea placeholder="Field {i + 1} value" {value} />
			{/each}
		</div>
		<DetailsDropdown height="20vw" placeholderIcon={PlaceholderImg}>
			<Input label="Imagelink:" type="url" />
		</DetailsDropdown>
		<div class="inline footer">
			<DetailsDropdown placeholderIcon={PlaceholderImg}>
				<Input label="Footer Icon Url:" type="url" />
			</DetailsDropdown>
			<DetailsDropdown placeholderIcon={IconCalendar}>
				<Input type="datetime-local" label="Timestamp" />
			</DetailsDropdown>
			<AutoGrowTextarea placeholder="Footer Text" value={footer.text} />
		</div>
	</div>
</div>

<style lang="scss">
	.embed {
		z-index: 1;
		color: var(--color);
		display: flex;
		background-color: #2f3136;
		height: fit-content;
		border-radius: 10px;

		.thumbnail {
			float: right;
			right: 20px;
		}

		.bar {
			display: flex;
		}

		.color {
			z-index: 1;
			width: 200px;
			overflow: hidden;
			border-radius: 3px 0 0 3px;
			background-color: currentColor;
			transition: all 0.2s ease-in-out;

			.colorSelector {
				padding: 1vw;
				display: flex;
				flex-direction: column;
				transition: all 0.2s ease-in-out;
				background-color: currentColor;
				border-radius: 0 3px 3px 0;

				input[type='color'] {
					width: 100%;
				}

				.close {
					margin-bottom: auto;
				}
			}
		}

		.open {
			cursor: pointer;
			opacity: 30%;
			display: flex;
			align-items: center;
			background-color: var(--color);
			width: fit-content;
			padding: 0;
			border-radius: 0 3px 3px 0;
			transition: opacity 0.2s ease-in-out;
		}

		.open p {
			background-color: transparent;
			padding: 0;
			font-size: 15px;
			border-radius: 0 3px 3px 0;
			transition: transform 0.2s ease-in-out;
		}

		.closed {
			padding: 0vw;
			width: 4px;
		}

		.content {
			margin: 1vw;
			margin-left: 0;
			width: 100%;

			.description {
				width: calc(100% - 11vw);
			}

			.fields {
				width: calc(100% - 11vw);
			}
		}

		.inline {
			display: flex;
		}
	}
</style>