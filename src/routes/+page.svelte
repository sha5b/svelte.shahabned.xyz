<script>
	// @ts-nocheck
	import { pb } from '$lib/pocketbase'
	import { onMount, onDestroy } from 'svelte'
	import { getImageURL } from '$lib/utils/getURL'
	import { spring } from 'svelte/motion'
	import Time from 'svelte-time'
	import { fade, scale } from 'svelte/transition'
	import { each } from 'svelte/internal'
	import Footer from '$lib/components/Footer.svelte'
	import { MetaTags } from 'svelte-meta-tags'

	let scroll

	let mousePosition = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.2,
			damping: 1
		}
	)

	let artworks = []
	let artColOne = []
	let artColTwo = []
	const columns = 2

	function sliceAndJoinArray(myArray, sliceSize) {
		const slicedArray = []
		let tempArray = []

		myArray.forEach((item, index) => {
			tempArray.push(item)
			if (tempArray.length === sliceSize || index === myArray.length - 1) {
				slicedArray.push(tempArray.slice(0, sliceSize))
				tempArray = tempArray.slice(sliceSize)
			}
		})

		const pairArray = []

		slicedArray.forEach((subArray) => {
			for (let i = 0; i < subArray.length; i++) {
				if (!pairArray[i]) {
					pairArray[i] = []
				}
				pairArray[i].push(subArray[i])
			}
		})

		return pairArray
	}
	onMount(async () => {
		const artworkquery = await pb.collection('artworks').getList(1, 250, {
			sort: '-founding_date',
			filter: 'featured = true'
		})
		artworks = artworkquery.items
		artColOne = sliceAndJoinArray(artworks, columns)[0]
		artColTwo = sliceAndJoinArray(artworks, columns)[1]
	})
</script>

<MetaTags
	title="shahab nedaei"
	titleTemplate="%s | digital and internet art"
	description="digital and internet art"
	canonical="https://shahabned.xyz/"
	openGraph={{
		url: 'https://shahabned.xyz',
		title: 'shahab nedaei | digital and internet art',
		description: 'digital and internet art',
		images: [
			{
				url: '../static/main.webp',
				width: 512,
				height: 512,
				alt: 'handwritten logo'
			}
		],
		site_name: 'shahab nedaei'
	}}
	additionalMetaTags={[
		{
			property: 'dc:creator',
			content: 'shahab nedaei'
		},
		{
			name: 'application-name',
			content: 'shahab nedaei | digital and internet art'
		},
		{
			httpEquiv: 'x-ua-compatible',
			content: 'IE=edge; chrome=1'
		}
	]} />

<svelte:window bind:scrollY={scroll} />

<flexcontainer on:mousemove={(e) => mousePosition.set({ x: e.clientX, y: e.layerY })}>
	<flex style:transform={`translate3d(0, ${scroll * -0.1}px, 0)`}>
		{#each artColOne as artwork, i (artwork.id)}
			{#if artwork.artwork === true}
				<a href={`/artworks/${artwork.slug}`}>
					<item>
						<scrolltext
							style:transform={`translate3d(0, ${$mousePosition.y - scroll * -0.1 - 100}px, 0)`}>
							<div style="margin: 0; padding: 0">
								<content>
									<h1>{artwork.title}</h1>
								</content>
								<content>
									<div>
										<p style="font-size: 2rem">{artwork.genre}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.material}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">
											<Time timestamp={artwork.founding_date} />
										</p>
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
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.material}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">
											<Time timestamp={artwork.founding_date} />
										</p>
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
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.material}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">
											<Time timestamp={artwork.founding_date} />
										</p>
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
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.material}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">
											<Time timestamp={artwork.founding_date} />
										</p>
									</div>
								</content>
							</div>
						</scrolltext>
						<div>
							<div class="img-overlay" />
							{#if artwork.front_video}
								<video
									autoplay
									muted
									loop
									class="front-video"
									poster={artwork.front_image
										? getImageURL(artwork.collectionId, artwork.id, artwork.front_image)
										: '/'}
									src={artwork.video_thumb
										? getImageURL(artwork.collectionId, artwork.id, artwork.video_thumb)
										: '/'}>
									<track kind="captions" />
								</video>
							{:else}
								<div>
									<img
										class="front-img"
										width="100%"
										height="100%"
										loading="lazy"
										src={artwork.front_image
											? getImageURL(artwork.collectionId, artwork.id, artwork.front_image)
											: '/'}
										alt={artwork.title} />
								</div>
							{/if}
						</div>
					</item>
				</a>
			{/if}
		{/each}
	</flex>
	<flex>
		{#each artColTwo as artwork, i (artwork.id)}
			{#if artwork.artwork === true}
				<a href={`/artworks/${artwork.slug}`}>
					<item>
						<scrolltext style:transform={`translate3d(0, ${$mousePosition.y - 100}px, 0)`}>
							<div style="margin: 0; padding: 0">
								<content>
									<h1>{artwork.title}</h1>
								</content>
								<content>
									<div>
										<p style="font-size: 2rem">{artwork.genre}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.material}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">
											<Time timestamp={artwork.founding_date} />
										</p>
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
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.material}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">
											<Time timestamp={artwork.founding_date} />
										</p>
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
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.material}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">
											<Time timestamp={artwork.founding_date} />
										</p>
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
										<div>
											<p style="line-height: 1.5rem; letter-spacing: 0.1rem">
												{artwork.material}
											</p>
										</div>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">
											<Time timestamp={artwork.founding_date} />
										</p>
									</div>
								</content>
							</div>
						</scrolltext>
						<div>
							<div class="img-overlay" />
							{#if artwork.front_video}
								<video
									autoplay
									muted
									loop
									class="front-video"
									poster={artwork.front_image
										? getImageURL(artwork.collectionId, artwork.id, artwork.front_image)
										: '/'}
									src={artwork.video_thumb
										? getImageURL(artwork.collectionId, artwork.id, artwork.video_thumb)
										: '/'}>
									<track kind="captions" />
								</video>
							{:else}
								<div>
									<img
										class="front-img"
										width="100%"
										height="100%"
										loading="lazy"
										src={artwork.front_image
											? getImageURL(artwork.collectionId, artwork.id, artwork.front_image)
											: '/'}
										alt={artwork.title} />
								</div>
							{/if}
						</div>
					</item>
				</a>
			{/if}
		{/each}
	</flex>
</flexcontainer>
<Footer />

<style lang="css">
	flex {
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
		display: flex;
		gap: 0.5rem;
		flex-direction: column;
	}
	flex item:hover scrolltext {
		opacity: 1;
	}

	scrolltext {
		opacity: 0;
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
		min-width: 500px;
	}

	scrolltext content h1 {
		font-family: 'Bitter';
		color: var(--main-white);
		flex-basis: auto;
		letter-spacing: 0.25rem;
		font-size: 3.5rem;
		margin-bottom: 0.25rem;
		flex-shrink: 1;
		padding-bottom: 0rem;
		line-height: 4rem;
	}
	scrolltext content p {
		color: var(--main-white);
		flex-basis: auto;
		font-size: 1.2rem;
		letter-spacing: 0.25rem;
		line-height: 2.5rem;
		display: flex;
		padding-bottom: 0.25rem;
		margin: 0;
	}

	.front-img {
		object-fit: cover;
		z-index: 1;
		overflow: hide;
		width: 100%;
		aspect-ratio: calc(var(--width)) / calc(var(--height) + 50);
	}
	.front-video {
		object-fit: cover;
		z-index: 1;
		overflow: hide;
		width: 100%;
		min-height: 750px;
		aspect-ratio: calc(var(--width)) / calc(var(--height) + 50);
	}

	.img-overlay {
		border-radius: 0.25rem;
		position: absolute;
		width: 100%;
		height: 100%;
		background: var(--main-black);
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
