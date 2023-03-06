<script>
	import Time from 'svelte-time'
	export let mousePosY
	export let scroll
	export let title
	export let genre
	export let dimensions
	export let founding_date
	export let medium
</script>

<scrolltext style:transform={`translate3d(0, ${$mousePosY - scroll * -0.2 - 150}px, 0)`}>
	<div>
		<content>
			<h1>{title}</h1>
		</content>
		<content>
			<div>
				<p style="font-size: 2rem">{genre}</p>
				<p>{dimensions}</p>
				<p><Time timestamp={founding_date} /></p>
				<hr />
				<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{medium}</p>
			</div>
		</content>
	</div>
	<div aria-hidden="true">
		<content>
			<h1>{title}</h1>
		</content>
		<content>
			<div>
				<p style="font-size: 2rem">{genre}</p>
				<p>{dimensions}</p>
				<p><Time timestamp={founding_date} /></p>
				<hr />
				<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{medium}</p>
			</div>
		</content>
	</div>
	<div>
		<content aria-hidden="true">
			<h1>{title}</h1>
		</content>
		<content>
			<div>
				<p style="font-size: 2rem">{genre}</p>
				<p>{dimensions}</p>
				<p><Time timestamp={founding_date} /></p>
				<hr />
				<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{medium}</p>
			</div>
		</content>
	</div>
	<div>
		<content aria-hidden="true">
			<h1>{title}</h1>
		</content>
		<content>
			<div>
				<p style="font-size: 2rem">{genre}</p>
				<p>{dimensions}</p>
				<p><Time timestamp={founding_date} /></p>
				<hr />
				<p style="line-height: 1.5rem; letter-spacing: 0.1rem">{medium}</p>
			</div>
		</content>
	</div>
</scrolltext>

<style>
	scrolltext {
		margin: auto 0;
		opacity: 0;
		--gap: 5rem;
		position: absolute;
		display: flex;
		overflow: hidden;
		user-select: none;
		gap: var(--gap);
		z-index: 3;
		pointer-events: none;
		transition: opacity 0.3s ease-in-out;
	}

	scrolltext content {
		display: flex;
		gap: var(--gap);
		animation: scroll 10s linear infinite;
		width: 100%;
	}

	scrolltext content h1 {
		font-family: 'Bitter';
		color: white;
		flex-basis: auto;
		letter-spacing: 0.5rem;
		font-size: 3.5rem;
		margin-bottom: 0.5rem;
		flex-shrink: 0;
		white-space: nowrap;
	}
	scrolltext content p {
		color: white;
		flex-basis: auto;
		font-size: 1rem;
		letter-spacing: 0.25rem;
		display: flex;
		line-height: 0.25rem;
	}
</style>
