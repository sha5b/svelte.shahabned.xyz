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
		const artworkquery = await pb.collection('artworks').getList(1, 50, {
			sort: 'created',
			expand: 'user'
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
						width="100%"
						height="100%"
						loading="lazy"
						src={artwork.front_image
							? getImageURL(artwork.collectionId, artwork.id, artwork.front_image)
							: '/'}
						alt={artwork.title}
					/>
				</img-wrapper>

				<content>
					<h1>{artwork.title}</h1>
					<div>
						<p style="font-size: 3rem; letter-spacing: .25rem">{artwork.genre}</p>
					</div>
					<flex-row>
						<div>
							<p style="font-weight:bolder">dimensions</p>
							<p>{artwork.dimensions}</p>
						</div>
						<div>
							<p style="font-weight:bolder">created</p>
							<p><Time format="YYYY/MM/DD">{artwork.founding_date}</Time></p>
						</div>
						<div>
							<p style="font-weight:bolder">medium</p>
							<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{artwork.medium}</p>
						</div>
						{#if artwork.editions}
							<div>
								<p style="font-weight:bolder">edition</p>
								<p>{artwork.editions}</p>
							</div>
						{/if}
						{#if artwork.colab}
							{#each artwork.colab as colab}
								<div>
									<p style="font-weight:bolder">colab</p>
									<a href={`${colab.link}`}>{colab.name}</a>
								</div>
							{/each}
						{/if}
					</flex-row>
					<div>
						{artwork.synopsis}
					</div>
				</content>
				<flex-column>
					{#each artwork.gallery as image}
						<img
							loading="lazy"
							src={image ? getImageURL(artwork.collectionId, artwork.id, image) : '/'}
							alt={artwork.title}
						/>
					{/each}
				</flex-column>

				<flex-column>
					{#each artwork.process_gallery as image}
						<img
							loading="lazy"
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
	}
	p {
		font-size: 1.3rem;
	}
	img {
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
		flex-shrink: 1;
		flex-wrap: wrap;
		gap: 0.25rem;
		width: fit-content;
		height: fit-content;
	}

	flex-column img {
		padding-top: 0.25rem;
		display: flex;
		object-fit: cover;
		overflow: hide;
		width: 25%;
		height: fit-content;
		aspect-ratio: auto;

	}

	flex-row {
		justify-content: space-between;
		display: flex;
		flex-wrap: wrap;
		line-break: auto;
		align-items: baseline;
		flex-direction: row;
		align-items: flex-start;
		gap: 5rem;
	}

	content {
		padding: 2.5rem 10rem 2.5rem 10rem;
	}
</style>
