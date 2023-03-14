<script>
	export let navTitel = 'home'
</script>

<div>
	<nav>
		<item><a href="/info/" data-sveltkit-prefetch>info</a></item>
		<item><a href="/" data-sveltkit-prefetch>{navTitel}</a></item>
		<item><a href="/artworks" data-sveltkit-prefetch>artworks</a></item>
		<item><a href="/editions" data-sveltkit-prefetch>prints</a></item>
		<item><a href="/editions" data-sveltkit-prefetch>curation</a></item>
	</nav>
</div>

<style>
	a {
		color: black;
		text-decoration: none;
	}
	nav {
		padding-bottom: 0.5rem;
		display: flex;
		width: 2.5rem;
		height: 100vh;
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

		width: 100;
		height: 5rem;
	}

	/* nav item:last-child {
		margin-top: auto;
		rotate: 0deg;
	} */
</style>
