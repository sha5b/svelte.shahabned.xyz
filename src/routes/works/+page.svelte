<script>
	import { getImageURL } from '$lib/utils/getURL'
	import { spring } from 'svelte/motion'
	import Itemcard from '$lib/components/elements/Itemcard.svelte'
	import Flexgrid from '$lib/components/sections/Flexgrid.svelte'
	export let data

	// mouse position setup - needs to be a component - i don't know how
</script>

<div>
	<Flexgrid arr={data.works} columns={3} />
</div>
