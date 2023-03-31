<script>
	import { page } from '$app/stores'
	import { slide, fly } from 'svelte/transition'
	import { onMount } from 'svelte'

	let y

	let prevScrollPos = 0
	export let scrollDirection
	let delay

	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset

		if (currentScrollPos > prevScrollPos) {
			scrollDirection = false
			delay = 2000
		} else {
			scrollDirection = true
			delay = 100
		}
		setTimeout(() => {
			prevScrollPos = currentScrollPos
		}, delay)
	}

	const resetScroll = () => {
		scrollDirection = false
	}
</script>

<svelte:window on:scroll={handleScroll} on:load={resetScroll} />
{#if scrollDirection}
	<container transition:fly={{ duration: 800, y: 800 }}>
		<flex>
			<navigation style="align-items: end;text-align:right">
				<a on:click={resetScroll} href="/works"><h1>all works</h1></a>
				<a on:click={resetScroll} href="/curated"><h1>curated</h1></a>
				<a on:click={resetScroll} href="/info"><h1>info</h1></a>
			</navigation>

			<navigation>
				<a on:click={resetScroll} style="font-weight:bold" href="/"><h2>shahab nedaei</h2></a>
			</navigation>
		</flex>
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
		padding: 5rem;
	}

	navigation {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		height: 100%;
		width: 100%;
		justify-content: flex-end;
	}
	flex {
		display: flex;
		width: 100%;
		height: 100%;
		flex-direction: column;
		justify-content: space-between;
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
		margin: 0;
	}
	h2 {
		font-family: 'Urbanist';
		margin-bottom: 0.5rem;
		font-size: 4rem;
		font-weight: 300;
	}
	@media (max-width: 768px) {
		container {
			padding: 2.5rem;
		}
		navigation {
		}
		h1 {
			font-size: 4rem;
		}
		h2 {
			font-size: 3rem;
		}
	}
</style>
