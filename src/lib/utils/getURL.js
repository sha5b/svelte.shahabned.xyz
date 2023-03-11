export const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
	return `https://shahabned.pockethost.io/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`
}

export const getVideoURL = (collectionId, recordId, fileName, size = '0x0') => {
	return `https://shahabned.pockethost.io/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`
}

export const getAudioURL = (collectionId, recordId, fileName, size = '0x0') => {
	return `https://shahabned.pockethost.io/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`
}
