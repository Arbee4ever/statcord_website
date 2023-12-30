<script lang='ts'>
	import PlaceholderImg from '$lib/img/icon_clyde_circle_white.svg';
	import inView from '$lib/script/inView.js';
	import ApexCharts from "apexcharts";
	import { browser } from '$app/environment';

	export let pos: number;
	export let id: string;
	export let texthistory;
	export let voicehistory;
	export let score: any;
	score = Math.round(score);
	export let avatar: any = PlaceholderImg;
	export let name: string;

	let history: number[] = [0];
	for (let i = 0; i < texthistory.length; i++) {
		let val = history[i];
		history.push(val + voicehistory[i] + texthistory[i]);
	}

	let options = {
		chart: {
			type: 'area',
			toolbar: {
				show: false
			},
			zoom: {
				enabled: false
			},
			sparkline: {
				enabled: true
			},
			parentHeightOffset: 0,
			width: '100%',
			height: '100%'
		},
		stroke: {
			curve: 'smooth'
		},
		tooltip: {
			enabled: false
		},
		series: [
			{
				name: 'Points',
				data: history
			}
		],
		xaxis: {
			categories: [...Array(history.length).keys()],
			labels: {
				show: false
			}
		}
	};

	let graph: HTMLDivElement;
	let chart: ApexCharts;

	function renderGraph() {
		if (browser) {
			if (chart) return;
			chart = new ApexCharts(graph, options);
			chart.render();
		}
	}

	let color: string = '#00000000';

	const formatter = Intl.NumberFormat('en', { notation: 'compact' });

	switch (pos) {
		case 1:
			color = 'rgb(218 158 59)';
			break;
		case 2:
			color = 'rgb(152 152 152)';
			break;
		case 3:
			color = 'rgb(174, 116, 65)';
			break;
		default:
			break;
	}
</script>

<div class='member card' use:inView on:enter={renderGraph}>
	<div class='user'>
		<div class='namepos card'>
			<p class='position'>{pos}</p>
			<img class='avatar' style='--color:{color}' src={avatar} alt='User' />
			<p class='name'>{name}</p>
		</div>
	</div>
	<div class='stats'>
		<div class='graph' bind:this={graph} />
		<p class='score' title={score}>{formatter.format(score)}</p>
	</div>
</div>

<style lang='scss'>
  .member {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    padding: 2vh;
    display: grid;
    width: 100%;
    overflow: hidden;
    overflow-x: auto;
  }

  .member:last-of-type {
    margin: 0;
  }

  .user {
    grid-area: 1 / 1 / 2 / 2;
    display: flex;
    z-index: 1;
    position: relative;

    .namepos {
      display: flex;
      gap: 1vh;
      height: 3vh;
      align-self: center;
      align-items: center;
      margin: 0;
      padding: 1vh;
    }

    .position {
      font-weight: bold;
    }

    .name {
      white-space: nowrap;
    }

    .avatar {
      border-radius: 100%;
      width: 5vh;
      height: 5vh;
      border: 3px solid var(--color);
      box-shadow: 0 0 32px 0 var(--color);
    }
  }

  .stats {
    grid-area: 1 / 3 / 2 / 4;
    height: 100%;

    .graph {
      position: absolute;
      bottom: -2px;
      right: 0;
      opacity: 0.5;
      margin: 0;
      z-index: 0;
    }

    .score {
      height: fit-content;
      background: rgba(0, 0, 0, 0.25);
      box-shadow: 0 0 32px 0 rgba(0, 0, 0, 0.37);
      border-radius: 100%;
      font-weight: bold;
      line-height: 5vh;
      width: 5vh;
      text-align: center;
      float: right;
      cursor: default;
      z-index: 1;
      position: relative;
    }
  }
</style>
