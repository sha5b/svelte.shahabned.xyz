<script>
	import { spring } from 'svelte/motion'
	import Flexgrid from '$lib/components/sections/Flexgrid.svelte'
	import MediaQuery from 'svelte-media-query'

	export let data

	let scroll

	// mouse position setup - needs to be a component - i don't know how
	let mouse = spring({ x: 0, y: 0 }, { stiffness: 0.1, damping: 0.1 })
	function handleMousemove(event) {
		mouse.x = event.clientX
		mouse.y = event.clientY
	}
</script>

<svelte:window bind:scrollY={scroll} />

<MediaQuery query="(min-width: 768px)" let:matches>
	{#if matches}
		<div on:mousemove={handleMousemove}>
			<Flexgrid arr={data.works} columns={2} {scroll} />
		</div>
	{/if}
</MediaQuery>

<MediaQuery query="(max-width: 768px)" let:matches>
	{#if matches}
		<div on:mousemove={handleMousemove}>
			<Flexgrid arr={data.works} columns={1} {scroll} />
		</div>
	{/if}
</MediaQuery>
