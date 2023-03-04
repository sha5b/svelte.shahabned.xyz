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

	body {
		font-family: 'Bitter', sans-serif;
		display: flex;
	}
	
	h1 {
		font-family: 'Outfit', serif;
	}

</style>
