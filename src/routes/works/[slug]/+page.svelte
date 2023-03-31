<script>
	import Time from 'svelte-time'
	import { page } from '$app/stores'
	import { getImageURL } from '$lib/utils/getURL'
	import { Lightbox } from 'svelte-lightbox'
	import FaBitcoin from 'svelte-icons/fa/FaBitcoin.svelte'
	import FaShoppingCart from 'svelte-icons/fa/FaShoppingCart.svelte'
	import MediaQuery from 'svelte-media-query'
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
				<a href="/works"><h1>{work.title}</h1></a>
				<div style="display:flex; justify-content:space-between;align-items:baseline">
					<h2>{work.genre}</h2>
					<icons>
						{#if work.nft}
							<a target="_blank" href={`${work.nft}`}>
								<FaBitcoin />
							</a>
						{/if}
						{#if work.edition}
							<a
								href={`mailto:ned.tabulov@gmail.com?subject=acquisition for the work "${work.slug}"`}>
								<FaShoppingCart />
							</a>
						{/if}
					</icons>
				</div>
				{#if work.expand.colab}
					{#each work.expand.colab as colab}
						{#if colab.role == 'artist'}
							<div style="margin-top:auto;">
								<h4>collaboration</h4>
								<a target="_blank" href={`${colab.link}`}><h2>{colab.title}</h2></a>
							</div>
						{/if}
					{/each}
				{/if}
				<div style="display:flex; gap:1rem;align-items: baseline;">
					<h4>material:</h4>
					<p>{work.material}</p>
				</div>
				<flex>
					{#if work.dimension}<div style="display:flex; gap:1rem;align-items: baseline;">
							<h4>dimension:</h4>
							<p>{work.dimension}</p>
						</div>
					{/if}

					<div style="display:flex; gap:1rem;align-items: baseline;">
						<h4>created:</h4>
						<p><Time timestamp={work.date} format="MMMM YYYY" /></p>
					</div>

					{#if work.edition}
						<div style="display:flex; gap:1rem;align-items: baseline;">
							<h4>edition:</h4>
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
						<Lightbox
							enableClickToClose={true}
							enableEscapeToClose={true}
							enableImageExpand={true}
							showCloseButton={false}>
							<img
								src={getImageURL(work.collectionId, work.id, work.file)}
								alt={`${work.title}`} /></Lightbox>
					{:else if work.type === '3d'}
						<Lightbox
							enableClickToClose={true}
							enableEscapeToClose={true}
							enableImageExpand={true}
							showCloseButton={false}>
							<img
								src={getImageURL(work.collectionId, work.id, work.file)}
								alt={`${work.title}`} /></Lightbox>
					{/if}
				</div>
				<MediaQuery query="(min-width: 1024px)" let:matches>
					{#if matches}
						{#if work.expand.exhibition}
							<table>
								<thead
									><th
										><h2 style="padding-top:3rem;padding-bottom: 0;margin-bottom: 0;">
											exhibitions
										</h2></th
									></thead
								><tbody>
									{#each work.expand.exhibition as exhibition}
										<tr>
											<td
												><p>
													<a target="_blank" href={`${exhibition.link}`}>{exhibition.title}</a>
												</p></td>
											<td style="">
												<Time timestamp={exhibition.date} format="MMMM YYYY" />
											</td>
											<td>
												{exhibition.city}, {exhibition.nation}
											</td>
										</tr>
									{/each}</tbody>
							</table>
						{/if}
					{/if}
				</MediaQuery>
				<MediaQuery query="(max-width: 1024px)" let:matches>
					{#if matches}
						{#if work.expand.exhibition}
							<table>
								<thead
									><th
										><h2 style="padding-top:3rem;padding-bottom: 0;margin-bottom: 0;">
											exhibitions
										</h2></th
									></thead
								><tbody>
									{#each work.expand.exhibition as exhibition}
										<tr>
											<td
												><p>
													<a target="_blank" href={`${exhibition.link}`}>{exhibition.title}</a>
												</p></td>
										</tr>
										<tr>
											<td style="">
												<Time timestamp={exhibition.date} format="MMMM YYYY" />
												<div>{exhibition.city}, {exhibition.nation}</div>
											</td>
										</tr>
									{/each}</tbody>
							</table>
						{/if}
					{/if}
				</MediaQuery>
				<div style="padding-top:2rem;">
					{@html work.synopsis}
				</div>
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
		overflow: hidden;
		width: 25%;
		flex-grow: 1;
		align-items: stretch;
	}
	content {
		padding: 2.5rem 10rem 2.5rem 10rem;
	}

	icons {
		display: flex;
		gap: 2.5rem;
		align-items: baseline;
		opacity: 0.75;
		color: white;
	}
	icons a {
		width: 72px;
		color: black;
	}

	icons a:hover {
		color: var(--primary);
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
	video {
		object-fit: cover;
		height: 100vh;
		width: 100%;
		background-color: black;
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
		margin: 0;
		padding-bottom: 2rem;
	}
	h4 {
		margin: 0;
		bottom: 0;
		font-family: 'Urbanist';
	}
	table {
		white-space: wrap;
		flex-wrap: wrap;
	}
	th {
		justify-content: baseline;
		vertical-align: text-bottom;
		border: none;
		align-items: baseline;
		margin: 0;
		flex-grow: 1;
		flex-shrink: 1;
	}
	td {
		border: none;
		align-items: baseline;
		align-items: end;
	}
	p {
		font-size: 1.25rem;
		margin-bottom: 0;
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
		icons a {
			width: 48px;
		}
	}
	@media (max-width: 480px) {
		content {
			padding: 0.5rem 1rem 0.5rem 1rem;
		}
		icons a {
			width: 32px;
		}
		flex item {
			width: 100%;
			flex-grow: 1;
			flex-shrink: 1;
		}
		h1 {
			font-size: 4rem;
		}
		h2 {
			font-size: 2.5rem;
		}
	}
</style>
