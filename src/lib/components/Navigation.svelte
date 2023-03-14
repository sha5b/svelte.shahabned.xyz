<script>
	import { page } from '$app/stores'
	console.log($page)
</script>

{#if $page.route.id === '/'}
	<div style="background-color var(--main-white)">
		<nav>
			<item><a href="/artworks" data-sveltkit-prefetch>artworks</a></item>
			<item><a href="/" data-sveltkit-prefetch style="white-space: nowrap;">shahab nedaei</a></item>
			<item><a href="/info/" data-sveltkit-prefetch>info</a></item>
		</nav>
	</div>
{:else if $page.route.id === '/artworks'}
	<div style="background-color var(--main-white)">
		<nav>
			<item><a href="/editions" data-sveltkit-prefetch>editions</a></item>
			<item><a href="/artworks" data-sveltkit-prefetch>artworks</a></item>
			<item><a href="/" data-sveltkit-prefetch style="white-space: nowrap;">shahab nedaei</a></item>
		</nav>
	</div>
{:else if $page.route.id === '/info'}
	<div style="background-color var(--main-white)">
		<nav>
			<item><a href="/" data-sveltkit-prefetch style="white-space: nowrap;">shahab nedaei</a></item>
			<item><a href="/info/" data-sveltkit-prefetch>info</a></item>
			<item><a href="/curations" data-sveltkit-prefetch>curations</a></item>
		</nav>
	</div>
{:else if $page.route.id === '/curations'}
	<div style="background-color var(--main-white)">
		<nav>
			<item><a href="/info/" data-sveltkit-prefetch>info</a></item>
			<item><a href="/curations" data-sveltkit-prefetch>curations</a></item>
			<item />
		</nav>
	</div>
{:else}
	<div style="background-color var(--main-white)">
		<nav>
			<item><a href="/editions" data-sveltkit-prefetch>editions</a></item>
			<item><a href="/artworks" data-sveltkit-prefetch>artworks</a></item>
			<item><a href="/" data-sveltkit-prefetch style="white-space: nowrap;">shahab nedaei</a></item>
		</nav>
	</div>
{/if}

<style>
	a {
		color: black;
		text-decoration: none;
	}
	nav {
		padding-bottom: 0.5rem;
		display: flex;
		width: 2.5rem;
		height: 100%;
		position: fixed;
		z-index: 4;
		justify-content: space-between;
		flex-direction: column;
	}

	nav item {
		rotate: -90deg;
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		text-align: start;
		width: 100;
		height: 5rem;
		color: var(--main-black);
		transition: color 0.1s ease-in-out;
	}

	nav item:hover a {
		color: var(--secondary-grey);
	}

	/* nav item:last-child {
		margin-top: auto;
		rotate: 0deg;
	} */
</style>
