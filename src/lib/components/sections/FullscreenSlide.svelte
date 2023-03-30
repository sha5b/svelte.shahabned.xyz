<script>
	import { splitArrayColumns } from '$lib/utils/splitArrayColumns'
	import { getImageURL } from '$lib/utils/getURL'
	import Time from 'svelte-time'

	export let columns
	export let arr
	let scroll

	let verticalColumn = splitArrayColumns(arr, columns)
</script>

<flex-wrapper>
	{#each verticalColumn as column, i}
		<flex>
			{#each column as curated, i (curated.id)}
				<a href={`curated/${curated.slug}`}>
					<item>
						<flex style="">
							<text-hover>
								<div style="width:100%; z-index: 5;		align-items: baseline;">
									<div style="display:flex;justify-content:space-between">
										<h1>{curated.title}</h1>
										<p><Time timestamp={curated.date} format="MMMM YYYY" /></p>
									</div>
									<div>
										{#each curated.expand.colab as colab}
											{#if colab.role == 'curated'}
												<div style="margin-top:auto;">
													<h2>{colab.title}</h2>
												</div>
											{/if}
										{/each}
									</div>
								</div>
								<div style="z-index:5;align-items: baseline;">
									<div style="display:flex;justify-content:space-between">
										<h2>{curated.space_name}</h2>
										<p>location</p>
									</div>
								</div>
							</text-hover>
						</flex>
						<image-overlay />
						<img
							src={getImageURL(curated.collectionId, curated.id, curated.thumb)}
							alt={`${curated.title}`} />
					</item>
				</a>
			{/each}
		</flex>
	{/each}
</flex-wrapper>

<style lang="css">
	flex-wrapper {
		display: flex;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		padding-bottom: 1rem;
		padding-top: 1rem;
		width: 100%;
		height: 100%;
		flex-direction: column;
		align-items: baseline;
	}

	flex {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		gap: 1rem;
		justify-content: space-between;
		padding-top: 0rem;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}
	flex item {
		position: relative;
		overflow: hidden;
		display: block;
		width: 100%;
	}
	flex item:hover text-hover {
		opacity: 1;
	}

	text-hover {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: absolute;
		padding: 2rem;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: opacity 0.1s ease-in-out;
	}
	img {
		object-fit: cover;
		overflow: hide;
		width: 100%;
		max-height: 500px;
		border-radius: 0.25rem;
	}
	image-overlay {
		border-radius: 0.25rem;
		z-index: 1;
		position: absolute;
		width: 100%;
		height: 100%;
		background: black;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}
	flex item:hover image-overlay {
		opacity: 0.6;
	}

	h1 {
		color: white;
		font-family: 'Bitter';
		letter-spacing: 0.25rem;
		font-size: 4rem;
		padding: 0;
		margin: 0;
	}
	h2 {
		color: white;
		font-family: 'Urbanist';
		font-size: 3rem;
		padding: 0;
		margin: 0;
	}
	p {
		color: white;
		padding: 0;
		margin: 0;
	}
</style>
