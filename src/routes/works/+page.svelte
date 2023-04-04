<script>
	import Flexgrid from '$lib/components/sections/Flexgrid.svelte'
	import MediaQuery from 'svelte-media-query'
	export let data
	let scroll

	// mouse position setup - needs to be a component - i don't know how
</script>

<svelte:window bind:scrollY={scroll} />
<MediaQuery query="(min-width: 768px)" let:matches>
	{#if matches}
		<div>
			<Flexgrid arr={data.works} columns={3} {scroll} />
		</div>
	{/if}
</MediaQuery>
<MediaQuery query="(min-width: 480px) and (max-width: 768px)" let:matches>
	{#if matches}
		<div>
			<Flexgrid arr={data.works} columns={2} {scroll} />
		</div>
	{/if}
</MediaQuery>
<MediaQuery query="(max-width: 480px)" let:matches>
	{#if matches}
		<div>
			<Flexgrid arr={data.works} columns={1} {scroll} />
		</div>
	{/if}
</MediaQuery>
