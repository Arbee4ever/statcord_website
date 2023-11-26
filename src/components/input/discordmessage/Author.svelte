<script>
	import PlaceholderImg from '$lib/img/image_placeholder_round.svg';
	import IconLink from '$lib/img/link_icon.svg';
	import DetailsDropdown from '$components/input/discordmessage/DetailsDropdown.svelte';
	import Input from '$components/input/Input.svelte';
	import AutoGrowTextarea from '$components/input/AutoGrowTextarea.svelte';
	import { createEventDispatcher } from 'svelte';

	export let author = {};

	const dispatch = createEventDispatcher();
	const onChange = () => {
		dispatch('change');
	};
</script>

<div class='author inline'>
	<DetailsDropdown placeholderIcon={PlaceholderImg} icon={author?.icon_url} border_radius='100%'>
		<Input label='Author Icon Url:'>
			<input class='card' on:input={onChange} type='url' bind:value={author.icon_url} />
		</Input>
	</DetailsDropdown>
	<DetailsDropdown icon={IconLink}>
		<Input label='Author Url:'>
			<input class='card' on:input={onChange} type='url' bind:value={author.url} />
		</Input>
	</DetailsDropdown>
	<AutoGrowTextarea bind:value={author.name} on:input={onChange} placeholder='Author name'></AutoGrowTextarea>
</div>

<style lang='scss'>
  .inline {
    display: flex;
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