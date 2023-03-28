<script>
	import Time from 'svelte-time'
	import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte'
	export let data
</script>

<div style="padding: 2.5rem 10rem 2.5rem 10rem;">
	<div>
		<div>
			<div style="display:flex">
				<h1>{data.owner.name}</h1>

				<a href="https://www.instagram.com/shahabned/">
					<div style="width: 64px; color: black">
						<FaInstagram />
					</div>
				</a>
			</div>
			<p>currently based in berlin</p>
			<h3>statement</h3>
			<p>{data.owner.statement}</p>
		</div>
	</div>
	<div>
		<table>
			<thead>
				<th><h2>exhibitions</h2></th>
				<th><h2>curator</h2></th>
			</thead>
			<tbody>
				{#each data.exhibtions as exhibition (exhibition.id)}
					<tr>
						<td><a href={`${exhibition.link}`}>{exhibition.title}</a></td>
						<td
							><a href={`${exhibition.expand.curator.link}`}>{exhibition.expand.curator.title}</a
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
	</div>
</div>

<style>
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
	}

	h3 {
		font-family: 'Urbanist';
		font-size: 2.5rem;
		letter-spacing: 0.25rem;
	}
	p {
		margin-bottom: 0rem;
	}
	table {
		white-space: wrap;
		flex-wrap: wrap;
	}
	th {
		justify-content: baseline;
		vertical-align: text-bottom;
		border: none;
		padding-left: 0rem;
		padding-right: 0rem;
		padding-bottom: 0rem;
	}
	td {
		border: none;
		padding-left: 0rem;
		padding-right: 0rem;
		padding-top: 1.3rem;
		padding-bottom: 1.3rem;
	}
</style>
