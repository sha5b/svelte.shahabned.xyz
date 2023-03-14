<script>
	// @ts-nocheck
	import { pb } from '$lib/pocketbase'
	import { onMount, onDestroy } from 'svelte'
	import { getImageURL } from '$lib/utils/getURL'
	import { spring } from 'svelte/motion'
	import Time from 'svelte-time'
	import { fade, scale } from 'svelte/transition'
	import { page } from '$app/stores'
	import sanitizeHtml from 'sanitize-html'
	import Footer from '$lib/components/Footer.svelte'
	import FaInstagram from 'svelte-icons/fa/FaInstagram.svelte'

	let exhibitions = []
	let artist = []

	onMount(async () => {
		const exhibitionQuery = await pb.collection('exhibitions').getList(1, 250, {
			sort: '-date',
			expand: 'artworks'
		})
		exhibitions = exhibitionQuery.items
		artist = await pb.collection('users').getList(1, 250, {
			sort: '-created'
		})
		artist = artist.items
	})
	$: console.log(artist)
</script>

<flexcontainer>
	<flex>
		<content>
			<flex-row style="justify-content:space-between">
				<div>
					<h1>shahab nedaei</h1>
				</div>
				<a href="https://www.instagram.com/shahabned/">
					<div style="width: 64px; color: var(--main-black)">
						<FaInstagram />
					</div>
				</a>
			</flex-row>
			<div>
				{#each artist as artist}
					<p style="font-size: 1.3rem">{artist.location}</p>
				{/each}
			</div>
			<div>
				<h3 style="padding-bottom:1rem;margin-bottom: 0rem">statement</h3>
				{#each artist as artist}
					<p>{@html sanitizeHtml(artist.statement)}</p>
				{/each}
				<p style="line-height:1.5rem " />
			</div>
			<div>
				<table>
					<thead>
						<tr>
							<th
								><h3 style="padding-top:2rem;padding-bottom:1rem;margin-bottom: 0rem">
									exhibitions
								</h3></th>
							<th><h5>location</h5></th>

							<th><h5>date</h5></th>
							<th><h5>curator</h5></th>
						</tr>
					</thead>
					{#each exhibitions as exhibition, i (exhibition.id)}
						<tbody>
							<tr>
								<td><p>{exhibition.title}</p></td>
								<td
									><p>
										<a href={`${exhibition.location_link}`}>{exhibition.location_name}</a>
									</p></td>
								{#if exhibition.date}
									<td><Time timestamp={exhibition.date} /></td>
								{:else}
									<td>permanent</td>
								{/if}

								<td><a href={`${exhibition.curator_link}`}>{exhibition.curator_name}</a></td>
							</tr>
						</tbody>
					{/each}
				</table>
			</div>
			<Footer />
		</content>
	</flex>
</flexcontainer>

<style lang="css">
	h1 {
		margin: 0;
		height: 100%;
		width: 100%;
	}

	h5 {
		padding-bottom: 0rem;
		margin-bottom: 0rem;
	}
	p {
		margin-bottom: 0rem;
		font-size: 1rem;
	}

	flex {
		justify-content: center;
		display: flex;
		width: 100%;
	}

	flex-row {
		width: 100%;
		display: flex;
		flex-grow: 1;
		gap: var(--gap);
		justify-content: space-between;
		align-items: center;
	}

	content {
		width: 100%;
		padding: 2.5rem 10rem 2.5rem 10rem;
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

	.icon {
		color: var(--main-black);
		width: 64 px;
		height: 64 px;
	}
</style>
