<script>
	import Time from 'svelte-time'
	import { page } from '$app/stores'
	import { getImageURL } from '$lib/utils/getURL'
	import { Lightbox } from 'svelte-lightbox'
	export let data
	// mouse position setup - needs to be a component - i don't know how
</script>

<container>
	{#each data.curated as curated}
		{#if curated.slug === $page.params.slug}
			<img
				class="cover-img"
				style="height:100vh"
				src={getImageURL(curated.collectionId, curated.id, curated.file)}
				alt={`${curated.title}`} />
			<content>
				<div>
					<h1>{curated.title}</h1>
					{#each curated.expand.colab as colab}
						{#if colab.role == 'curated'}
							<div style="margin-top:auto;">
								<h4>exhibited artists</h4>
								<a target="_blank" href={`${colab.link}`}><h2>{colab.title}</h2></a>
							</div>
						{/if}
					{/each}
				</div>
				{#each curated.expand.colab as colab}
					{#if colab.role == 'artist'}
						<div style="margin-top:auto;">
							<h4>collaboration</h4>
							<a target="_blank" href={`${colab.link}`}><h2>{colab.title}</h2></a>
						</div>
					{/if}
				{/each}
				<div style="margin-top:auto;">
					<h4>location</h4>
					<a target="_blank" href={`${curated.space_link}`}><h2>{curated.space_name}</h2></a>
				</div>
				<div style="padding-top:2rem;padding-bottom:5rem">
					<p>
						{@html curated.synopsis}
					</p>
				</div>

				<flex>
					{#each curated.gallery as image}
						<item>
							<Lightbox
								enableEscapeToClose={true}
								enableClickToClose={true}
								showCloseButton={false}>
								<img
									src={getImageURL(curated.collectionId, curated.id, image)}
									alt={`${curated.title}`} />
							</Lightbox>
						</item>
					{/each}
				</flex>
			</content>
		{/if}
	{/each}
</container>

<style>
	container {
		display: flex;
		width: 100%;
		flex-direction: column;
		margin: 0 auto;
		padding-bottom: 2rem;
	}

	flex {
		display: flex;
		justify-content: space-between;
		width: 100%;
		flex-wrap: wrap;
		gap: 1rem;
		padding-top: 1rem;
		padding-bottom: 1rem;
	}
	flex item {
		width: 25%;
		flex-grow: 1;
		align-items: stretch;
	}
	content {
		padding: 2.5rem 10rem 2.5rem 10rem;
	}
	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
		max-width: 100%;
		background-color: black;
	}
	.cover-img {
		border-radius: 0rem;
	}

	h1 {
		font-family: 'Bitter';
		font-size: 4rem;
		letter-spacing: 0.75rem;
	}

	h2 {
		font-family: 'Urbanist';
		font-size: 3rem;
		font-weight: 300;
	}
	h4 {
		margin: 0;
		bottom: 0;
		font-family: 'Urbanist';
	}

	@media (max-width: 1024px) {
		content {
			padding: 1rem 5rem 1rem 5rem;
		}
		flex item {
			width: 33%;
		}
	}

	@media (max-width: 768px) {
		content {
			padding: 0.5rem 2.5rem 0.5rem 2.5rem;
		}
	}
	@media (max-width: 480px) {
		content {
			padding: 0.5rem 1rem 0.5rem 1rem;
		}
		flex item {
			width: 100%;
		}
	}
</style>
