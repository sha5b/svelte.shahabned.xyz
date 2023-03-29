<script>
	export let data
	import FullscreenSlide from '$lib/components/sections/FullscreenSlide.svelte'
</script>

<FullscreenSlide arr={data.curated} columns={1} />
