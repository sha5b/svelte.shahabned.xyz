<script>
	import Navigation from '$lib/components/Navigation.svelte'
</script>

<body>
	<Navigation />
	<slot />
</body>

<style>
	body {
		display: flex;
	}
</style>
