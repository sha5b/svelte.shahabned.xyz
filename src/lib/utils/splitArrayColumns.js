export function sliceAndJoinArray(arr, sliceSize) {
	const slicedArray = []
	let tempArray = []

	arr.forEach((item, index) => {
		tempArray.push(item)
		if (tempArray.length === sliceSize || index === arr.length - 1) {
			slicedArray.push(tempArray.slice(0, sliceSize))
			tempArray = tempArray.slice(sliceSize)
		}
	})

	const pairArray = []

	slicedArray.forEach((subArray) => {
		for (let i = 0; i < subArray.length; i++) {
			if (!pairArray[i]) {
				pairArray[i] = []
			}
			pairArray[i].push(subArray[i])
		}
	})

	return pairArray
}

export function splitArrayColumns(arr, columns) {
	const slices = []
	for (let i = 0; i < columns; i++) {
		const sliced = sliceAndJoinArray(arr, columns)[i]
		slices.push(sliced)
	}
	return slices
}
