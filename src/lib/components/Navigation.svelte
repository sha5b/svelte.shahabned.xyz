<script>
	export let navTitel = 'shahab'
</script>

<div>
	<nav>
		<item><a href="/info/">info</a></item>
		<item><a href="/">{navTitel}</a></item>
		<item><a href="/artworks/">art</a></item>
		<item><a href="/editions">editions</a></item>
		<item><a href="/">back</a></item>
	</nav>
</div>

<style>
	a {
		color: black;
		text-decoration: none;
	}
	nav {
		display: flex;
		width: 2.5rem;
		height: 100vh;
		position: fixed;
		z-index: 4;
		flex-direction: column;
	}
	nav item {
		rotate: -90deg;
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 100;
		height: 5rem;
	}

	nav item:last-child {
		margin-top: auto;
		rotate: 0deg;
	}
</style>
