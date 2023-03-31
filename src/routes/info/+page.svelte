<script>
	import Time from 'svelte-time'
	import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte'
	import FaGithub from 'svelte-icons/fa/FaGithub.svelte'
	import MediaQuery from 'svelte-media-query'
	export let data
</script>

<container>
	<content>
		<div>
			<div style="display:flex">
				<h1>{data.owner.name}</h1>

				<icons style="display:flex;gap:2rem">
					<a target="_blank" href="https://github.com/sha5b/svelte.shahabned.xyz">
						<div>
							<FaGithub />
						</div>
					</a>
					<a target="_blank" href="https://www.instagram.com/shahabned/">
						<div>
							<FaInstagram />
						</div>
					</a>
				</icons>
			</div>
			<p>currently based in berlin</p>
			<h3>statement</h3>
			<p>{data.owner.statement}</p>
		</div>

		<div>
			{#if data.colab}
				<h2 style="padding-bottom:1rem">collaborations</h2>
				<flex>
					{#each data.colab as colab}
						{#if colab.role == 'artist'}
							<item>
								<a target="_blank" href={`${colab.link}`}><h6>{colab.title}</h6></a>
							</item>
						{/if}
					{/each}
				</flex>
			{/if}
		</div>

		<MediaQuery query="(min-width: 1024px)" let:matches>
			{#if matches}
				<table>
					<thead>
						<th><h2>exhibitions</h2></th>
						<th><h2>curator</h2></th>
					</thead>
					<tbody>
						{#each data.exhibtions as exhibition (exhibition.id)}
							<tr>
								<td><a target="_blank" href={`${exhibition.link}`}>{exhibition.title}</a></td>
								<td
									><a target="_blank" href={`${exhibition.expand.curator.link}`}
										>{exhibition.expand.curator.title}</a
									></td>
								<td>
									<Time timestamp={exhibition.date} format="MMMM YYYY" />
								</td>
								<td>
									{exhibition.city}, {exhibition.nation}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</MediaQuery>
		<MediaQuery query="(max-width: 1024px)" let:matches>
			{#if matches}
				<table>
					<thead>
						<th><h2>exhibitions</h2></th>
						<th><h2>curator</h2></th>
					</thead>
					<tbody>
						{#each data.exhibtions as exhibition (exhibition.id)}
							<tr>
								<td><a target="_blank" href={`${exhibition.link}`}>{exhibition.title}</a></td>
								<td
									><a target="_blank" href={`${exhibition.expand.curator.link}`}
										>{exhibition.expand.curator.title}</a
									></td>
							</tr>
							<tr>
								<td>
									<Time timestamp={exhibition.date} format="MMMM YYYY" />
								</td>
								<td>
									{exhibition.city}, {exhibition.nation}
								</td></tr>
						{/each}
					</tbody>
				</table>
			{/if}
		</MediaQuery>
	</content>
</container>

<style>
	flex {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		gap: 1rem;
	}
	flex item {
		flex-grow: 1;
	}
	icons {
		display: flex;
		gap: 2.5rem;
		align-items: baseline;
		opacity: 0.75;
		color: white;
	}
	icons a {
		width: 48px;
		color: black;
	}

	icons a:hover {
		color: var(--primary);
	}
	h1 {
		font-family: 'Bitter';
		margin: 0;
		height: 100%;
		width: 100%;
		font-size: 4rem;
		letter-spacing: 0.75rem;
	}
	h2 {
		font-family: 'Bitter';
		font-size: 2.5rem;
		letter-spacing: 0.25rem;
		padding-top: 2rem;
		margin-bottom: 0;
	}

	h3 {
		font-family: 'Urbanist';
		font-size: 2.5rem;
		letter-spacing: 0.25rem;

		margin-bottom: 0;
	}
	h6 {
		font-family: 'Urbanist';
		font-size: 1.5rem;
		margin: 0;
	}
	p {
		margin-bottom: 0rem;
	}
	table {
		white-space: wrap;
		flex-wrap: wrap;
		align-items: baseline;
	}
	th {
		justify-content: baseline;
		align-items: baseline;
		vertical-align: text-bottom;
		border: none;
		padding-left: 0rem;
		padding-right: 0rem;
		padding-bottom: 0rem;
	}
	td {
		align-items: baseline;
		border: none;
		padding-left: 0rem;
		padding-right: 0rem;
		padding-top: 1.3rem;
		padding-bottom: 1.3rem;
	}

	content {
		padding: 2.5rem 10rem 2.5rem 10rem;
	}
	container {
		display: flex;
		width: 100%;
		flex-direction: column;
		margin: 0 auto;
	}

	@media (max-width: 1024px) {
		content {
			padding: 1rem 5rem 1rem 5rem;
		}
	}

	@media (max-width: 768px) {
		content {
			padding: 0.5rem 2.5rem 0.5rem 2.5rem;
		}
	}
	@media (max-width: 480px) {
		content {
			padding: 0.5rem 1rem 0.5rem 1rem;
		}
	}
</style>
