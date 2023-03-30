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
		if (newY.length > 50) {
			newY.shift()
		}
		newY = newY
	}

	onMount(() => {
		window.addEventListener('wheel', function (event) {
			var currentScrollTop = window.pageYOffset || document.documentElement.scrollTop
			if (currentScrollTop > lastScrollTop) {
				// Scrolling down
				scrollDirection = false
			} else {
				// Scrolling up
				scrollDirection = true
			}
			lastScrollTop = currentScrollTop
		})
	})

	var lastScrollTop = 0
	var scrollDirection = false
</script>

<svelte:window on:scroll={updateY} bind:scrollY={y} />
{#if scrollDirection}
	<container transition:fly={{ duration: 1000, y: 800 }}>
		<div style="display:flex">
			<div style="width:100%" />
			<right>
				<div>
					<h1><a href="/works">all works</a></h1>
					<h1><a href="/curated">curated</a></h1>
					<h1><a href="/info">info</a></h1>
				</div>
			</right>
		</div>

		<bottom>
			<a style="font-weight:bold" href="/"><h2>shahab nedaei</h2></a>
		</bottom>
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
	}
	right {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		padding-right: 5rem;
		padding-top: 5rem;
		width: 100%;
		align-items: end;
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
