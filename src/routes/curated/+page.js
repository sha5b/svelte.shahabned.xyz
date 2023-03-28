import PocketBase from 'pocketbase'
const pb = new PocketBase(`${import.meta.env.VITE_API_URL}`)

export const load = async () => {
	const response = await pb.collection('curated').getFullList({
		sort: '-date'
	})
	const works = await response

	return {
		curated
	}
}
