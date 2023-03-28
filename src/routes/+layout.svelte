<script>
	import { page } from '$app/stores'
	import Navbar from '$lib/components/sections/Navbar.svelte'
	import { spring } from 'svelte/motion'
</script>

<Navbar />
<slot />

<style global>
	@import url('https://fonts.googleapis.com/css?family=Inter&display=swap');
	@import url('https://fonts.googleapis.com/css?family=Bitter&display=swap');
	@import url('https://fonts.googleapis.com/css?family=Urbanist&display=swap');

	:root {
		--main-black: #15171c;
		--main-white: #f6f7f7;
		--main-grey: #74818b;
		--secondary-grey: #818484;
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
	:global(p) {
		font-family: 'Urbanist';
		font-size: 1.25rem;
		letter-spacing: 0.1rem;
	}
	:global(img) {
		border-radius: 0.25rem;
	}
</style>
