<script>
	import { currentUser, pb } from '../lib/pocketbase'
	import { onMount, onDestroy } from 'svelte'
	import { getImageURL } from '$lib/utils/getURL'
	import { spring } from 'svelte/motion'
	import { fade } from 'svelte/transition'
	import Time from 'svelte-time'
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
</script>
<div>
	<h1>Welcome to SvelteKit</h1>
	<grid>
		{#each artworks as artwork}
			<item>
				<scrolltext>
					<content>
						<div>
							<h1>{artwork.title}</h1>
							<p>{artwork.genre}</p>
							<Time format="YYYY/MM/DD">{artwork.founding_date}</Time>
							<p>{artwork.materials}</p>
						</div>
					</content>
					<content aria-hidden="true">
						<div>
							<h1>{artwork.title}</h1>
							<p>{artwork.genre}</p>
							<Time format="YYYY/MM/DD">{artwork.founding_date}</Time>
							<p>{artwork.materials}</p>
						</div>
					</content>
					<content aria-hidden="true">
						<div>
							<h1>{artwork.title}</h1>
							<p>{artwork.genre}</p>
							<Time format="YYYY/MM/DD">{artwork.founding_date}</Time>
							<p>{artwork.materials}</p>
						</div>
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
		opacity: 0;
		--gap: 1rem;
		position: absolute;
		display: flex;
		overflow: hidden;
		user-select: none;
		gap: var(--gap);
	}

	scrolltext:hover {
		opacity: 1;
	}

	scrolltext content {
		flex-shrink: 0;
		display: flex;
		gap: var(--gap);
		animation: scroll 10s linear infinite;
	}

	scrolltext content h1 {
		margin-bottom: 0.75rem;
	}
	scrolltext content p {
		display: flex;
		flex-shrink: 1;
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
