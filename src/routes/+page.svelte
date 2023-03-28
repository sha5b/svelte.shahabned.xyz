<script>
	import { spring } from 'svelte/motion'
	import { getImageURL } from '$lib/utils/getURL'
	import { page } from '$app/stores'
	import Itemcard from '$lib/components/elements/Itemcard.svelte'
	import Flexgrid from '$lib/components/sections/Flexgrid.svelte'
	export let data

	// mouse position setup - needs to be a component - i don't know how
	let mouse = spring({ x: 0, y: 0 }, { stiffness: 0.1, damping: 0.1 })
	function handleMousemove(event) {
		mouse.x = event.clientX
		mouse.y = event.clientY
	}
</script>

<div on:mousemove={handleMousemove}>
	<Flexgrid arr={data.works} columns={2} />
</div>
