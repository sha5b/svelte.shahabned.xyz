<script>
	import { currentUser, pb } from '../lib/pocketbase'
	import { onMount, onDestroy } from 'svelte'
	import { getImageURL } from '$lib/utils/getURL'
	import { spring } from 'svelte/motion'
	import { fade } from 'svelte/transition'
	let visibility = true
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

	let xPos = 0
	let yPos = 0

	function handleMouseMove(event) {
		const container = event.target.getBoundingClientRect()
		xPos = event.clientX - container.left
		yPos = event.clientY - container.top
	}
</script>

<!-- <div on:mousemove={(e) => mousePosition.set({ x: e.clientX, y: e.clientY })}>
	<p>{$mousePosition.x}x, {$mousePosition.y}y</p> -->
<div>
	<h1>Welcome to SvelteKit</h1>
	<grid>
		{#each artworks as artwork}
			<item on:mouseover={handleMouseMove} on:focus>
				<!-- {#if visibility} -->
				<!-- <scrolltext style="transform: translate({$mousePosition.x}px,{$mousePosition.y}px"> -->
				<scrolltext>
					<content>
						<div>
							<h1>{artwork.title}</h1>
							<p>{artwork.genre} | {artwork.founding_date}</p>
							<p>{artwork.materials}</p>
						</div>
					</content>
					<content aria-hidden="true">
						<div>
							<h1>{artwork.title}</h1>
							<p>{artwork.genre} | {artwork.founding_date}</p>
							<p>{artwork.materials}</p>
						</div>
					</content>
				</scrolltext>
				<!-- {/if} -->
				<img
					width="50%"
					height="50%"
					src={artwork.front_image
						? getImageURL(artwork.collectionId, artwork.id, artwork.front_image)
						: '/'}
					alt={artwork.title}
				/>
			</item>
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
		opacity: 0;
		flex-shrink: 0;
		display: flex;
		justify-content: space-around;
		gap: var(--gap);
		min-width: 100%;
		animation: scroll 15s linear infinite;
	}
	scrolltext content:hover {
		opacity: 1;
	}

	scrolltext content h1 {
		margin-bottom: 0.75rem;
		text-align: center;
	}
	scrolltext content p {
		text-align: center;
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
		width: 100%;
	}
</style>
