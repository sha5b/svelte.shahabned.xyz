<script>
	import Time from 'svelte-time'
	import { getImageURL } from '$lib/utils/getURL'
	import { spring } from 'svelte/motion'
	import FaBitcoin from 'svelte-icons/fa/FaBitcoin.svelte'
	import FaShoppingCart from 'svelte-icons/fa/FaShoppingCart.svelte'
	export let scroll
	export let title
	export let slug
	export let genre
	export let material
	export let dimension
	export let nft
	export let date
	export let edition
	export let collectionId
	export let id
	export let thumb
	export let type

	export let i

	let mouse = spring({ x: 0, y: 0 }, { stiffness: 0.1, damping: 0.1 })
	function handleMousemove(event) {
		mouse.x = event.layerX
		mouse.y = event.layerY
	}
</script>

<!-- <scrolltext style:transform={`translate3d(0, ${$mousePosition.y - scroll * -0.1 - 100}px, 0)`}> -->
<a href={`/works/${slug}`}>
	<container on:mousemove={handleMousemove}>
		<scrolltext style:transform={`translate3d(0, ${mouse.y - scroll * (-i / 10) - 100}px, 0)`}>
			<div>
				<content>
					<h1>{title}</h1>
				</content>
				<content>
					<h2>{genre}</h2>
					<p><Time timestamp={date} format="MMMM YYYY" /></p>
					{#if edition}
						<p>editions: {edition}</p>
					{/if}
				</content>
			</div>
			<div aria-hidden="true">
				<content>
					<h1>{title}</h1>
				</content>
				<content>
					<h2>{genre}</h2>
					<p><Time timestamp={date} format="MMMM YYYY" /></p>
					{#if edition}
						<p>editions: {edition}</p>
					{/if}
				</content>
			</div>
			<div aria-hidden="true">
				<content>
					<h1>{title}</h1>
				</content>
				<content>
					<h2>{genre}</h2>
					<p><Time timestamp={date} format="MMMM YYYY" /></p>
					{#if edition}
						<p>editions: {edition}</p>
					{/if}
				</content>
			</div>
			<div aria-hidden="true">
				<content>
					<h1>{title}</h1>
				</content>
				<content>
					<h2>{genre}</h2>
					<p><Time timestamp={date} format="MMMM YYYY" /></p>
					{#if edition}
						<p>editions: {edition}</p>
					{/if}
				</content>
			</div>
			<div aria-hidden="true">
				<content>
					<h1>{title}</h1>
				</content>
				<content>
					<h2>{genre}</h2>
					<p><Time timestamp={date} format="MMMM YYYY" /></p>
					{#if edition}
						<p>editions: {edition}</p>
					{/if}
				</content>
			</div>
		</scrolltext>
		<div>
			<image-overlay />
			{#if type === 'video'}
				<video autoplay muted loop src={getImageURL(collectionId, id, thumb)} alt={`${title}`}
					><track kind="captions" /></video>
			{:else if type === 'image'}
				<img src={getImageURL(collectionId, id, thumb)} alt={`${title}`} />
			{:else if type === '3d'}
				<img src={getImageURL(collectionId, id, thumb)} alt={`${title}`} />
			{/if}
			<icons>
				{#if nft}
					<a href="https://www.instagram.com/shahabned/">
						<div style="width: 48px; color: white">
							<FaBitcoin />
						</div>
					</a>
				{/if}
				{#if edition}
					<a href="https://www.instagram.com/shahabned/">
						<div style="width: 48px; color: white">
							<FaShoppingCart />
						</div>
					</a>
				{/if}
			</icons>
		</div>
	</container>
</a>

<style>
	container {
		width: 100%;
		height: 100%;
	}
	container:hover scrolltext {
		opacity: 1;
	}
	img {
		object-fit: cover;
		overflow: hide;
		width: 100%;
		height: 100%;
		border-radius: 0.25rem;
	}
	video {
		object-fit: cover;
		overflow: hide;
		width: 100%;
		height: 100%;
		min-height: 500px;
		border-radius: 0.25rem;
	}
	icons {
		display: flex;
		gap: 1rem;
		z-index: 2;
		position: absolute;
		bottom: 20px;
		right: 30px;
		align-items: baseline;
		opacity: 0.9;
	}

	h1 {
		color: white;
		font-family: 'Bitter';
		letter-spacing: 0.25rem;
		font-size: 3rem;
		margin-bottom: 0.25rem;
		white-space: wrap;
		min-width: 500px;
	}
	h2 {
		color: white;
		font-family: 'Urbanist';
		margin-bottom: 0.5rem;
		font-size: 2.5rem;
		white-space: nowrap;
		font-weight: 300;
	}
	h6 {
		color: white;
		font-family: 'Urbanist';
		font-size: 1.5rem;
	}
	p {
		color: white;
		margin-bottom: 0.25rem;
		letter-spacing: 0.25rem;
		white-space: wrap;
	}
	scrolltext {
		z-index: 2;
		--gap: 2rem;
		opacity: 0;
		position: absolute;
		display: flex;
		overflow: hidden;
		user-select: none;
		pointer-events: none;
		gap: var(--gap);
		transition: opacity 0.3s ease-in-out;
	}
	scrolltext content {
		display: flex;
		flex-direction: column;
		animation: scroll 10s linear infinite;
		width: 100%;
	}
	image-overlay {
		border-radius: 0.25rem;
		z-index: 1;
		position: absolute;
		width: 100%;
		height: 100%;
		background: black;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
	}
	image-overlay:hover {
		opacity: 0.6;
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
