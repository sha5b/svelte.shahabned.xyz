<script>
	import Navigation from '$lib/components/Navigation.svelte'
</script>

<body >
	<Navigation />
	<slot />
</body>

<style global>
	@import url('https://fonts.googleapis.com/css?family=Bitter&display=swap');
	@import url('https://fonts.googleapis.com/css?family=Outfit&display=swap');

	body {
		font-family: 'Outfit';
		display: flex;
	}
	
	h1 {
		font-family: 'Bitter';
	}

</style>
