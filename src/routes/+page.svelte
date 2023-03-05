<script>
	import { pb } from '$lib/pocketbase'
	import { onMount, onDestroy } from 'svelte'
	import { getImageURL } from '$lib/utils/getURL'
	import { spring } from 'svelte/motion'
	import Time from 'svelte-time'
	import { fade, scale } from 'svelte/transition'

	let scroll

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

<svelte:window bind:scrollY={scroll} />

<flexcontainer on:mousemove={(e) => mousePosition.set({ x: e.clientX, y: e.layerY })}>
	<flex style:transform={`translate3d(0, ${scroll * -0.1}px, 0)`}>
		{#each artworks as artwork, i}
			{#if artwork.featured && i % 2 === 1}
				<a href={`/artworks/${artwork.slug}`}>
					<item>
						<scrolltext
							style:transform={`translate3d(0, ${$mousePosition.y - scroll * -0.1 - 150}px, 0)`}
						>
							<div>
								<content>
									<h1>{artwork.title}</h1>
								</content>
								<content>
									<div>
										<p style="font-size: 2rem">{artwork.genre}</p>
										<p>{artwork.dimensions}</p>
										<p><Time format="YYYY/MM/DD">{artwork.founding_date}</Time></p>
										<hr />
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
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
										<p>{artwork.dimensions}</p>
										<p><Time format="YYYY/MM/DD">{artwork.founding_date}</Time></p>
										<hr />
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
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
										<p>{artwork.dimensions}</p>
										<p><Time format="YYYY/MM/DD">{artwork.founding_date}</Time></p>
										<hr />
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
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
										<p>{artwork.dimensions}</p>
										<p><Time format="YYYY/MM/DD">{artwork.founding_date}</Time></p>
										<hr />
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
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
				</a>
			{/if}
		{/each}
	</flex>
	<flex style:transform={`translate3d(0, ${scroll * -0.2}px, 0)`}>
		{#each artworks as artwork, i}
			{#if artwork.featured && i % 2 === 0}
				<a href={`/artworks/${artwork.slug}`}>
					<item>
						<scrolltext
							style:transform={`translate3d(0, ${$mousePosition.y - scroll * -0.2 - 150}px, 0)`}
						>
							<div>
								<content>
									<h1>{artwork.title}</h1>
								</content>
								<content>
									<div>
										<p style="font-size: 2rem">{artwork.genre}</p>
										<p>{artwork.dimensions}</p>
										<p><Time format="YYYY/MM/DD">{artwork.founding_date}</Time></p>
										<hr />
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
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
										<p>{artwork.dimensions}</p>
										<p><Time format="YYYY/MM/DD">{artwork.founding_date}</Time></p>
										<hr />
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
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
										<p>{artwork.dimensions}</p>
										<p><Time format="YYYY/MM/DD">{artwork.founding_date}</Time></p>
										<hr />
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
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
										<p>{artwork.dimensions}</p>
										<p><Time format="YYYY/MM/DD">{artwork.founding_date}</Time></p>
										<hr />
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
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
				</a>
			{/if}
		{/each}
	</flex>
</flexcontainer>

<style lang="css">
	a {}
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

	scrolltext {
		opacity: 0;
		--gap: 5rem;
		position: absolute;
		display: flex;
		overflow: hidden;
		user-select: none;
		gap: var(--gap);
		z-index: 3;
		pointer-events: none;
		transition: opacity 0.3s ease-in-out;
	}

	scrolltext content {
		justify-content: left;
		display: flex;
		gap: var(--gap);
		animation: scroll 10s linear infinite;
		width: 100%;
	}

	scrolltext content h1 {
		font-family: 'Bitter';
		color: white;
		flex-basis: auto;
		letter-spacing: 0.5rem;
		font-size: 3.5rem;
		margin-bottom: 0.5rem;
		flex-shrink: 0;
		white-space: nowrap;
	}
	scrolltext content p {
		color: white;
		flex-basis: auto;
		font-size: 1rem;
		letter-spacing: 0.25rem;
		display: flex;
		line-height: 0.25rem;
	}

	img {
		width: 100%;
		z-index: 1;
	}

	.img-overlay {
		border-radius: 0.25rem;
		position: absolute;
		width: 100%;
		height: 100%;
		background: black;
		opacity: 0;
		z-index: 2;
		transition: opacity 0.3s ease-in-out;
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
