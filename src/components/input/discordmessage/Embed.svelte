<script lang='ts'>
	import AutoGrowTextarea from '$components/input/AutoGrowTextarea.svelte';
	import DetailsDropdown from './DetailsDropdown.svelte';
	import PlaceholderImg from '$lib/img/image_placeholder.svg';
	import IconLink from '$lib/img/link_icon.svg';
	import { clickOutside } from '$lib/script/clickOutside.js';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';
	import Input from '$components/input/Input.svelte';
	import Author from '$components/input/discordmessage/Author.svelte';
	import EmbedFooter from '$components/input/discordmessage/EmbedFooter.svelte';
	import ColorPicker from 'svelte-awesome-color-picker';

	export let embed: any = [];
	export let index: number;

	const fields = embed.fields ? embed.fields : [];

	embed.color = embed.color == "0" ? '#000000' : embed.color;
	embed.thumbnail = embed.thumbnail ? embed.thumbnail : {};
	embed.image = embed.image ? embed.image : {};

	let contrastColor = '#FFFFFF';

	if (embed.color && !embed.color.toString().startsWith('#')) {
		embed.color = '#' + embed.color.toString(16);
		console.log('color', embed.color);
		contrastColor = invertColor(embed.color);
	} else if (!embed.color) {
		embed.color = "#6F58AC"
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
		contrastColor = invertColor(embed.color);
		dispatch('change', {
			index: index
		});
	};

	function invertColor(hex) {
		if (hex.startsWith('#')) {
			hex = hex.slice(1);
		}
		if (hex == '0') {
			hex = '000000';
		}
		// convert 3-digit hex to 6-digits.
		if (hex.length === 3) {
			hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
		}
		if (hex.length <= 0 || hex.length >= 8) {
			throw new Error('Invalid HEX color.');
		}
		// invert color components
		var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
			g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
			b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
		// pad each with zeros and return
		return '#' + padZero(r, r.length) + padZero(g, g.length) + padZero(b, b.length);
	}

	function padZero(str, len) {
		len = len || 2;
		var zeros = new Array(len).join('0');
		return (zeros + str).slice(-len);
	}
</script>

<div class='embed' style='--color:{embed.color}' transition:slide|local>
	<div class='bar' use:clickOutside={handleClickOutside}>
		<div class='color closed' bind:this={colorSelector}>
			<div class='colorSelector'>
				<Input label='Color:' bind:color={contrastColor}>
					<ColorPicker on:input={onChange} isAlpha bind:hex={embed.color}/>
					<!--<input class='card colorPicker' on:input={onChange} type='color' bind:value={embed.color} />-->
				</Input>
			</div>
		</div>
		<div class='open' on:mousedown={toggleColorSelector} bind:this={openDiv}>
			<p class='card' bind:this={arrowButton}>▶</p>
		</div>
	</div>
	<div class='content'>
		<div class='thumbnail'>
			<DetailsDropdown height='10vw' placeholderIcon={PlaceholderImg} icon={embed.thumbnail.url} border_radius='5%'>
				<Input label='Thumbnail:'>
					<input class='card' on:input={onChange} type='url' bind:value={embed.thumbnail.url} />
				</Input>
			</DetailsDropdown>
		</div>
		<Author bind:author={embed.author} on:change={onChange} />
		<div class='title inline'>
			<DetailsDropdown icon={IconLink}>
				<Input label='Url:'>
					<input class='card' on:input={onChange} type='url' bind:value={embed.url} />
				</Input>
			</DetailsDropdown>
			<AutoGrowTextarea bind:value={embed.title} on:input={onChange} placeholder='Title'></AutoGrowTextarea>
		</div>
		<div class='description'>
			<AutoGrowTextarea bind:value={embed.description} on:input={onChange}
												placeholder='Description'></AutoGrowTextarea>
		</div>
		<div class='fields'>
			{#each fields as { name, value, inline }, i}
				<div class='inline'>
					<Input>
						<input class='card' on:input={onChange} type='checkbox' bind:value={inline} />
					</Input>
					<AutoGrowTextarea bind:value={name} on:input={onChange} placeholder='Field {i + 1} name'></AutoGrowTextarea>
				</div>
				<AutoGrowTextarea bind:value={value} on:input={onChange} placeholder='Field {i + 1} value'></AutoGrowTextarea>
			{/each}
		</div>
		<DetailsDropdown height='20vw' placeholderIcon={PlaceholderImg} bind:icon={embed.image.url} border_radius='2%'>
			<Input label='Imagelink:'>
				<input class='card' on:input={onChange} type='url' bind:value={embed.image.url} />
			</Input>
		</DetailsDropdown>
		<EmbedFooter bind:footer={embed.footer} bind:timestamp={embed.timestamp} on:change={onChange} />
	</div>
	<div class='embedControl'>
		<div class='plusEmbed card' on:click={addEmbed} on:keyup={addEmbed}>
			<p>+</p>
		</div>
		<div class='minusEmbed card' on:click={deleteEmbed} on:keyup={deleteEmbed}>
			<p>-</p>
		</div>
	</div>
</div>

<style lang='scss'>
  .embedControl {
    position: absolute;
    display: flex;
    flex-direction: column;
    bottom: 0;
    right: 0;

    div {
      cursor: pointer;
      padding: 0;
      width: 30px;
      height: 30px;
      line-height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;

      p {
        font-size: 30px;
      }
    }
  }

  .embed {
    color: var(--color);
    display: flex;
    background-color: #2f3136;
    border-radius: 3px;
    position: relative;
    transition: height .3s ease-in-out;
    max-height: 100vh;
    margin-bottom: 1vw;

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
        width: 200px;
        overflow: hidden;
        border-radius: 3px 0 0 3px;
        background-color: currentColor;
        transition: width .3s ease-in-out;

        .colorSelector {
          padding: 1vw;
          display: flex;
          flex-direction: column;
          transition: width .3s ease-in-out;
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
        background-color: currentColor;
        width: fit-content;
        padding: 0;
        border-radius: 0 3px 3px 0;
        transition: width .3s ease-in-out;

        p {
          background-color: transparent;
          padding: 0;
          font-size: 15px;
          border-radius: 3px;
          transition: transform .3s ease-in-out;
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

    :global(.inline) {
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
