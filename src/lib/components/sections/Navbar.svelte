<script>
	import { page } from '$app/stores'
	import { slide, fly } from 'svelte/transition'
	import { onMount } from 'svelte'

	let prevScrollPos = 0
	let scrollDirection = false

	const handleScroll = () => {
		scrollDirection = false
		const currentScrollPos = window.pageYOffset
		if (currentScrollPos > prevScrollPos) {
			scrollDirection = false
		} else {
			scrollDirection = true
		}
		prevScrollPos = currentScrollPos
	}

	const resetScrollDirection = () => {
		scrollDirection = false
	}
</script>

<svelte:window on:scroll={handleScroll} />
{#if scrollDirection}
	<container transition:fly={{ duration: 1000, y: 800 }}>
		<navigation style="align-items: end;text-align:right">
			<a on:click={resetScrollDirection} href="/works"><h1>all works</h1></a>
			<a on:click={resetScrollDirection} href="/curated"><h1>curated</h1></a>
			<a on:click={resetScrollDirection} href="/info"><h1>info</h1></a>
		</navigation>

		<navigation tyle="align-items: start;">
			<div>
				<a on:click={resetScrollDirection} style="font-weight:bold" href="/"
					><h2>shahab nedaei</h2></a>
			</div>
		</navigation>
	</container>
{/if}

<style>
	container {
		overflow: hidden;
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: rgba(255, 255, 255, 0.75);
		z-index: 10;
		padding: 7.5rem;
	}

	navigation {
		display: flex;
		flex-direction: column;
	}

	a {
		text-decoration: none;
		color: black;
		accent-color: gray;
		border-radius: 0;
		padding: 0.5rem;
	}
	a:hover {
		text-decoration: underline;
		color: var(--primary);
	}
	h1 {
		font-family: 'Bitter';
		letter-spacing: 0.25rem;
		font-size: 5rem;
		white-space: wrap;
		min-width: 400px;
		margin-top: 0;
	}
	h2 {
		font-family: 'Urbanist';
		margin-bottom: 0.5rem;
		font-size: 4rem;
		white-space: nowrap;
		font-weight: 300;
	}
</style>
