import PocketBase from 'pocketbase'
import { spring } from 'svelte/motion'

const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

export const load = async () => {
	const response = await pb.collection('works').getFullList({
		sort: '-date',
		filter: 'featured = true'
	})
	const owner = await pb.collection('users').getOne('bgho9k9u2mpc5vo', {
		sort: '-created'
	})
	const works = await response

	return {
		works,
		owner
	}
}
