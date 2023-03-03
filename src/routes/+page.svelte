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
				<item>
					<scrolltext>
						<content>
							<h1>{artwork.title}</h1>
						</content>
						<content aria-hidden="true">
							<h1>{artwork.title}</h1>
						</content>
					</scrolltext>
					<img
						width="50%"
						height="50%"
						src={artwork.front_image
							? getImageURL(artwork.collectionId, artwork.id, artwork.front_image)
							: '/'}
						alt={artwork.title}
					/>
				</item>
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

	grid item {
		position: relative;
		overflow: hidden;
		display: block;
	}

	scrolltext {
		--gap: 1rem;
		position: absolute;
		display: flex;
		overflow: hidden;
		user-select: none;
		gap: var(--gap);
	}

	scrolltext content {
		flex-shrink: 0;
		display: flex;
		justify-content: space-around;
		gap: var(--gap);
		min-width: 100%;
		animation: scroll 15s linear infinite;
	}

	scrolltext content h1 {
		
	}
	@keyframes scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translate(calc(-100% - var(--gap)));
		}
	}

	img {
		object-fit: fill;
	}
</style>
