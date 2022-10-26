<script lang="ts">
	import AutoGrowTextarea from '$components/input/AutoGrowTextarea.svelte';
	import DetailsDropdown from './DetailsDropdown.svelte';
	import Input from '$components/input/Input.svelte';
	import PlaceholderImg from '$lib/img/image_placeholder.svg';
	import IconCalendar from '$lib/img/calendar_icon.svg';
	import IconLink from '$lib/img/link_icon.svg';
	import { clickOutside } from '$lib/script/clickOutside.js';
	import { createEventDispatcher } from 'svelte';

	export let embed: any;
	export let id: any;

	const author = embed.author ? embed.author : {};
	const fields = embed.fields ? embed.fields : [];
	fields.push({});
	const footer = embed.footer ? embed.footer : {};

	let imageUrl: any = embed.image;
	let thumbnailUrl = embed.thumbnail ? embed.thumbnail.url : "";
	let authorIconUrl = author.icon_url;
	let footerIconUrl = footer.icon_url;

	let color = embed.color ? embed.color : '#6F58AC';

	let colorSelectorOpen = false;
	let colorSelector: HTMLDivElement;
	let arrowButton: HTMLParagraphElement;
	let openDiv: HTMLDivElement;
	const dispatch = createEventDispatcher();

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

	function onChange(event: { detail: { value: string; newValue: any; }; }) {
		dispatch('input', {
			value: 'embeds[' + id + '].' + event.detail.value,
			newValue: event.detail.newValue
		});
	}
</script>

<div class="embed" style="--color:{color}">
	<div class="bar" use:clickOutside on:click_outside={handleClickOutside}>
		<div class="color closed" bind:this={colorSelector}>
			<div class="colorSelector">
				<Input label="Color:" type="color" bind:value={color} id="color" on:input={onChange} />
			</div>
		</div>
		<div class="open" on:click={toggleColorSelector} bind:this={openDiv}>
			<p class="card" bind:this={arrowButton}>▶</p>
		</div>
	</div>
	<div class="content">
		<div class="thumbnail">
			<DetailsDropdown height="10vw" placeholderIcon={PlaceholderImg} icon={thumbnailUrl}>
				<Input label="Thumbnail:" type="url" width="200px" id="thumbnail.url" on:input={onChange} bind:value={thumbnailUrl}/>
			</DetailsDropdown>
		</div>
		<div class="author inline">
			<DetailsDropdown placeholderIcon={PlaceholderImg} icon={authorIconUrl} border_radius="100%">
				<Input label="Author Icon Url:" type="url" id="author.icon_url" on:input={onChange} bind:value={authorIconUrl} />
			</DetailsDropdown>
			<DetailsDropdown icon={IconLink}>
				<Input label="Author Url:" type="url" id="author.url" on:input={onChange} />
			</DetailsDropdown>
			<AutoGrowTextarea
				placeholder="Author Name"
				value={author.name}
				id="author.name"
				on:input={onChange}
			/>
		</div>
		<div class="title inline">
			<DetailsDropdown icon={IconLink}>
				<Input label="Url:" type="url" id="url" on:input={onChange} />
			</DetailsDropdown>
			<AutoGrowTextarea placeholder="Title" value={embed.title} id="title" on:input={onChange} />
		</div>
		<div class="description">
			<AutoGrowTextarea
				placeholder="Description"
				id="description"
				value={embed.description}
				on:input={onChange}
			/>
		</div>
		<div class="fields">
			{#each fields as { name, value, inline }, i}
				<div class="inline">
					<Input type="checkbox" checked={inline} id="fields[{i}].inline" on:input={onChange} />
					<AutoGrowTextarea
						placeholder="Field {i + 1} name"
						id="fields[{i}].name"
						value={name}
						on:input={onChange}
					/>
				</div>
				<AutoGrowTextarea
					placeholder="Field {i + 1} value"
					id="fields[{i}].value"
					{value}
					on:input={onChange}
				/>
			{/each}
		</div>
		<DetailsDropdown height="20vw" placeholderIcon={PlaceholderImg} bind:icon={imageUrl}>
			<Input
				label="Imagelink:"
				type="url"
				id="image.url"
				on:input={onChange}
				bind:value={imageUrl}
			/>
		</DetailsDropdown>
		<div class="inline footer">
			<DetailsDropdown placeholderIcon={PlaceholderImg} icon={footerIconUrl}>
				<Input
					label="Footer Icon Url:"
					type="url"
					id="footer.icon_url"
					on:input={onChange}
					bind:value={footerIconUrl}
				/>
			</DetailsDropdown>
			<DetailsDropdown icon={IconCalendar}>
				<Input type="datetime-local" label="Timestamp" id="timestamp" on:input={onChange} />
			</DetailsDropdown>
			<AutoGrowTextarea
				placeholder="Footer Text"
				value={footer.text}
				id="footer.text"
				on:input={onChange}
			/>
		</div>
	</div>
</div>

<style lang="scss">
	.embed {
		color: var(--color);
		display: flex;
		background-color: #2f3136;
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
				height: 100%;
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
			transition: all 0.2s ease-in-out;
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
