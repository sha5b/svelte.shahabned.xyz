<script>
	import { pb } from '$lib/pocketbase'
	import { onMount, onDestroy } from 'svelte'
	import { getImageURL } from '$lib/utils/getURL'
	import { spring } from 'svelte/motion'
	import Time from 'svelte-time'
	import { fade, scale } from 'svelte/transition'
	import { page } from '$app/stores'

	let videoPlayState = false
	$: innerWidth = 0
	$: innerHeight = 0

	let artworks = []
	onMount(async () => {
		const artworkQuery = await pb.collection('artworks').getList(1, 250, {
			sort: '-founding_date',
			expand: 'exhibitions'
		})
		artworks = artworkQuery.items
	})
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<div style="--height: {innerHeight};--width: {innerWidth}">
	{#each artworks as artwork, i (artwork.id)}
		{#if artwork.slug === $page.params.slug}
			<flex>
				<img-wrapper>
					{#if artwork.front_video}
						<video
							on:mouseenter={() => (videoPlayState = false)}
							on:mouseleave={() => (videoPlayState = true)}
							bind:paused={videoPlayState}
							loop
							autoplay
							controls
							class="front_video"
							poster={artwork.front_image
								? getImageURL(artwork.collectionId, artwork.id, artwork.front_image)
								: '/'}
							src={artwork.front_video
								? getImageURL(artwork.collectionId, artwork.id, artwork.front_video)
								: '/'}>
							<track kind="captions" />
						</video>
					{:else}
						<img
							class="front-img"
							width="100%"
							height="100%"
							loading="lazy"
							src={artwork.front_image
								? getImageURL(artwork.collectionId, artwork.id, artwork.front_image)
								: '/'}
							alt={artwork.title} />
					{/if}
				</img-wrapper>

				<content>
					<h1>{artwork.title}</h1>
					<div>
						<h6>{artwork.genre}</h6>
					</div>
					<flex-row>
						<div>
							<p style="font-weight:bolder; font-family: 'Bitter';">material</p>
							<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.material}</p>
						</div>
					</flex-row>
					<flex-row>
						<div>
							<p style="font-weight:bolder; font-family: 'Bitter';">dimensions</p>
							<p>{artwork.dimensions}</p>
						</div>
						<div>
							<p style="font-weight:bolder; font-family: 'Bitter';">created</p>
							<p><Time timestamp={artwork.founding_date} /></p>
						</div>

						{#if artwork.editions}
							<div>
								<p style="font-weight:bolder; font-family: 'Bitter';">editions</p>
								<p>{artwork.editions}</p>
							</div>
						{/if}
					</flex-row>

					{#if artwork.colab}
						{#each artwork.colab as colab}
							<div>
								<p style="font-weight:bolder; font-family: 'Bitter';">colab</p>
								<a href={`${colab.link}`}>{colab.name}</a>
							</div>
						{/each}
					{/if}
					{#if artwork.main_image}
						<img
							style="padding-bottom: 2.5rem"
							class="gallery-img"
							width="100%"
							height="100%"
							loading="lazy"
							src={artwork.main_image
								? getImageURL(artwork.collectionId, artwork.id, artwork.main_image)
								: '/'}
							alt={artwork.title} />
					{/if}
					{#if artwork.synopsis}
						<p style="line-height: 2rem">
							{artwork.synopsis}
						</p>
					{/if}

					{#if artwork.expand.exhibitions}
						<flex-row>
							<div style="padding-top:2.5rem">
								<p style="font-weight:bolder; font-family: 'Bitter';">exhibited</p>
							</div>
						</flex-row>
						<flex-row style="justify-content: flex-start; gap: 2rem">
							{#each artwork.expand.exhibitions as exhibition, i (exhibition.id)}
								<div style="border-left: 1px solid black; padding: 1rem">
									<p>{exhibition.title}</p>
									<p><Time timestamp={exhibition.date} /></p>
									<a href={`${exhibition.curator_link}`}><p>{exhibition.curator_name}</p></a>
									<a href={`${exhibition.location_link}`}><p>{exhibition.location_name}</p></a>
								</div>
							{/each}
						</flex-row>
					{/if}
					<flex-row style="padding-top: 2.5rem">
						{#if artwork.editions}
							<div style="justify-cotent: flex-start">
								{#if artwork.nft}
									<a href={`${artwork.nft}`}
										><button class="contrast" style="width:100%"
											>buy nft / {artwork.editions}</button
										></a>
								{:else}
									<a href="/"
										><button class="contrast" style="width:100%"
											>buy edition / {artwork.editions}</button
										></a>
								{/if}
							</div>
						{/if}
					</flex-row>
				</content>
				<flex-column style="padding-bottom:10rem">
					{#each artwork.gallery as image}
						<img
							class="galler_img"
							loading="lazy"
							src={image ? getImageURL(artwork.collectionId, artwork.id, image) : '/'}
							alt={artwork.title} />
					{/each}
				</flex-column>

				<flex-column>
					{#each artwork.process_gallery as image}
						<img
							class="process_img"
							loading="lazy"
							src={image ? getImageURL(artwork.collectionId, artwork.id, image) : '/'}
							alt={artwork.title} />
					{/each}
				</flex-column>
			</flex>
		{/if}
	{/each}
</div>

<style lang="css">
	a {
	}

	h1 {
		font-family: 'Bitter';
		font-size: 5rem;
		letter-spacing: 0.75rem;
		margin-bottom: 0.5rem;
		line-height: 5.5rem;
		padding-bottom: 1.5rem;
	}
	h6 {
		font-family: 'Urbanist';
		font-size: 3rem;
		letter-spacing: 0.25rem;
		padding-bottom: 1rem;
		font-weight: 300;
	}

	p {
		line-height: 0.75rem;
		font-size: 1.3rem;
	}
	.front-img {
		object-fit: cover;
		z-index: 1;
		overflow: hide;
		width: 100%;
		aspect-ratio: calc(var(--width)) / calc(var(--height) + 50);
	}
	.front_video {
		object-fit: cover;
		z-index: 1;
		overflow: hide;
		width: 100%;
		aspect-ratio: calc(var(--width)) / calc(var(--height) + 50);
	}

	img-wrapper {
		min-width: 100%;
	}

	flex {
		justify-content: center;
		display: flex;
		flex-direction: column;
	}

	flex-column {
		display: flex;
		padding-left: 2.5rem;
		padding-right: 2.5rem;
		flex-wrap: wrap;
	}

	flex-column .galler_img {
		padding: 0.25rem;
		display: flex;
		overflow: hide;
		width: 33%;
		flex-basis: 1;
		flex-grow: 1;
		flex-wrap: wrap;
		align-self: stretch;
		object-fit: cover;
	}
	flex-column .process_img {
		padding: 0.25rem;
		display: flex;
		overflow: hide;
		width: 20%;
		flex-basis: 1;
		flex-grow: 1;
		flex-wrap: wrap;
		align-self: stretch;
		object-fit: cover;
	}

	flex-row {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		flex: 1;
		height: fit-content;
		padding-bottom: 1rem;
	}

	content {
		padding: 2.5rem 10rem 2.5rem 10rem;
		white-space: wrap;
	}
</style>
