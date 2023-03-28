import PocketBase from 'pocketbase'
const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

export const load = async () => {
	const response = await pb.collection('exhibitions').getFullList({
		sort: '-date',
		expand: 'curator'
	})
	const owner = await pb.collection('users').getOne('bgho9k9u2mpc5vo', {
		sort: '-created'
	})

	const exhibtions = await response

	return {
		exhibtions,
		owner
	}
}
