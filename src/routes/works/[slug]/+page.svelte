<script>
	import Time from 'svelte-time'
	import { page } from '$app/stores'
	import { getImageURL } from '$lib/utils/getURL'
	import { Lightbox } from 'svelte-lightbox'
	export let data
	// mouse position setup - needs to be a component - i don't know how
</script>

<container>
	{#each data.works as work}
		{#if work.slug === $page.params.slug}
			{#if work.type === 'video'}
				<video
					class="cover-img"
					on:mouseenter={() => (work.play = false)}
					on:mouseleave={() => (work.play = true)}
					bind:paused={work.play}
					autoplay
					loop
					src={getImageURL(work.collectionId, work.id, work.file)}
					alt={`${work.title}`}><track kind="captions" /></video>
			{:else if work.type === 'image'}
				<img
					class="cover-img"
					style="height:100vh"
					src={getImageURL(work.collectionId, work.id, work.file)}
					alt={`${work.title}`} />
			{:else if work.type === '3d'}
				<img
					class="cover-img"
					style="height:100vh"
					src={getImageURL(work.collectionId, work.id, work.file)}
					alt={`${work.title}`} />
			{/if}
			<content>
				<h1>{work.title}</h1>
				<h2>{work.genre}</h2>
				<div style="display:flex; gap:1rem">
					<h4>material:</h4>
					<p>{work.material}</p>
				</div>
				<flex>
					{#if work.dimension}<div style="display:flex; gap:1rem;">
							<h4>dimnesion:</h4>
							<p>{work.dimension}</p>
						</div>
					{/if}

					<div style="display:flex; gap:1rem">
						<h4>created:</h4>
						<p><Time timestamp={work.date} format="MMMM YYYY" /></p>
					</div>

					{#if work.edition}
						<div style="display:flex; gap:1rem">
							<h4>eidition:</h4>
							<p>{work.edition}</p>
						</div>
					{/if}
				</flex>
				<div>
					{#if work.type === 'video'}
						<video
							loop
							controls
							src={getImageURL(work.collectionId, work.id, work.file)}
							alt={`${work.title}`}><track kind="captions" /></video>
					{:else if work.type === 'image'}
						<img src={getImageURL(work.collectionId, work.id, work.file)} alt={`${work.title}`} />
					{:else if work.type === '3d'}
						<img src={getImageURL(work.collectionId, work.id, work.file)} alt={`${work.title}`} />
					{/if}
				</div>
				<div style="padding-top:2rem;">
					{@html work.synopsis}
				</div>
				<flex>
					<div style="flex-grow:1">
						{#if work.edition}
							<div>
								<a
									href={`mailto:ned.tabulov@gmail.com?subject=acquisition for the work "${work.slug}"`}
									><button class="contrast" style="width:100%">buy edition</button></a>
							</div>
						{/if}
					</div>
					<div style="flex-grow:1">
						{#if work.nft}
							<a href={`${work.nft}`}><button class="contrast">buy nft</button></a>
						{/if}
					</div>
				</flex>
				<flex>
					{#each work.gallery as image}
						<item>
							<Lightbox
								enableClickToClose={true}
								enableEscapeToClose={true}
								enableImageExpand={true}
								showCloseButton={false}>
								<img src={getImageURL(work.collectionId, work.id, image)} alt={`${work.title}`} />
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
	}
	.cover-img {
		border-radius: 0rem;
	}
	video {
		object-fit: cover;
		height: 100vh;
		width: 100%;
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
		font-family: 'Urbanist';
	}
</style>
