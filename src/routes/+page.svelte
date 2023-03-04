<script>
	import { pb } from '../lib/pocketbase'
	import { onMount, onDestroy } from 'svelte'
	import { getImageURL } from '$lib/utils/getURL'
	import { spring } from 'svelte/motion'
	import Time from 'svelte-time'

	let mousePosition = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.2,
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
			{#if artwork.featured}
				<item on:mousemove={(e) => mousePosition.set({ x: e.clientX, y: e.clientY })}>
					<scrolltext style="top:{$mousePosition.y}px">
						<div>
							<content>
								<h1>{artwork.title}</h1>
							</content>
							<content>
								<div>
									<p style="font-size: 2rem">{artwork.genre}</p>
									<p><Time format="YYYY/MM/DD">{artwork.founding_date}</Time></p>
									<hr />
									<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.materials}</p>
								</div>
							</content>
						</div>
						<div aria-hidden="true">
							<content>
								<h1>{artwork.title}</h1>
							</content>
							<content>
								<div>
									<p style="font-size: 2rem">{artwork.genre}</p>
									<p><Time format="YYYY/MM/DD">{artwork.founding_date}</Time></p>
									<hr />
									<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.materials}</p>
								</div>
							</content>
						</div>
						<div>
							<content aria-hidden="true">
								<h1>{artwork.title}</h1>
							</content>
							<content>
								<div>
									<p style="font-size: 2rem">{artwork.genre}</p>
									<p><Time format="YYYY/MM/DD">{artwork.founding_date}</Time></p>
									<hr />
									<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.materials}</p>
								</div>
							</content>
						</div>
						<div>
							<content aria-hidden="true">
								<h1>{artwork.title}</h1>
							</content>
							<content>
								<div>
									<p style="font-size: 2rem">{artwork.genre}</p>
									<p><Time format="YYYY/MM/DD">{artwork.founding_date}</Time></p>
									<hr />
									<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.materials}</p>
								</div>
							</content>
						</div>
					</scrolltext>
					<div>
						<div class="img-overlay" />
						<img
							width="100%"
							height="100%"
							loading="lazy"
							src={artwork.front_image
								? getImageURL(artwork.collectionId, artwork.id, artwork.front_image)
								: '/'}
							alt={artwork.title}
						/>
					</div>
				</item>
			{/if}
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
		border-radius: 1rem;
		position: relative;
		overflow: hidden;
		display: block;
	}
	grid item:hover scrolltext {
		opacity: 1;
	}
	grid item:hover {
		border-radius: 0;
	}

	scrolltext {
		margin: auto 0;
		opacity: 0;
		--gap: 5rem;
		position: absolute;
		display: flex;
		overflow: hidden;
		user-select: none;
		gap: var(--gap);
		z-index: 3;
		pointer-events: none;
	}

	scrolltext content {
		display: flex;
		gap: var(--gap);
		animation: scroll 10s linear infinite;
		width: 100%;
	}

	scrolltext content h1 {
		color: white;
		letter-spacing: 0.5rem;
		font-size: 3.5rem;
		margin-bottom: 0.5rem;
		flex-shrink: 0;
		white-space: nowrap;
	}
	scrolltext content p {
		color: white;
		font-size: 1rem;
		letter-spacing: 0.25rem;
		display: flex;
		line-height: 0.25rem;
	}

	img {
		position: relative;
		object-fit: cover;
		width: 100%;
		z-index: 1;
	}

	.img-overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background: black;
		opacity: 0;
		z-index: 2;
	}
	.img-overlay:hover {
		opacity: 0.5;
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
