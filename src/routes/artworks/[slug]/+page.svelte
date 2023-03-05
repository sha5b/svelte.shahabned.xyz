<script>
	import { pb } from '$lib/pocketbase'
	import { onMount, onDestroy } from 'svelte'
	import { getImageURL } from '$lib/utils/getURL'
	import { spring } from 'svelte/motion'
	import Time from 'svelte-time'
	import { fade, scale } from 'svelte/transition'

	let artworks = []
	onMount(async () => {
		const artworkquery = await pb.collection('artworks').getList(1, 50, {
			sort: 'created',
			expand: 'user'
		})
		artworks = artworkquery.items
	})

	import { page } from '$app/stores'
</script>

{#each artworks as artwork, i}
	{#if artwork.slug === $page.params.slug}
		<div>
			<img
				width="100%"
				height="100%"
				loading="lazy"
				src={artwork.front_image
					? getImageURL(artwork.collectionId, artwork.id, artwork.front_image)
					: '/'}
				alt={artwork.title}
			/>
			<h1>{artwork.title}</h1>
			<div>
				<p>{artwork.genre}</p>
				<p>{artwork.dimensions}</p>
				<p><Time format="YYYY/MM/DD">{artwork.founding_date}</Time></p>
				<hr />
				<p>{artwork.medium}</p>
			</div>
		</div>
	{/if}
{/each}

<style lang="css">
	a {
	}
	flexcontainer {
		position: relative;
		display: flex;
		overflow: hidden;
	}

	flex {
		width: 50%;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		display: flex;
		gap: 0.5rem;
		flex-direction: column;
	}

	flex item {
		width: 99%;
		border-radius: 0.5rem;
		position: relative;
		overflow: hidden;
		display: block;
	}

	flex item:hover scrolltext {
		opacity: 1;
	}

	img {
		width: 100%;
		z-index: 1;
	}

	@keyframes scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translate(calc(-100% - var(--gap)));
		}
	}
</style>
