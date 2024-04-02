<script lang='ts'>
	import PlaceholderImg from '$lib/img/image_placeholder_round.svg';
	import IconCalendar from '$lib/img/calendar_icon.svg';
	import DetailsDropdown from '$components/input/discordmessage/DetailsDropdown.svelte';
	import Input from '$components/input/Input.svelte';
	import AutoGrowTextarea from '$components/input/AutoGrowTextarea.svelte';
	import { createEventDispatcher } from 'svelte';

	export let footer = {};

	export let timestamp;

	const dispatch = createEventDispatcher();
	const onChange = () => {
		dispatch('change');
	};
</script>

<div class='inline footer'>
	<DetailsDropdown placeholderIcon={PlaceholderImg} icon={footer?.icon_url} border_radius='100%'>
		<Input label='Footer Icon Url:'>
			<input class='card' on:input={onChange} bind:value={footer.icon_url} type='url' />
		</Input>
	</DetailsDropdown>
	<DetailsDropdown icon={IconCalendar}>
		<Input label='Timestamp:'>
			<input class='card' on:input={onChange} type='datetime-local' bind:value={timestamp} />
		</Input>
	</DetailsDropdown>
	<AutoGrowTextarea on:input={onChange} bind:value={footer.text} placeholder='Footer Text'></AutoGrowTextarea>
</div>

<style lang='scss'>
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