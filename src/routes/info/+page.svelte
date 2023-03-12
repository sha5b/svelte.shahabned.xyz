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
					<h6>statement</h6>
					<p style="line-height:1.5rem ">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum orci a leo
						gravida, at porttitor enim dapibus. Proin non commodo tortor, nec convallis eros.
						<br /> Nullam hendrerit ante diam, non luctus risus vestibulum non. Suspendisse neque
						ipsum, lobortis ac rhoncus eget, lacinia in dolor. Nam sit amet mauris tempus, suscipit
						neque ac, fringilla lacus. Aliquam erat volutpat. Sed euismod sapien sed nisl ultrices,
						nec imperdiet orci ornare. Phasellus volutpat, leo nec rutrum fringilla, justo enim
						semper quam, sed faucibus tellus nunc eu magna. Vivamus quis aliquam massa, quis dapibus
						urna.
						<br />
						Duis consectetur magna odio, ac feugiat tellus vehicula vel. Praesent tempor, arcu vel sodales
						iaculis, diam ante cursus lectus, in auctor diam est sit amet metus. Curabitur a tincidunt
						odio. Ut venenatis fringilla nunc eget tincidunt. Morbi fermentum metus neque, ut interdum
						nisi efficitur id. Mauris pretium tincidunt lacinia. Etiam fringilla ut velit nec finibus.
						Morbi eu ligula orci. Donec.
					</p>
				</div>
				<div>
					<p>insta and shit</p>
				</div>
			</flex-row>

			{#each exhibitions as exhibition, i (exhibition.id)}
				<flex-row style="justify-content: flex-start; gap: 2rem">
					<div style="border-left: 1px solid black; padding: 1rem">
						<p>{exhibition.title}</p>
						<p><Time timestamp={exhibition.date} /></p>
						<a href={`${exhibition.curator_link}`}><p>{exhibition.curator_name}</p></a>
						<a href={`${exhibition.location_link}`}><p>{exhibition.location_name}</p></a>
					</div>
				</flex-row>
			{/each}
		</content>
	</flex>
</div>

<style lang="css">
	a {
	}

	h1 {
		font-family: 'Bitter';
		font-size: 3.5rem;
		letter-spacing: 0.25rem;
		margin-bottom: 0.5rem;
		line-height: 5.5rem;
		padding-bottom: 1.5rem;
	}
	h6 {
		font-family: 'Urbanist';
		font-size: 3rem;
		letter-spacing: 0.25rem;
		padding-bottom: 1rem;
		font-weight: 300;
	}

	p {
		line-height: 0.75rem;
		font-size: 1.3rem;
	}

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
