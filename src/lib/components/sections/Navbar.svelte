<script>
	import { page } from '$app/stores'
	import { slide, fly } from 'svelte/transition'
	import { onMount } from 'svelte'

	let scroll
	let y

	let newY = []
	$: oldY = newY[1]

	function updateY(event) {
		newY.push(y)
		if (newY.length > 3) {
			newY.shift()
		}
		newY = newY
	}
</script>

<svelte:window on:scroll={updateY} bind:scrollY={y} />
{#if oldY >= y && y != 0}
	<container transition:fly={{ duration: 1000, y: 800 }}>
		<right>
			<h1><a href="/works">all works</a></h1>
			<h1><a href="/curated">curated</a></h1>
			<h1><a href="/info">info</a></h1>
		</right>

		<bottom>
			<scrolltext>
				<content>
					<a style="font-weight:bold" href="/"><h2>shahab nedaei</h2></a>
					<a aria-hidden="true" style="font-weight:bold" href="/"><h2>shahab nedaei</h2></a>
					<a aria-hidden="true" style="font-weight:bold" href="/"><h2>shahab nedaei</h2></a>
					<a aria-hidden="true" style="font-weight:bold" href="/"><h2>shahab nedaei</h2></a>
					<a aria-hidden="true" style="font-weight:bold" href="/"><h2>shahab nedaei</h2></a>
					<a aria-hidden="true" style="font-weight:bold" href="/"><h2>shahab nedaei</h2></a>
					<a aria-hidden="true" style="font-weight:bold" href="/"><h2>shahab nedaei</h2></a>
				</content>
			</scrolltext>
		</bottom>
	</container>
{/if}

<style>
	container {
		overflow: hidden;
		width: 100%;
		height: 100%;
		position: fixed;
		background-color: rgba(255, 255, 255, 0.9);
		z-index: 10;
	}
	button {
		height: 100%;
		font-size: 1.5rem;
		box-shadow: none;
	}
	right {
		position: absolute;
		right: 0;
		padding-right: 5rem;
	}

	bottom {
		width: 100%;
		display: flex;
		justify-content: space-between;
		position: absolute;
		bottom: 0;
		padding: 5rem;
	}

	a {
		text-decoration: none;
		color: black;
		accent-color: gray;
		border-radius: 0;
		padding: 0.5rem;
	}
	a:hover {
	}
	h1 {
		font-family: 'Bitter';
		letter-spacing: 0.25rem;
		font-size: 5rem;
		white-space: wrap;
		min-width: 400px;
		padding: 0;
	}
	h2 {
		font-family: 'Urbanist';
		margin-bottom: 0.5rem;
		font-size: 3rem;
		white-space: nowrap;
		font-weight: 300;
	}

	scrolltext {
		z-index: 2;
		--gap: 2rem;
		display: flex;
		overflow: hidden;
		gap: var(--gap);
		width: 100%;
	}
	scrolltext content {
		display: flex;
		animation: scroll 60s linear infinite;
		width: 100%;
	}

	@keyframes scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translate(calc(-100% - var(--gap)));
		}
	}
</style>
