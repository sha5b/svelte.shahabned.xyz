<script>
	import { currentUser, pb } from '../lib/pocketbase'
	import { onMount, onDestroy } from 'svelte'
	import { getImageURL } from '$lib/utils/getURL'
	import { spring } from 'svelte/motion'

	let mousePosition = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.1,
			damping: 1
		}
	)

	let artworks = []
	onMount(async () => {
		const artworkquery = await pb.collection('artworks').getList(1, 50, {
			sort: 'created',
			expand: 'user'
		})
		artworks = artworkquery.items
	})
</script>

<div on:mousemove={(e) => mousePosition.set({ x: e.clientX, y: e.clientY })}>
	<p>{$mousePosition.x}x, {$mousePosition.y}y</p>
	<h1>Welcome to SvelteKit</h1>
	<grid>
		{#each artworks as artwork}
			<div>
				<div>
					<textscroll>{artwork.title}</textscroll>
					<img
						width="50%"
						height="50%"
						src={artwork.front_image
							? getImageURL(artwork.collectionId, artwork.id, artwork.front_image)
							: '/'}
						alt={artwork.title}
					/>
				</div>
			</div>
		{/each}
	</grid>
</div>

<style lang="css">
	grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	textscroll {
		width: 566px;
		display: flex;
		flex-wrap: nowrap;
		animation: move 2s infinite linear; /* set the time to what you want of course */
	}
	@keyframes move {
		to {
			transform: translateX(-50%);
		}
	}
	img {
		object-fit: cover;
	}
</style>
