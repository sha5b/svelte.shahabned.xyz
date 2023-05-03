<script>
	import { fly, fade } from 'svelte/transition'
	import FaAlignRight from 'svelte-icons/fa/FaAlignRight.svelte'
	import FaTimes from 'svelte-icons/fa/FaTimes.svelte'

	let isNavbarActive = false

	function ActivateNavbar() {
		isNavbarActive = !isNavbarActive
	}
</script>

{#if !isNavbarActive}
	<button on:click={ActivateNavbar} class="button-closer">
		<div style="color:black">
			<FaAlignRight />
		</div>
	</button>
{/if}

{#if isNavbarActive}
	<button
		class="button-fullscreen-background"
		on:click={ActivateNavbar}
		transition:fly={{ duration: 800, y: 800 }}>
		<flex>
			<navigation style="align-items: end;text-align:right">
				<a href="/works"><h1>all works</h1></a>
				<a href="/curated"><h1>curated</h1></a>
				<a href="/info"><h1>info</h1></a>
			</navigation>

			<navigation>
				<a href="/"><h2>shahab nedaei</h2></a>
			</navigation>
		</flex>
	</button>
{/if}

<style>
	.button-closer {
		width: 64px;
		height: 64px;
		margin: 2rem;
		box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
		border: none;
		right: 0%;
		border-radius: 0.25rem;
		z-index: 11;
		position: fixed;
		background-color: rgba(255, 255, 255, 0.75);
	}
	.button-fullscreen-background {
		overflow: hidden;
		width: 100%;
		height: 100%;
		box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
		z-index: 10;
		padding: 5rem;
		padding-top: 7.5rem;
		padding-right: 2rem;
		position: fixed;
		z-index: 9;
		background-color: rgba(255, 255, 255, 0.75);
	}

	navigation {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 1;
		height: 100%;
		width: 100%;
		justify-content: flex-end;
		align-items: start;
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
		font-size: 4rem;
		margin: 0;
	}
	h2 {
		font-family: 'Urbanist';
		margin-bottom: 0.5rem;
		font-size: 3rem;
		font-weight: 300;
	}
	@media (max-width: 768px) {
		h1 {
			font-size: 3rem;
		}
		h2 {
			font-size: 2rem;
		}
		.button-closer {
			width: 48px;
			height: 48px;
		}
	}
</style>
