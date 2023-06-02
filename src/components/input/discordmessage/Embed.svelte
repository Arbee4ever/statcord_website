<script lang='ts'>
	import AutoGrowTextarea from '$components/input/AutoGrowTextarea.svelte';
	import DetailsDropdown from './DetailsDropdown.svelte';
	import PlaceholderImg from '$lib/img/image_placeholder.svg';
	import IconCalendar from '$lib/img/calendar_icon.svg';
	import IconLink from '$lib/img/link_icon.svg';
	import XIcon from '$lib/img/xIcon.svg';
	import { clickOutside } from '$lib/script/clickOutside.js';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import Input2 from '$components/input/Input2.svelte';

	export let embed: any = [];
	export let index: number;

	const fields = embed.fields ? embed.fields : [];
	fields.push({});

	let color = embed.color ? embed.color : '#6F58AC';

	if (embed.author == undefined) {
		embed.author = {};
	}
	if (embed.footer == undefined) {
		embed.footer = {};
	}

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

	let embedEl;

	function handleClickOutside() {
		if (colorSelectorOpen) {
			toggleColorSelector();
		}
	}

	function deleteEmbed() {
		dispatch('delete', {
			index: index
		});
	}

	function addEmbed() {
		dispatch('add', {
			index: index
		});
	}

	const onChange = () => {
		dispatch('change');
	};
</script>

<div class='embed' style='--color:{color}' bind:this={embedEl} in:slide>
	<span class='embedControl'>
		<div class='minusEmbed card' on:click={deleteEmbed}>
			<p>-</p>
		</div>
		<div class='plusEmbed card' on:click={addEmbed}>
			<p>+</p>
		</div>
	</span>
	<!--<img class='deleteEmbed' src={XIcon} alt='Close Embed' on:click={deleteEmbed}>-->
	<div class='bar' use:clickOutside={handleClickOutside}>
		<div class='color closed' bind:this={colorSelector}>
			<div class='colorSelector'>
				<Input2 label='Color:'>
					<input class='card colorPicker' on:input={onChange} type='color' bind:value={embed.color} />
				</Input2>
			</div>
		</div>
		<div class='open' on:mousedown={toggleColorSelector} bind:this={openDiv}>
			<p class='card' bind:this={arrowButton}>▶</p>
		</div>
	</div>
	<div class='content'>
		<div class='thumbnail'>
			<DetailsDropdown height='10vw' placeholderIcon={PlaceholderImg} icon={embed.thumbnail}>
				<Input2 label='Thumbnail:'>
					<input class='card' on:input={onChange} type='url' bind:value={embed.thumbnail} />
				</Input2>
			</DetailsDropdown>
		</div>
		<div class='author inline'>
			<DetailsDropdown placeholderIcon={PlaceholderImg} icon={embed.author?.icon_url} border_radius='100%'>
				<Input2 label='Author Icon Url:'>
					<input class='card' on:input={onChange} type='url' bind:value={embed.author.icon_url} />
				</Input2>
			</DetailsDropdown>
			<DetailsDropdown icon={IconLink}>
				<Input2 label='Author Url:'>
					<input class='card' on:input={onChange} type='url' bind:value={embed.author.url} />
				</Input2>
			</DetailsDropdown>
			<AutoGrowTextarea bind:value={embed.author.name} on:input={onChange} placeholder='Author name'></AutoGrowTextarea>
		</div>
		<div class='title inline'>
			<DetailsDropdown icon={IconLink}>
				<Input2 label='Url:'>
					<input class='card' on:input={onChange} type='url' bind:value={embed.url} />
				</Input2>
			</DetailsDropdown>
			<AutoGrowTextarea bind:value={embed.title} on:input={onChange} placeholder='Title'></AutoGrowTextarea>
		</div>
		<div class='description'>
			<AutoGrowTextarea bind:value={embed.description} on:input={onChange} placeholder='Description'></AutoGrowTextarea>
		</div>
		<div class='fields'>
			{#each fields as { name, value, inline }, i}
				<div class='inline'>
					<Input2>
						<input class='card' on:input={onChange} type='checkbox' bind:value={inline} />
					</Input2>
					<AutoGrowTextarea bind:value={name} on:input={onChange} placeholder='Field {i + 1} name'></AutoGrowTextarea>
				</div>
				<AutoGrowTextarea bind:value={value} on:input={onChange} placeholder='Field {i + 1} value'></AutoGrowTextarea>
			{/each}
		</div>
		<DetailsDropdown height='20vw' placeholderIcon={PlaceholderImg} bind:icon={embed.image}>
			<Input2 label='Imagelink:'>
				<input class='card' on:input={onChange} type='url' bind:value={embed.image} />
			</Input2>
		</DetailsDropdown>
		<div class='inline footer'>
			<DetailsDropdown placeholderIcon={PlaceholderImg} icon={embed.footer.icon_url}>
				<Input2 label='Footer Icon Url:'>
					<input class='card' on:input={onChange} type='url' bind:value={embed.footer.icon_url} />
				</Input2>
			</DetailsDropdown>
			<DetailsDropdown icon={IconCalendar}>
				<Input2 label='Timestamp:'>
					<input class='card' on:input={onChange} type='datetime-local' bind:value={embed.timestamp} />
				</Input2>
			</DetailsDropdown>
			<AutoGrowTextarea bind:value={embed.footer.text} on:input={onChange} placeholder='Footer Text'></AutoGrowTextarea>
		</div>
	</div>
</div>

<style lang='scss'>
  .embed {
    color: var(--color);
    display: flex;
    background-color: #2f3136;
    border-radius: 3px;
    position: relative;
    transition: height 0.5s;
    max-height: 100vh;
    margin-bottom: 1vw;

    .embedControl {
      position: absolute;
      display: flex;
      align-items: center;
      bottom: 0;
      right: 0;
      font-size: 5vh;

      div {
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        line-height: 20px;
        display: flex;
				justify-content: center;
        align-items: center;
      }
    }

    .deleteEmbed {
      position: absolute;
      right: 0;
    }

    .thumbnail {
      float: right;
      right: 20px;
    }

    .bar {
      position: absolute;
      display: flex;
      height: 100%;

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

          .colorPicker {
            padding: 0;
            background-color: var(--color);
            border: rgba(0, 0, 0, 0.25) solid;
            border-radius: 0;
            height: 100%;
            width: 100%;
          }
        }

        &.closed {
          padding: 0;
          width: 4px;
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
        transition: all 0.2s ease-in-out;

        p {
          background-color: transparent;
          padding: 0;
          font-size: 15px;
          border-radius: 3px;
          transition: transform 0.2s ease-in-out;
        }
      }
    }

    .content {
      padding: 1vw 1vw 1vw 2vw;
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

  input {
    resize: none;
    padding: 15px;
    color: white;
    border: none;
    width: var(--width, 100%);
  }

  input:focus {
    outline: rgba(0, 0, 0, 0.25) solid;
  }

  input[type="checkbox"] {
    height: 15px;
    width: 15px;
  }
</style>
