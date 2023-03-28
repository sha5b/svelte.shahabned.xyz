import PocketBase from 'pocketbase'
const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

export const load = async () => {
	const response = await pb.collection('works').getFullList({
		sort: '-date',
		filter: 'edition >= 1'
	})
	const works = await response

	return {
		works
	}
}
