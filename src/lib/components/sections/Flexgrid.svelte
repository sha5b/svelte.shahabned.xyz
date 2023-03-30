<script>
	import { splitArrayColumns } from '$lib/utils/splitArrayColumns'
	import Itemcard from '$lib/components/elements/Itemcard.svelte'

	export let scroll
	export let columns
	export let arr

	let verticalColumn = splitArrayColumns(arr, columns)
</script>

<flex-wrapper>
	{#each verticalColumn as column, i}
		<flex style:transform={`translate3d(0, ${scroll * (i / 10)}px, 0)`}>
			{#each column as work (work.id)}
				<item>
					<Itemcard
						{scroll}
						{i}
						title={work.title}
						slug={work.slug}
						genre={work.genre}
						material={work.material}
						dimension={work.dimension}
						date={work.date}
						edition={work.edition}
						collectionId={work.collectionId}
						id={work.id}
						nft={work.nft}
						type={work.type}
						thumb={work.thumb} />
				</item>
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
	}
	flex {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 1rem;
		padding-top: 0rem;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}
	flex item {
		position: relative;
		overflow: hidden;
		display: block;
	}
</style>
