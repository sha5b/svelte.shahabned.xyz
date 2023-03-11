import Pocketbase from 'pocketbase'
import { writable } from 'svelte/store'

const url = 'https://shahabned.pockethost.io/'

export const pb = new Pocketbase(url)

export const currentUser = writable(pb.authStore.model)

pb.authStore.onChange((auth) => {
	console.log('authStore.onChange', auth)
	currentUser.set(pb.authStore.model)
})
