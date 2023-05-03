<script>
	import { page } from '$app/stores'
	import Navbar from '$lib/components/sections/Navbar.svelte'
	import { onMount } from 'svelte'

	import { spring } from 'svelte/motion'
</script>

<svelte:head>
	<title>shahab nedaei | digital and intenet art</title>
</svelte:head>
<Navbar />
<slot />

<style global>
	@import url('https://fonts.googleapis.com/css?family=Inter&display=swap');
	@import url('https://fonts.googleapis.com/css?family=Bitter&display=swap');
	@import url('https://fonts.googleapis.com/css?family=Urbanist&display=swap');

	[data-theme='light'],
	:root:not([data-theme='dark']) {
		--primary: #df8766;
		--primary-hover: #df8766;
		--primary-focus: rgba(31, 24, 60, 0.125);
		--primary-inverse: #f4f5f5;
		font-family: 'Urbanist';
	}
	:root::-webkit-scrollbar {
		width: 0.25rem;
	}

	:root::-webkit-scrollbar-track {
		background: gray;
	}

	:root::-webkit-scrollbar-thumb {
		background: black;
	}
	:global(h1) {
		font-family: 'Bitter';
	}
	:global(h2) {
		font-family: 'Urbanist';
	}
	:global(p) {
		font-family: 'Urbanist';
		font-size: 1rem;
		letter-spacing: 0.1rem;
		line-height: 1.75rem;
	}
	:global(img) {
		border-radius: 0.25rem;
	}
</style>
