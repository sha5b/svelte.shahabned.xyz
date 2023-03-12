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

	let artworks = []
	onMount(async () => {
		const exhibitionQuery = await pb.collection('exhibitions').getList(1, 250, {
			sort: '-date',
			expand: 'artworks'
		})
		exhibitions = exhibitionQuery.items
	})
</script>

<flexcontainer>
	<flex>
		<content>
			<div>
				<flex-row><h1>shahab nedaei</h1></flex-row>
			</div>
			<flex-row style="justify-content: flex-start; gap: 2rem">
				<div>
					<h3>statement</h3>
					<p style="line-height:1.5rem ">nutterbutterbutternutter</p>
				</div>
			</flex-row>
			<flex-row style="justify-content: flex-start; gap: 2rem">
				<div>
					<p>insta and shit</p>
				</div>
			</flex-row>
			{#each exhibitions as exhibition, i (exhibition.id)}
				<flex-row style="justify-content: flex-start; gap: 2rem">
					<div>
						<flex-row>
							<p>{exhibition.title}</p>
							<p><Time timestamp={exhibition.date} /></p>
						</flex-row>
						<flex-row>
							<p>
								curated: <a href={`${exhibition.curator_link}`}><p>{exhibition.curator_name}</p></a>
							</p>
							<p>
								location: <a href={`${exhibition.location_link}`}
									><p>{exhibition.location_name}</p></a>
							</p>
						</flex-row>
					</div>
				</flex-row>
			{/each}
		</content>
	</flex>
</flexcontainer>

<style lang="css">
	h1 {
		margin: 0;
		height: 100%;
		width: 100%;
	}

	flex {
		justify-content: center;
		display: flex;
		width: 100%;
	}

	flex-row {
		width: 100%;
		display: flex;
		flex-grow: 1;
		gap: var(--gap);
		justify-content: space-between;
	}

	content {
		width: 100%;
		padding: 2.5rem 10rem 2.5rem 10rem;
	}
</style>
