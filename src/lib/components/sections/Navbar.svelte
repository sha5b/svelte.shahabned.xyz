<script>
	let scroll
	import { slide } from 'svelte/transition'
</script>

<svelte:window bind:scrollY={scroll} />
<container>
	{#if scroll > 80}
		<flex transition:slide>
			<item>
				<a href="/buy">buy</a>
			</item>
			<item>
				<a href="/works">works</a>
			</item>
			<item>
				<a style="font-weight:bold" href="/">shahab nedaei</a>
			</item>
			<item>
				<a href="/info">info</a>
			</item>
			<item>
				<a href="/">curated</a>
			</item>
		</flex>
	{/if}
</container>

<style>
	container {
		width: 100%;
	}
	flex {
		background-color: white;
		position: fixed; /* Make it stick/fixed */
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		top: 0;
		z-index: 10;
		width: 100%;
		padding-left: 10rem;
		padding-right: 10rem;
		padding-bottom: 0.5rem;
		padding-top: 0.5rem;
	}
	item {
		margin: 0;
		padding: 0;
	}
	a {
		text-decoration: none;
		font-family: 'Urbanist';
		color: black;
		accent-color: gray;
		border-radius: 0;
		font-size: 0.8rem;
		padding: 0.5rem;
	}
	a:hover {
		background-color: black;
		color: white;
	}
</style>
