<script>
	import Navigation from '$lib/components/Navigation.svelte'
</script>

<body>
	<Navigation />
	<slot />
</body>

<style global>
	@import url('https://fonts.googleapis.com/css?family=Bitter&display=swap');
	@import url('https://fonts.googleapis.com/css?family=Outfit&display=swap');
	@import url('https://fonts.googleapis.com/css?family=Urbanist&display=swap');

	body {
		font-family: 'Urbanist';
		display: flex;
		flex-grow: 1;
	}
</style>
