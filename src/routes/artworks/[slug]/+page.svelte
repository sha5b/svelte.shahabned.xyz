<script>
	import { pb } from '$lib/pocketbase'
	import { onMount, onDestroy } from 'svelte'
	import { getImageURL } from '$lib/utils/getURL'
	import { spring } from 'svelte/motion'
	import Time from 'svelte-time'
	import { fade, scale } from 'svelte/transition'
	import { page } from '$app/stores'

	$: innerWidth = 0
	$: innerHeight = 0

	let artworks = []
	onMount(async () => {
		const artworkquery = await pb.collection('artworks').getList(1, 250, {
			sort: 'founding_date',
		})
		artworks = artworkquery.items
	})
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<div style="--height: {innerHeight};--width: {innerWidth}">
	{#each artworks as artwork, i}
		{#if artwork.slug === $page.params.slug}
			<flex>
				<img-wrapper>
					<img
						class="front-img"
						width="100%"
						height="100%"
						src={artwork.front_image
							? getImageURL(artwork.collectionId, artwork.id, artwork.front_image)
							: '/'}
						alt={artwork.title}
					/>
				</img-wrapper>

				<content>
					<h1>{artwork.title}</h1>
					<div>
						<h6>{artwork.genre}</h6>
					</div>
					<flex-row>
						<div>
							<p style="font-weight:bolder; font-family: 'Bitter';">medium</p>
							<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
						</div>
					</flex-row>
					<flex-row>
						<div>
							<p style="font-weight:bolder; font-family: 'Bitter';">dimensions</p>
							<p>{artwork.dimensions}</p>
						</div>
						<div>
							<p style="font-weight:bolder; font-family: 'Bitter';">created</p>
							<p><Time>{artwork.founding_date}</Time></p>
						</div>

						{#if artwork.editions}
							<div>
								<p style="font-weight:bolder; font-family: 'Bitter';">edition</p>
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
							style="padding-bottom: 5rem"
							class="gallery-img"
							width="100%"
							height="100%"
							src={artwork.main_image
								? getImageURL(artwork.collectionId, artwork.id, artwork.main_image)
								: '/'}
							alt={artwork.title}
						/>
					{/if}
					<p style="line-height: 2rem">
						{artwork.synopsis}
					</p>
				</content>
				<flex-column>
					{#each artwork.gallery as image}
						<img
							class="galler_img"
							src={image ? getImageURL(artwork.collectionId, artwork.id, image) : '/'}
							alt={artwork.title}
						/>
					{/each}
				</flex-column>

				<flex-column>
					{#each artwork.process_gallery as image}
						<img
							class="galler_img"
							src={image ? getImageURL(artwork.collectionId, artwork.id, image) : '/'}
							alt={artwork.title}
						/>
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
		width: 100vw;
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
