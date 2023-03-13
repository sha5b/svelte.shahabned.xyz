<script>
	// @ts-nocheck
	import { pb } from '$lib/pocketbase'
	import { onMount, onDestroy } from 'svelte'
	import { getImageURL } from '$lib/utils/getURL'
	import { spring } from 'svelte/motion'
	import Time from 'svelte-time'
	import { fade, scale } from 'svelte/transition'
	import { page } from '$app/stores'
	import sanitizeHtml from 'sanitize-html'

	let exhibitions = []
	let artist = []
	let artworks = []
	onMount(async () => {
		const exhibitionQuery = await pb.collection('exhibitions').getList(1, 250, {
			sort: '-date',
			expand: 'artworks,'
		})
		exhibitions = exhibitionQuery.items
		artist = await pb.collection('users').getList(1, 250, {
			sort: '-created'
		})
		artist = artist.items
	})
	$: console.log(artist)
</script>

<flexcontainer>
	<flex>
		<content>
			<flex-row style="justify-content:space-between">
				<div>
					<h1>shahab nedaei</h1>
				</div>
				<div>
					<button>instagram</button>
				</div>
			</flex-row>
			<div>
				<h3 style="padding-bottom:0rem;margin-bottom: 0rem">statement</h3>
				{#each artist as artist}
					<p>{@html sanitizeHtml(artist.statement)}</p>
				{/each}
				<p style="line-height:1.5rem " />
			</div>
			<div style="padding:0rem 10rem 0rem 7.5rem">
				<h4 style="padding-top:5rem;padding-bottom:1rem;margin-bottom: 0rem">exhibitions</h4>
				{#each exhibitions as exhibition, i (exhibition.id)}
					<div>
						<flex-row>
							<div>
								<p style="font-weight:bold"><Time timestamp={exhibition.date} /></p>
								<p style="font-weight:bold">{exhibition.title}</p>
							</div>
							<div>
								<p>curated</p>
								<a href={`${exhibition.curator_link}`}><p>{exhibition.curator_name}</p></a>
							</div>
							<div>
								<p>location</p>
								<a href={`${exhibition.location_link}`}><p>{exhibition.location_name}</p></a>
							</div>
						</flex-row>
					</div>
				{/each}
			</div>
		</content>
	</flex>
</flexcontainer>

<style lang="css">
	h1 {
		margin: 0;
		height: 100%;
		width: 100%;
	}

	h5 {
		padding-bottom: 0rem;
		margin-bottom: 0rem;
	}
	p {
		margin-bottom: 0rem;
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
		align-items: center;
	}

	content {
		width: 100%;
		padding: 2.5rem 10rem 2.5rem 10rem;
	}
</style>
