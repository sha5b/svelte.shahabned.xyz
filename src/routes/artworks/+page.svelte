<script>
	// @ts-nocheck

	import { pb } from '$lib/pocketbase'
	import { onMount, onDestroy } from 'svelte'
	import { getImageURL } from '$lib/utils/getURL'
	import { spring } from 'svelte/motion'
	import Time from 'svelte-time'
	import { fade, scale } from 'svelte/transition'
	import Footer from '$lib/components/Footer.svelte'

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
	let artColThree = []
	const columns = 3

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
			filter: 'artwork = true'
		})
		artworks = artworkquery.items
		artColOne = sliceAndJoinArray(artworks, columns)[0]
		artColTwo = sliceAndJoinArray(artworks, columns)[1]
		artColThree = sliceAndJoinArray(artworks, columns)[2]
	})
</script>

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
										<p style="font-size: 1.5rem">{artwork.genre}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.material}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">
											<Time timestamp={artwork.founding_date} />
										</p>
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
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.material}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">
											<Time timestamp={artwork.founding_date} />
										</p>
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
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.material}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">
											<Time timestamp={artwork.founding_date} />
										</p>
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
									src={artwork.front_video
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
	<flex style:transform={`translate3d(0, ${scroll * -0.2}px, 0)`}>
		{#each artColTwo as artwork, i (artwork.id)}
			{#if artwork.artwork === true}
				<a href={`/artworks/${artwork.slug}`}>
					<item>
						<scrolltext
							style:transform={`translate3d(0, ${$mousePosition.y - scroll * -0.2 - 100}px, 0)`}>
							<div style="margin: 0; padding: 0">
								<content>
									<h1>{artwork.title}</h1>
								</content>
								<content>
									<div>
										<p style="font-size: 1.5rem">{artwork.genre}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.material}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">
											<Time timestamp={artwork.founding_date} />
										</p>
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
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.material}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">
											<Time timestamp={artwork.founding_date} />
										</p>
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
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.material}</p>
										<p style="line-height: 1.5rem; letter-spacing: 0.1rem">
											<Time timestamp={artwork.founding_date} />
										</p>
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
		{#each artColThree as artwork, i (artwork.id)}
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
										<p style="font-size: 1.5rem">{artwork.genre}</p>
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
										<p style="font-size: 1.5rem">{artwork.genre}</p>
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
										<p style="font-size: 1.5rem">{artwork.genre}</p>
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
										<p style="font-size: 1.5rem">{artwork.genre}</p>
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
</flexcontainer>
<Footer />

<style lang="css">
	flex {
		width: 50%;
		padding-top: 0.25rem;
		padding-bottom: 0.25rem;
		display: flex;
		gap: 0.25rem;
		flex-direction: column;
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
		text-align: left;
		color: white;
		flex-basis: auto;
		font-size: 1rem;
		letter-spacing: 0.25rem;
		display: flex;
		padding: 0;
		margin: 0;
	}

	.front-img {
		object-fit: cover;
		z-index: 1;
		overflow: hide;
		width: 100%;
		max-height: 750px;
	}

	.front-video {
		object-fit: cover;
		z-index: 1;
		overflow: hide;
		width: 100%;
		min-height: 500px;
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
