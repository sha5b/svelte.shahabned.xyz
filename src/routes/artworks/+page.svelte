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
		const artworkquery = await pb.collection('artworks').getList(1, 250, {
			sort: '-founding_date'
		})
		artworks = artworkquery.items
	})
</script>

<svelte:window bind:scrollY={scroll} />

<flexcontainer on:mousemove={(e) => mousePosition.set({ x: e.clientX, y: e.layerY })}>
	<flex style:transform={`translate3d(0, ${scroll * -0.1}px, 0)`}>
		{#each artworks as artwork, i (artwork.id)}
			{#if i % 3 === 2}
				<a href={`/artworks/${artwork.slug}`}>
					<item>
						<scrolltext
							style:transform={`translate3d(0, ${$mousePosition.y - scroll * -0.1 - 100}px, 0)`}
						>
							<div style="margin: 0; padding: 0">
								<content>
									<h1>{artwork.title}</h1>
								</content>
								<content>
									<div>
										<p style="font-size: 1.5rem">{artwork.genre}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem"><Time timestamp={artwork.founding_date} /></p>
									</div>
								</content>
							</div>
							<div style="margin: 0; padding: 0">
								<content>
									<h1>{artwork.title}</h1>
								</content>
								<content>
									<div>
										<p style="font-size: 1.5rem">{artwork.genre}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem"><Time timestamp={artwork.founding_date} /></p>
									</div>
								</content>
							</div>
							<div style="margin: 0; padding: 0">
								<content>
									<h1>{artwork.title}</h1>
								</content>
								<content>
									<div>
										<p style="font-size: 1.5rem">{artwork.genre}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem"><Time timestamp={artwork.founding_date} /></p>
									</div>
								</content>
							</div>
							<div style="margin: 0; padding: 0">
								<content>
									<h1>{artwork.title}</h1>
								</content>
								<content>
									<div>
										<p style="font-size: 1.5rem">{artwork.genre}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem"><Time timestamp={artwork.founding_date} /></p>
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
		{#each artworks as artwork, i (artwork.id)}
			{#if i % 3 === 1}
				<a href={`/artworks/${artwork.slug}`}>
					<item>
						<scrolltext
							style:transform={`translate3d(0, ${$mousePosition.y - scroll * -0.2 - 100}px, 0)`}
						>
							<div style="margin: 0; padding: 0">
								<content>
									<h1>{artwork.title}</h1>
								</content>
								<content>
									<div>
										<p style="font-size: 1.5rem">{artwork.genre}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem"><Time timestamp={artwork.founding_date} /></p>
									</div>
								</content>
							</div>
							<div style="margin: 0; padding: 0">
								<content>
									<h1>{artwork.title}</h1>
								</content>
								<content>
									<div>
										<p style="font-size: 1.5rem">{artwork.genre}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem"><Time timestamp={artwork.founding_date} /></p>
									</div>
								</content>
							</div>
							<div style="margin: 0; padding: 0">
								<content>
									<h1>{artwork.title}</h1>
								</content>
								<content>
									<div>
										<p style="font-size: 1.5rem">{artwork.genre}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem"><Time timestamp={artwork.founding_date} /></p>
									</div>
								</content>
							</div>
							<div style="margin: 0; padding: 0">
								<content>
									<h1>{artwork.title}</h1>
								</content>
								<content>
									<div>
										<p style="font-size: 1.5rem">{artwork.genre}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem"><Time timestamp={artwork.founding_date} /></p>
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
	<flex>
		{#each artworks as artwork, i (artwork.id)}
			{#if i % 3 === 0}
				<a href={`/artworks/${artwork.slug}`}>
					<item>
						<scrolltext style:transform={`translate3d(0, ${$mousePosition.y - 100}px, 0)`}>
							<div style="margin: 0; padding: 0">
								<content>
									<h1>{artwork.title}</h1>
								</content>
								<content>
									<div>
										<p style="font-size: 1.5rem">{artwork.genre}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem"><Time timestamp={artwork.founding_date} /></p>
									</div>
								</content>
							</div>
							<div aria-hidden="true">
								<content>
									<h1>{artwork.title}</h1>
								</content>
								<content>
									<div>
										<p style="font-size: 1.5rem">{artwork.genre}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem"><Time timestamp={artwork.founding_date} /></p>
									</div>
								</content>
							</div>
							<div>
								<content aria-hidden="true">
									<h1>{artwork.title}</h1>
								</content>
								<content>
									<div>
										<p style="font-size: 1.5rem">{artwork.genre}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem"><Time timestamp={artwork.founding_date} /></p>
									</div>
								</content>
							</div>
							<div>
								<content aria-hidden="true">
									<h1>{artwork.title}</h1>
								</content>
								<content>
									<div>
										<p style="font-size: 1.5rem">{artwork.genre}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem"><Time timestamp={artwork.founding_date} /></p>
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
	flexcontainer {
		display: flex;
		height: fit-content;
	}

	flex {
		height: fit-content;
		width: 50%;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		flex-direction: column;
	}

	flex item {
		border-radius: 0.25rem;
		flex: 1;
		width: 98%;
		height: auto;
		border-radius: 0.5rem;
		position: relative;
		overflow: hidden;
		display: block;
		transition: border 0.3s ease-in-out;
	}
	flex item:hover scrolltext {
		opacity: 1;
	}

	scrolltext {
		align-items: flex-start;
		opacity: 0;
		--gap: 2.5rem;
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
		margin: auto 0;
		padding: 0;
		justify-content: left;
		display: flex;
		gap: var(--gap);
		animation: scroll 5s linear infinite;
		width: 100%;
		min-width: 350px;
	}

	scrolltext content h1 {
		font-family: 'Bitter';
		color: white;
		flex-basis: auto;
		font-size: 2rem;
		margin-bottom: 0.25rem;
		letter-spacing: 0.2rem;
		flex-shrink: 1;
		padding-bottom: 0rem;
		line-height: 2rem;
	}
	scrolltext content p {
		color: white;
		flex-basis: auto;
		font-size: 1rem;
		letter-spacing: 0.25rem;
		display: flex;
		padding: 0;
		margin: 0;
	}

	img {
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
		transition: opacity 0.3s ease-in-out;
	}
	.img-overlay:hover {
		opacity: 0.6;
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
