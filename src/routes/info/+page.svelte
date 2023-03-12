<script>
	// @ts-nocheck
	import { pb } from '$lib/pocketbase'
	import { onMount, onDestroy } from 'svelte'
	import { getImageURL } from '$lib/utils/getURL'
	import { spring } from 'svelte/motion'
	import Time from 'svelte-time'
	import { fade, scale } from 'svelte/transition'
	import { page } from '$app/stores'

	let exhibitions = []
	$: innerWidth = 0
	$: innerHeight = 0

	let artworks = []
	onMount(async () => {
		const exhibitionQuery = await pb.collection('exhibitions').getList(1, 250, {
			sort: '-date',
			expand: 'artworks'
		})
		exhibitions = exhibitionQuery.items
	})
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<div style="--height: {innerHeight};--width: {innerWidth}">
	<flex>
		<content>
			<flex-row><h1>shahab nedaei</h1></flex-row>
			<flex-row style="justify-content: flex-start; gap: 2rem">
				<div>
					<h3>statement</h3>
					<p style="line-height:1.5rem ">nutterbutterbutternutter</p>
				</div>
			</flex-row>
			<flex-row style="justify-content: flex-start; gap: 2rem">
				<div>
					<p>insta and shit</p>
					<p>{exhibition.title}</p>
					<p><Time timestamp={exhibition.date} /></p>
					<a href={`${exhibition.curator_link}`}><p>{exhibition.curator_name}</p></a>
					<a href={`${exhibition.location_link}`}><p>{exhibition.location_name}</p></a>
				</div>
			</flex-row>
			{#each exhibitions as exhibition, i (exhibition.id)}
				<flex-row style="justify-content: flex-start; gap: 2rem">
					<div />
				</flex-row>
			{/each}
		</content>
	</flex>
</div>

<style lang="css">
	flex {
		justify-content: center;
		display: flex;
		flex-direction: column;
	}

	flex-column {
		display: flex;
		padding-left: 2.5rem;
		padding-right: 2.5rem;
		flex-wrap: wrap;
	}

	flex-column .galler_img {
		padding: 0.25rem;
		display: flex;
		overflow: hide;
		width: 50%;
		flex-basis: 1;
		flex-grow: 1;
		flex-wrap: wrap;
		align-self: stretch;
		object-fit: cover;
	}
	flex-column .process_img {
		padding: 0.25rem;
		display: flex;
		overflow: hide;
		width: 20%;
		flex-basis: 1;
		flex-grow: 1;
		flex-wrap: wrap;
		align-self: stretch;
		object-fit: cover;
	}

	flex-row {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		flex: 1;
		height: fit-content;
		padding-bottom: 1rem;
	}

	content {
		padding: 2.5rem 10rem 2.5rem 10rem;
		white-space: wrap;
	}
</style>
