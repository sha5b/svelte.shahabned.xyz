<script>
	import Navigation from '$lib/components/Navigation.svelte'
</script>

<body>
	<Navigation />
	<slot />
</body>

<style>
	@import url('https://fonts.googleapis.com/css?family=Bitter&display=swap');
	@import url('https://fonts.googleapis.com/css?family=Outfit&display=swap');
	@import url('https://fonts.googleapis.com/css?family=Urbanist&display=swap');

	body {
		--main-black: #15171c;
		--main-white: #f6f7f7;
		--main-grey: #74818b;
		--secondary-grey: #818484;
		--gap: 2rem;
		font-family: 'Urbanist';
		display: flex;
		width: 100%;
		background-color: var(--main-white);
	}

	:global(h1) {
		font-family: 'Bitter';
		font-size: 5rem;
		letter-spacing: 0.75rem;
		margin-bottom: 0.5rem;
		line-height: 5.5rem;
		padding-bottom: 1.5rem;
	}

	:global(h2) {
		font-family: 'Bitter';
		font-size: 4rem;
		letter-spacing: 0.25rem;
		padding-bottom: 1rem;
		font-weight: 500;
	}
	:global(h3) {
		font-family: 'Urbanist';
		font-size: 3rem;
		letter-spacing: 0.25rem;
		padding-bottom: 1rem;
		font-weight: 300;
	}
	:global(h4) {
		font-family: 'Urbanist';
		font-size: 2rem;
		letter-spacing: 0.25rem;
		padding-bottom: 1rem;
		font-weight: 300;
	}
	:global(h5) {
		font-size: 1.5rem;
		letter-spacing: 0.25rem;
		padding-bottom: 1rem;
		font-weight: 300;
	}

	:global(p) {
		line-height: 2rem;
		white-space: pre-wrap;
		font-size: 1.3rem;
	}

	:global(a) {
		text-decoration: none;
	}

	:global(flexcontainer) {
		position: relative;
		overflow: hidden;
		display: flex;
		justify-content: center;
	}

	:global(flex item) {
		width: 99%;
		border-radius: 0.5rem;
		position: relative;
		overflow: hidden;
		display: block;
		flex-grow: 1;
	}

	:global(.front-img) {
		object-fit: cover;
		z-index: 1;
		overflow: hide;
		width: 100%;
		max-height: 1000px;
	}

	:global(.front-video) {
		object-fit: cover;
		z-index: 1;
		overflow: hide;
		width: 100%;
		min-height: 750px;
	}

	:global(.img-overlay) {
		border-radius: 0.25rem;
		position: absolute;
		width: 100%;
		height: 100%;
		background: black;
		opacity: 0;
		z-index: 2;
		transition: opacity 0.3s ease-in-out;
	}

	:global(.img-overlay:hover) {
		opacity: 0.6;
	}
</style>
